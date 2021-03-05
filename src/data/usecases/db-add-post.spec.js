const { IAddPostRepository } = require('../protocols/db/add-post-repository')
const { DbAddPost } = require('./add-post')

const makeSut = () => {
    const iAddPostRepository = new IAddPostRepository()
    const sut = new DbAddPost(iAddPostRepository)
    return {
        sut,
        iAddPostRepository
    }
}

describe('Add Post usecase suite tests', () => {
    describe('add()', () => {
        it('Should call IAddPostRepository with correct data', async () => {
            const { sut, iAddPostRepository } = makeSut()
            const addSpy = jest.spyOn(iAddPostRepository, 'add')
            const postData = {
                title: 'any_title',
                text: 'any_text'
            }
            await sut.add(postData)
            expect(addSpy).toHaveBeenCalledWith(postData)
        })

        it('Should throw if IAddPostRepository throws', async () => {
            const { sut, iAddPostRepository } = makeSut()
            jest.spyOn(iAddPostRepository, 'add').mockImplementationOnce(() => {
                throw new Error('test')
            })
            const postData = {
                title: 'any_title',
                text: 'any_text'
            }
            const promise = sut.add(postData)
            await expect(promise).rejects.toThrow()
        })
    });
});
