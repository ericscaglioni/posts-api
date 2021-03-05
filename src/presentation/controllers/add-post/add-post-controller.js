const { MissingParamError } = require('../../errors')
const { badRequest } = require('../../helpers/http/http-helper')
const { IController } = require('../../protocols/controller')

class AddPostController extends IController {
    constructor() {
        super()
    }

    async handle (httpRequest) {
        const { title, text } = httpRequest.body
        if (!title) {
            return badRequest(new MissingParamError('title'))
        }
    }
}

module.exports = {
    AddPostController
}
