const { NotImplementedException } = require('../../../utils/errors')

class IPost {
    add (postModel) {
        return new NotImplementedException()
    }
}

module.exports = {
    IPost
}
