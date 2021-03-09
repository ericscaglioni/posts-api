const { FileRepository } = require('./file-repository')
const { writeFile, readFile } = require('fs/promises')
const { envConfig } = require('../../../main/config/environment')
const uuid = require('uuid')

jest.mock('uuid', () => ({
    v4: jest.fn().mockImplementation(() => {
        return 'any_id'
    })
}))

const mockPosts = () => ({
    'any_id': {
        title: 'any_title',
        text: 'any_text'
    },
    'any_id_2': {
        title: 'any_title_2',
        text: 'any_text_2'
    },
    'any_id_3': {
        title: 'any_title_3',
        text: 'any_text_3'
    }
})

const insertPosts = async () => {
    await writeFile(filePath, JSON.stringify(mockPosts()))
}

const filePath = `${process.cwd()}/${envConfig.dbStrategyURL.file}`

const makeSut = () => new FileRepository()

let posts = {}

describe('Post File Repository suite tests', () => {
    beforeEach(async () => {
        await writeFile(filePath, '{}')
        posts = JSON.parse(await readFile(filePath))
    })

    describe('add()', () => {
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
    })

    describe('loadAll()', () => {
        it('Should get all saved posts on success', async () => {
            expect(posts).toEqual({})
            await insertPosts()
            
            const sut = makeSut() 
            const result = await sut.loadAll()
            expect(result).toEqual(mockPosts())
        })
    })
})
