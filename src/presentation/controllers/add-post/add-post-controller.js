const { MissingParamError } = require('../../errors')
const { badRequest, serverError, created } = require('../../helpers/http/http-helper')
const { IController } = require('../../protocols')

class AddPostController extends IController {
    constructor(iAddPost) {
        super()
        this.iAddPost = iAddPost
    }

    async handle (httpRequest) {
        try {
            const { title, text } = httpRequest.body
            if (!title) {
                return badRequest(new MissingParamError('title'))
            }
            if (!text) {
                return badRequest(new MissingParamError('text'))
            }
            const postModel = await this.iAddPost.add({
                title,
                text
            })
            return created(postModel)
        } catch (error) {
            return serverError(error)
        }
    }
}

module.exports = {
    AddPostController
}
