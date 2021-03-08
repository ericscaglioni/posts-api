const { makeAddPostController } = require('../factories/controllers/add-post/add-post-controller-factory')
const { adaptRoute } = require('../adapters/express-route-adapter')

module.exports = (router) => {
    router.post('/posts', adaptRoute(makeAddPostController()))
}
