const { DbLoadPosts } = require('../../../../data/usecases/load-posts/db-load-posts')
const { makeDbStrategy } = require('../../db-strategy/db-strategy-factory')

const makeDbLoadPosts = () => {
    const postRepository = makeDbStrategy()
    return new DbLoadPosts(postRepository)
}

module.exports = {
    makeDbLoadPosts
}
