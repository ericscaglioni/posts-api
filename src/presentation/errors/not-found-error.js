class NotFoundError extends Error {
    constructor() {
        super('Posts not found')
        this.name = 'NotFoundError'
    }
}

module.exports = {
    NotFoundError
}
