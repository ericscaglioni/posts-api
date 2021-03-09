const { DbAddPost } = require("../../../../data/usecases/db-add-post")
const { makeDbStrategy } = require('../../db-strategy/db-strategy-factory')

const makeDbAddPost = () => {
    const postRepository = makeDbStrategy()
    return new DbAddPost(postRepository)
}

module.exports = {
    makeDbAddPost
}
