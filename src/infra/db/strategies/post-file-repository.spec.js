const { FileRepository } = require('./post-file-repository')
const { writeFile, readFile } = require('fs/promises')
const { envConfig } = require('../../../main/config/environment')
const uuid = require('uuid')

jest.mock('uuid', () => ({
    v4: jest.fn().mockImplementation(() => {
        return 'any_id'
    })
}))

const filePath = `${process.cwd()}/${envConfig.dbStrategyURL.file}`

const makeSut = () => new FileRepository()

let posts = {}

describe('Post File Repository suite tests', () => {
    describe('add()', () => {
        beforeEach(async () => {
            writeFile(filePath, '{}')
            posts = JSON.parse(await readFile(filePath))
        })

        it('Should save a post on success', async () => {
            expect(posts).toEqual({})

            const sut = makeSut()
            const postData = {
                title: 'any_title',
                text: 'any_text'
            }
            const postModel = await sut.add(postData)

            posts = JSON.parse(await readFile(filePath))
            expect(posts).toBeTruthy()
            expect(posts).toHaveProperty('any_id')
            expect(posts['any_id']).toEqual(postModel)
        })
    });
});
