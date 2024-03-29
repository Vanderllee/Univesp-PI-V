module.exports = app => {

    const existsOrError = (value, msg) => {
        if (!value) throw msg
        if (Array.isArray(value) && value.length === 0) throw msg
        if (typeof value === 'string' && !value.trim()) throw msg

    }

    const notExistsOrError = (value, msg) => {
        try {
            existsOrError(value, msg);
        } catch (msg) {
            return
        }

        throw msg
    }

    const equalsOrError = (valueA, ValueB, msg) => {
        if(valueA !== ValueB) throw msg
    }

    return {existsOrError, notExistsOrError, equalsOrError};
}