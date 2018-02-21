# jsonapi-handler-rest

`jsonapi-handler-rest` is a rest api handler for [`jsonapi-server`](https://github.com/holidayextras/jsonapi-server).

This project follows to the specification laid out in the [jsonapi-server handler documentation](https://github.com/holidayextras/jsonapi-server/blob/master/documentation/handlers.md).

## Usage

```javascript
var RestHandler = require("jsonapi-handler-rest")

jsonApi.define({
  resource: 'users',
  handlers: new RestHandler({
    url: 'http://jsonplaceholder.typicode.com/users',
  }),
  attributes: {
    name: Joi.string(),
    username: Joi.string(),
    email: Joi.string(),
    address: Joi.object().keys({
      street: Joi.string(),
      suite: Joi.string(),
      zipcode: Joi.string(),
      city: Joi.string(),
      geo: Joi.object().keys({
        lat: Joi.string(),
        lng: Joi.string()
      })
    }),
    phone: Joi.string(),
    website: Joi.string(),
    company: Joi.object().keys({
      name: Joi.string(),
      catchPhrase: Joi.string(),
      bs: Joi.string()
    })
  }
})
```

## Features

- Search, Find

### TODO

- Tests, coverage
- Create, Delete, Update
- Filtering, pagination and sorting
