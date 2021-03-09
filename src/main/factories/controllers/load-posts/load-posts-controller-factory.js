const { LoadPostsController } = require('../../../../presentation/controllers/load-posts/load-posts-controller')
const { makeDbLoadPosts } = require('../../usecases/load-posts/db-load-posts-factory')

const makeLoadPostsController = () =>
    new LoadPostsController(makeDbLoadPosts())

module.exports = {
    makeLoadPostsController
}
