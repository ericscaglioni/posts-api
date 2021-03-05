const { NotImplementedException } = require('../../../utils/errors')

class IPost {
    async add (postData) {
        return new NotImplementedException()
    }

    isConnected () {
        return new NotImplementedException()
    }
}

module.exports = {
    IPost
}
