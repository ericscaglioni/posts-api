const { NotImplementedException } = require('../../../utils/errors')

class IAddPostRepository {
    add (postData) {
        return new NotImplementedException()
    }
}

module.exports = {
    IAddPostRepository
}
