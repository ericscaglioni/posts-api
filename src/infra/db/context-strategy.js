const { IPost } = require("./protocols/post")
class ContextStrategy extends IPost {
    constructor(strategy) {
        super()
        this._database = strategy
    }

    async add (postModel) {
        return this._database.add(postModel)
    }

    async connect () {
        return this._database.connect()
    }
}

module.exports = {
    ContextStrategy
}
