const { RequiredFieldsValidator } = require('../../../../validation/validators/required-fields-validator')

const makeAddPostValidation = () => {
    const requiredFields = ['title', 'text']
    return new RequiredFieldsValidator(requiredFields)
}

module.exports = {
    makeAddPostValidation
}
