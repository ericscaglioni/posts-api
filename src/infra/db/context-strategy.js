const { IPost } = require("./protocols/post")
class ContextStrategy extends IPost {
    constructor(strategy) {
        super()
        this._database = strategy
    }

    add (postModel) {
        return this._database.add(postModel)
    }

    isConnected () {
        return this._database.isConnected()
    }
}

module.exports = {
    ContextStrategy
}
