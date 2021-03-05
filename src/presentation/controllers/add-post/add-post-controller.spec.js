const { badRequest } = require('../../helpers/http/http-helper')
const { MissingParamError } = require('../../errors')
const { AddPostController } = require('./add-post-controller')

const makeSut = () => new AddPostController()

describe('Add Post Controller suite tests', () => {
    it('Should return 400 if title was not provided', async () => {
        const sut = makeSut()
        const httpResponse = await sut.handle({
            body: {
                text: 'any_text'
            }
        })
        expect(httpResponse).toEqual(badRequest(new MissingParamError('title')))
    })    
});
