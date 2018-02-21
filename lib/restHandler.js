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
        return ({ type, ...item })
      })

      callback(null, items, items.length)
    }).catch(e => { })
}