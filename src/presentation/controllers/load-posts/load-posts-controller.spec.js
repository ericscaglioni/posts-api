const { badRequest, serverError, created, notFound } = require('../../helpers/http/http-helper')
const { MissingParamError } = require('../../errors')
const { LoadPostsController } = require('./load-posts-controller')
const { ILoadPosts } = require('../../../domain/usecases/load-posts')

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

const mockILoadPosts = () => {
    class ILoadPostsStub extends ILoadPosts {
        async loadAll () {
            return mockPosts()
        }
    }
    return new ILoadPostsStub()
}

const makeSut = () => {
    const iLoadPostsStub = mockILoadPosts()
    const sut = new LoadPostsController(iLoadPostsStub)
    return {
        sut,
        iLoadPostsStub
    }
}

describe('Load Posts Controller suite tests', () => {
    it('Should return 404 if ILoadPosts returns an empty object', async () => {
        const { sut, iLoadPostsStub } = makeSut()
        jest.spyOn(iLoadPostsStub, 'loadAll').mockResolvedValueOnce({})
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(notFound())
    })

    it('Should call ILoadPosts', async () => {
        const { sut, iLoadPostsStub } = makeSut()
        const loadAllSpy = jest.spyOn(iLoadPostsStub, 'loadAll')
        await sut.handle({})
        expect(loadAllSpy).toHaveBeenCalled()
    })

    it('Should return 500 if ILoadPosts throws', async () => {
        const { sut, iLoadPostsStub } = makeSut()
        jest.spyOn(iLoadPostsStub, 'loadAll').mockImplementationOnce(() => {
            throw new Error('test')
        })
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(serverError(new Error('test')))
    })

    // it('Should return 201 on success', async () => {
    //     const { sut } = makeSut()
    //     const httpResponse = await sut.handle(mockHttpRequest())
    //     expect(httpResponse).toEqual(created({
    //         id: 'any_id',
    //         title: 'any_title',
    //         text: 'any_text'
    //     }))
    // })
});
