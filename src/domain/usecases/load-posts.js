const { NotImplementedException } = require('../../utils/errors')

class ILoadPosts {
    loadAll () {
        return new NotImplementedException()
    }
}

module.exports = {
    ILoadPosts
}
