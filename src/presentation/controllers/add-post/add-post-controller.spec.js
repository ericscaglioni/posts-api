const { badRequest } = require('../../helpers/http/http-helper')
const { MissingParamError } = require('../../errors')
const { AddPostController } = require('./add-post-controller')

const makeSut = () => new AddPostController()

describe('Add Post Controller suite tests', () => {
    it('Should return 400 if title is not provided', async () => {
        const sut = makeSut()
        const httpResponse = await sut.handle({
            body: {
                text: 'any_text'
            }
        })
        expect(httpResponse).toEqual(badRequest(new MissingParamError('title')))
    })

    it('Should return 400 if text is not provided', async () => {
        const sut = makeSut()
        const httpResponse = await sut.handle({
            body: {
                title: 'any_title'
            }
        })
        expect(httpResponse).toEqual(badRequest(new MissingParamError('text')))
    })
});
