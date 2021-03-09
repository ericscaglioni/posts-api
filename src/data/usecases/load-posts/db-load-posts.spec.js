const { IPost } = require('../../../infra/db/protocols/post')
const { DbLoadPosts } = require('./db-load-posts')

const mockPosts = () => ({
    ['any_id']: {
        title: 'any_title',
        text: 'any_text'
    },
    ['any_id_2']: {
        title: 'any_title_2',
        text: 'any_text_2'
    },
    ['any_id_3']: {
        title: 'any_title_3',
        text: 'any_text_3'
    }
})

const mockIPost = () => {
    class IPostRepositoryStub extends IPost {
        async loadAll () {
            return mockPosts()
        }
    }
    return new IPostRepositoryStub()
}

const makeSut = () => {
    const iPostRepositoryStub = mockIPost()
    const sut = new DbLoadPosts(iPostRepositoryStub)
    return {
        sut,
        iPostRepositoryStub
    }
}

describe('Load Posts usecase suite tests', () => {
    describe('loadAll()', () => {
        it('Should call IPost', async () => {
            const { sut, iPostRepositoryStub } = makeSut()
            const loadAllSpy = jest.spyOn(iPostRepositoryStub, 'loadAll')
            await sut.loadAll()
            expect(loadAllSpy).toHaveBeenCalled()
        })

        it('Should throw if IPost throws', async () => {
            const { sut, iPostRepositoryStub } = makeSut()
            jest.spyOn(iPostRepositoryStub, 'loadAll').mockImplementationOnce(() => {
                throw new Error('test')
            })
            const promise = sut.loadAll()
            await expect(promise).rejects.toThrow()
        })

        // it('Should return a PostModel on success', async () => {
        //     const { sut } = makeSut()
        //     const postModel = await sut.add(mockPostData())
        //     expect(postModel).toEqual({
        //         ['any_id']: {
        //             title: 'any_title',
        //             text: 'any_text'
        //         }
        //     })
        // })
    })
})
