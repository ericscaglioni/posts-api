const convertObjToArray = (obj = {}) => {
    if (!obj) return []
    const objArray = Object.entries(obj)
    return objArray.map(([key, value]) => ({
        [key]: {
            ...value
        }
    }))
}

module.exports = {
    convertObjToArray
}
