const { NotImplementedException } = require('../../utils/errors')

class IAddPost {
    add (postData) {
        return new NotImplementedException()
    }
}

module.exports = {
    IAddPost
}
