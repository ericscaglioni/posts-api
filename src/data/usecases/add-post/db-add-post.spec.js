const { IPost } = require('../../../infra/db/protocols/post')
const { DbAddPost } = require('./db-add-post')

const mockPostData = () => ({
    title: 'any_title',
    text: 'any_text'
})

const mockIAddPostRepository = () => {
    class IAddPostRepositoryStub extends IPost {
        async add (postData) {
            return {
                ['any_id']: {
                    title: 'any_title',
                    text: 'any_text'
                }
            }
        }
    }
    return new IAddPostRepositoryStub()
}

const makeSut = () => {
    const iAddPostRepositoryStub = mockIAddPostRepository()
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
            const postData = mockPostData()
            await sut.add(postData)
            expect(addSpy).toHaveBeenCalledWith(postData)
        })

        it('Should throw if IAddPostRepository throws', async () => {
            const { sut, iAddPostRepositoryStub } = makeSut()
            jest.spyOn(iAddPostRepositoryStub, 'add').mockImplementationOnce(() => {
                throw new Error('test')
            })
            const promise = sut.add(mockPostData())
            await expect(promise).rejects.toThrow()
        })

        it('Should return a PostModel on success', async () => {
            const { sut } = makeSut()
            const postModel = await sut.add(mockPostData())
            expect(postModel).toEqual({
                ['any_id']: {
                    title: 'any_title',
                    text: 'any_text'
                }
            })
        })
    });
});
