const { ServerError } = require('../../errors')

const badRequest = (error) => ({
    statusCode: 400,
    body: error
})

const serverError = (error) => ({
    statusCode: 500,
    body: new ServerError(error.stack)
})

const created = (data) => ({
    statusCode: 201,
    body: data
})

module.exports = {
    badRequest,
    serverError,
    created
}
