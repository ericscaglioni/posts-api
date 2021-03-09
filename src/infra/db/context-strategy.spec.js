const { IPost } = require('./protocols/post')
const { ContextStrategy } = require('./context-strategy')

const mockIPost = () => {
    class IPostStub extends IPost {
        async connect () {
            return Promise.resolve()
        }

        async add (postData) {
            return {
                id: 'any_id',
                title: 'any_title',
                text: 'any_text'
            }
        }
    }
    return new IPostStub()
}

const mockPostData = () => ({
    title: 'any_title',
    text: 'any_text'
})

const makeSut = () => {
    const iPostStub = mockIPost()
    const sut = new ContextStrategy(iPostStub)
    return {
        sut,
        iPostStub
    }
}

describe('Context Strategy suite tests', () => {
    describe('add()', () => {
        it('Should call IPost with correct data', async () => {
            const { sut, iPostStub } = makeSut()
            const addSpy = jest.spyOn(iPostStub, 'add')
            const postData = mockPostData()
            await sut.add(postData)
            expect(addSpy).toHaveBeenCalledWith(postData)
        })

        it('Should throw if PostData throws', async () => {
            const { sut, iPostStub } = makeSut()
            jest.spyOn(iPostStub, 'add').mockImplementationOnce(() => {
                throw new Error()
            })
            const promise = sut.add(mockPostData())
            await expect(promise).rejects.toThrow()
        })

        it('Should return on success', async () => {
            const { sut} = makeSut()
            const postModel = await sut.add(mockPostData())
            expect(postModel).toEqual({
                id: 'any_id',
                title: 'any_title',
                text: 'any_text'
            })
        })
    })
    describe('connect()', () => {
        it('Should call IPost', async () => {
            const { sut, iPostStub } = makeSut()
            const connectSpy = jest.spyOn(iPostStub, 'connect')
            await sut.connect()
            expect(connectSpy).toHaveBeenCalled()
        })

        it('Should throw if PostData throws', async () => {
            const { sut, iPostStub } = makeSut()
            jest.spyOn(iPostStub, 'connect').mockImplementationOnce(() => {
                throw new Error()
            })
            const promise = sut.connect()
            await expect(promise).rejects.toThrow()
        })
    })
})
