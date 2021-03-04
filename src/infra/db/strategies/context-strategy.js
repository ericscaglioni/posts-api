class ContextStrategy {
    constructor(strategy) {
        this._database = strategy
    }

    add (postModel) {
        return this._database.add(postModel)
    }
}

module.exports = {
    ContextStrategy
}
