const { NotImplementedException } = require('../../../utils/errors')

class IAddPostRepository {
    add (postModel) {
        return new NotImplementedException()
    }
}

module.exports = {
    IAddPostRepository
}
