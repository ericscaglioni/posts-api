const utils = require('./index')

describe('Utils suite tests', () => {
    describe('convertObjToArray()', () => {
        it('Should return an empty array if object is not provided', () => {
            const result = utils.convertObjToArray()
            expect(Array.isArray(result)).toBeTruthy()
            expect(result).toHaveLength(0)
        })
    })
})
