const { badRequest } = require('../../helpers/http/http-helper')
const { MissingParamError } = require('../../errors')
const { AddPostController } = require('./add-post-controller')
const { IAddPost } = require('../../../domain/usecases/add-post')

const makeHttpRequest = () => ({
    body: {
        title: 'any_title',
        text: 'any_text'
    }
})

const makeIAddPost = () => {
    class IAddPostStub extends IAddPost {
        async add (postData) {
            return {
                id: 'any_id',
                title: 'any_title',
                text: 'any_text'
            }
        }
    }
    return new IAddPostStub()
}

const makeSut = () => {
    const iAddPostStub = makeIAddPost()
    const sut = new AddPostController(iAddPostStub)
    return {
        sut,
        iAddPostStub
    }
}

describe('Add Post Controller suite tests', () => {
    it('Should return 400 if title is not provided', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({
            body: {
                text: 'any_text'
            }
        })
        expect(httpResponse).toEqual(badRequest(new MissingParamError('title')))
    })

    it('Should return 400 if text is not provided', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({
            body: {
                title: 'any_title'
            }
        })
        expect(httpResponse).toEqual(badRequest(new MissingParamError('text')))
    })

    it('Should call IAddPost with correct data', async () => {
        const { sut, iAddPostStub } = makeSut()
        const addSpy = jest.spyOn(iAddPostStub, 'add')
        const httpRequest = makeHttpRequest()
        await sut.handle(httpRequest)
        expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
    })
});
