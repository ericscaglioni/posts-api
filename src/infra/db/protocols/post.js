const { NotImplementedException } = require('../../../utils/errors')

class IPost {
    async add (postData) {
        return new NotImplementedException()
    }

    async loadAll () {
        return new NotImplementedException()
    }

    async connect () {
        return new NotImplementedException()
    }
}

module.exports = {
    IPost
}
