const utils = require('./index')

describe('Utils suite tests', () => {
    describe('convertObjToArray()', () => {
        it('Should return an empty array if object is not provided', () => {
            const result = utils.convertObjToArray()
            expect(Array.isArray(result)).toBeTruthy()
            expect(result).toHaveLength(0)
        })

        it('Should return an empty array if null is provided', () => {
            const result = utils.convertObjToArray(null)
            expect(Array.isArray(result)).toBeTruthy()
            expect(result).toHaveLength(0)
        })

        it('Should return an empty array if an empty array is provided', () => {
            const result = utils.convertObjToArray([])
            expect(Array.isArray(result)).toBeTruthy()
            expect(result).toHaveLength(0)
        })

        it('Should return an array on success', () => {
            const objToConvert = {
                '1': {
                    name: 'any_name',
                    address: {
                        street: 'any_street_name',
                        number: 1
                    }
                },
                '2': {
                    name: 'any_name',
                    address: {
                        street: 'any_street_name',
                        number: 2
                    }
                }
            }
            const result = utils.convertObjToArray(objToConvert)
            expect(Array.isArray(result)).toBeTruthy()
            expect(result).toHaveLength(2)
            expect(result).toEqual([{
                '1': {
                    name: 'any_name',
                    address: {
                        street: 'any_street_name',
                        number: 1
                    }
                }
            }, {
                '2': {
                    name: 'any_name',
                    address: {
                        street: 'any_street_name',
                        number: 2
                    }
                }
            }])
        })
    })
})
