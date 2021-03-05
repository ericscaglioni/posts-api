const { badRequest, serverError, created } = require('../../helpers/http/http-helper')
const { MissingParamError } = require('../../errors')
const { AddPostController } = require('./add-post-controller')
const { IAddPost } = require('../../../domain/usecases/add-post')
const { IValidation } = require('../../protocols')

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

const makeValidation = () => {
    class IValidationStub extends IValidation {
        validate (input) {
            return null
        }
    }
    return new IValidationStub()
}

const makeSut = () => {
    const iValidationStub = makeValidation()
    const iAddPostStub = makeIAddPost()
    const sut = new AddPostController(
        iAddPostStub,
        iValidationStub
    )
    return {
        sut,
        iAddPostStub,
        iValidationStub
    }
}

describe('Add Post Controller suite tests', () => {
    it('Should call Validation with correct data', async () => {
        const { sut, iValidationStub } = makeSut()
        const validateSpy = jest.spyOn(iValidationStub, 'validate')
        const httpRequest = makeHttpRequest()
        await sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    it('Should call IAddPost with correct data', async () => {
        const { sut, iAddPostStub } = makeSut()
        const addSpy = jest.spyOn(iAddPostStub, 'add')
        const httpRequest = makeHttpRequest()
        await sut.handle(httpRequest)
        expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    it('Should return 500 if IAddPost throws', async () => {
        const { sut, iAddPostStub } = makeSut()
        jest.spyOn(iAddPostStub, 'add').mockImplementationOnce(() => {
            throw new Error('test')
        })
        const httpResponse = await sut.handle(makeHttpRequest())
        expect(httpResponse).toEqual(serverError(new Error('test')))
    })

    it('Should return 201 on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeHttpRequest())
        expect(httpResponse).toEqual(created({
            id: 'any_id',
            title: 'any_title',
            text: 'any_text'
        }))
    })
});
