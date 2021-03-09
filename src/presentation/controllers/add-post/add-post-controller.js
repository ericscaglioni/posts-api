const { badRequest, serverError, created } = require('../../helpers/http/http-helper')
const { IController } = require('../../protocols')

class AddPostController extends IController {
    constructor(iAddPost, iValidation) {
        super()
        this.iAddPost = iAddPost
        this.iValidation = iValidation
    }

    async handle (httpRequest) {
        try {
            const error = this.iValidation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const { title, text } = httpRequest.body
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
