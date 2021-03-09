const { makeAddPostController } = require('../factories/controllers/add-post/add-post-controller-factory')
const { makeLoadPostsController } = require('../factories/controllers/load-posts/load-posts-controller-factory')
const { adaptRoute } = require('../adapters/express-route-adapter')

const basePostRoutes = '/posts'

module.exports = (router) => {
    router.post(basePostRoutes, adaptRoute(makeAddPostController()))
    router.get(basePostRoutes, adaptRoute(makeLoadPostsController()))
}
