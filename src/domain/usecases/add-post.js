const { NotImplementedException } = require('../../utils/errors')

class IAddPost {
    add (postModel) {
        return new NotImplementedException()
    }
}

module.exports = {
    IAddPost
}
