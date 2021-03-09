const { FileRepository } = require('./post-file-repository')
const { writeFile, readFile } = require('fs/promises')
const { envConfig } = require('../../../main/config/environment')

const filePath = `${process.cwd()}/${envConfig.dbStrategyURL.file}`

const makeSut = () => new FileRepository()

let postCollection = []

describe('Post File Repository suite tests', () => {
    describe('add()', () => {
        beforeEach(async () => {
            writeFile(filePath, '[]')
            postCollection = JSON.parse(await readFile(filePath))
        })

        it('Should save a post on success', async () => {
            expect(postCollection).toHaveLength(0)

            const sut = makeSut()
            const postData = {
                title: 'any_title',
                text: 'any_text'
            }
            const postModel = await sut.add(postData)

            postCollection = JSON.parse(await readFile(filePath))
            expect(postCollection).toHaveLength(1)
            expect(postCollection[0]).toEqual(postModel)
        })
    });
});
