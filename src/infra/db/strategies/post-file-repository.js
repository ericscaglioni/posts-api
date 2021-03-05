const { IPost } = require('../protocols/post')
const { join } = require('path')
const { readFile, writeFile } = require('fs/promises')
const { v4: uuidv4 } = require('uuid')
const { PostModel } = require('../../../domain/models/post-model')

class FileRepository extends IPost {
    constructor () {
        super()
        this.filePath = join(__dirname, '../tests/post-file-database.json')
    }

    async _readFile () {
        const content = JSON.parse(
            await readFile(this.filePath)
        )
        return content
    }

    async _writeFile (content) {
        await writeFile(
            this.filePath,
            JSON.stringify(content)
        )
    }

    async add (postData) {
        const postCollection = await this._readFile()
        const postModel = new PostModel({
            ...postData
        })
        postModel.id = uuidv4()
        postCollection.push(postModel)
        await this._writeFile(postCollection)
        return postModel
    }
}

module.exports = {
    FileRepository
}
