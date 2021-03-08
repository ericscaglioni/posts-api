const { AddPostController } = require('../../../../presentation/controllers/add-post/add-post-controller')
const { makeAddPostValidation } = require('./add-post-validation-factory')
const { makeDbAddPost } = require('../../usecases/add-post/db-add-post-factory')

const makeAddPostController = () =>
    new AddPostController(makeDbAddPost(), makeAddPostValidation())

module.exports = {
    makeAddPostController
}
