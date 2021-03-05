const { FileRepository } = require('./post-file-repository')
const { join } = require('path')
const { writeFile, readFile } = require('fs/promises')

const filePath = join(__dirname, '../tests/post-file-database.json')

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
            await sut.add(postData)

            postCollection = JSON.parse(await readFile(filePath))
            expect(postCollection).toHaveLength(1)
            expect(postCollection[0]).toEqual({
                id: expect.any(String),
                title: 'any_title',
                text: 'any_text'
            })
        })
    });
});
