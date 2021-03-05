const { IAddPostRepository } = require('../protocols/db/add-post-repository')
const { DbAddPost } = require('./add-post')

const makePostData = () => ({
    title: 'any_title',
    text: 'any_text'
})

const makeIAddPostRepository = () => {
    class IAddPostRepositoryStub extends IAddPostRepository {
        async add (postData) {
            return {
                id: 'any_id',
                title: 'any_title',
                text: 'any_text'
            }
        }
    }
    return new IAddPostRepositoryStub()
}

const makeSut = () => {
    const iAddPostRepositoryStub = makeIAddPostRepository()
    const sut = new DbAddPost(iAddPostRepositoryStub)
    return {
        sut,
        iAddPostRepositoryStub
    }
}

describe('Add Post usecase suite tests', () => {
    describe('add()', () => {
        it('Should call IAddPostRepository with correct data', async () => {
            const { sut, iAddPostRepositoryStub } = makeSut()
            const addSpy = jest.spyOn(iAddPostRepositoryStub, 'add')
            const postData = makePostData()
            await sut.add(postData)
            expect(addSpy).toHaveBeenCalledWith(postData)
        })

        it('Should throw if IAddPostRepository throws', async () => {
            const { sut, iAddPostRepositoryStub } = makeSut()
            jest.spyOn(iAddPostRepositoryStub, 'add').mockImplementationOnce(() => {
                throw new Error('test')
            })
            const promise = sut.add(makePostData())
            await expect(promise).rejects.toThrow()
        })

        it('Should return a PostModel on success', async () => {
            const { sut } = makeSut()
            const postModel = await sut.add(makePostData())
            expect(postModel).toEqual({
                id: 'any_id',
                title: 'any_title',
                text: 'any_text'
            })
        })
    });
});
