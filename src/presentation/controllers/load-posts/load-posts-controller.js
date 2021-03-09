const { serverError, ok, notFound } = require('../../helpers/http/http-helper')
const { IController } = require('../../protocols')

class LoadPostsController extends IController {
    constructor(iLoadPosts) {
        super()
        this.iLoadPosts = iLoadPosts
    }

    async handle (httpRequest) {
        try {
            const result = await this.iLoadPosts.loadAll()
            if (!Object.keys(result).length) {
                return notFound()
            }
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }
}

module.exports = {
    LoadPostsController
}
