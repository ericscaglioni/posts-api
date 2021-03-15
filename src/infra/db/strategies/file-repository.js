const { IPost } = require('../protocols/post')
const { readFile, writeFile } = require('fs/promises')
const { v4: uuidv4 } = require('uuid')
const { PostModel } = require('../../../domain/models/post-model')
const { envConfig } = require('../../../main/config/environment')
const { convertObjToArray } = require('../../../utils')

class FileRepository extends IPost {
    constructor () {
        super()
        this.filePath = `${process.cwd()}/${envConfig.dbStrategyURL.file}`
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
        const posts = await this._readFile()
        const postModel = new PostModel({
            ...postData
        })
        const id = uuidv4()
        posts[id] = postModel
        await this._writeFile(posts)
        return posts[id]
    }

    async loadAll () {
        const posts = await this._readFile()
        return convertObjToArray(posts)
    }
}

module.exports = {
    FileRepository
}
