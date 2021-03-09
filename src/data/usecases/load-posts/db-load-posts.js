const { IPost } = require('../../../infra/db/protocols/post')

class DbLoadPosts extends IPost {
    constructor(iPostRepository) {
        super()
        this.iPostRepository = iPostRepository
    }

    async loadAll () {
        return await this.iPostRepository.loadAll()
    }
}

module.exports = {
    DbLoadPosts
}
