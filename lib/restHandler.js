const debug = require('debug')('jsonApi:handler:rest')
const axios = require('axios')

var RestHandler = module.exports = function RestHandler(config) {
  this._config = config
}

RestHandler.prototype.ready = false

/**
  Initialise gets invoked once for each resource that uses this handler.
 */
RestHandler.prototype.initialise = function(resourceConfig) {
  this.resourceConfig = resourceConfig
  this.ready = true
}

RestHandler.prototype._fetch = function () {
  return axios.create({ baseURL: this._config.url })
}

/**
  Search for a list of resources, give a resource type.
 */
RestHandler.prototype.search = function(request, callback) {
  const { type } = request.params

  debug('search', type)

  this._fetch().get()
    .then(({ data }) => {
      let items = data.map(item => {
        item.id = String(item.id)
        _item = { type }
        Object.entries(item).forEach(_data => _item[_data[0]] = _item[_data[1]])
        return _item
      })

      callback(null, items, items.length)
    }).catch(e => { })
}

/**
  Find a specific resource, given a resource type and a id.
 */
RestHandler.prototype.find = function(request, callback) {
  const { type, id } = request.params

  debug('find', type, id)

  this._fetch().get(id)
    .then(({ data }) => {
      let item = { type }
      Object.entries(data).forEach(_data => item[_data[0]] = item[_data[1]])
      item.id = String(item.id)
      callback(null, item)
    }).catch(e => {
      this.errors.push(e)
    })
}
