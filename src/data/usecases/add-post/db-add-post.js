const { IPost } = require('../../../infra/db/protocols/post')

class DbAddPost extends IPost {
    constructor(iAddPostRepository) {
        super()
        this.iAddPostRepository = iAddPostRepository
    }

    async add (postData) {
        return await this.iAddPostRepository.add(postData)
    }
}

module.exports = {
    DbAddPost
}
