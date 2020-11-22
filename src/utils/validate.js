function checkPattern (name, value) {
    const dataPattern = {
        zipcode: /^\d{5}-\d{3}$/,
        locationNumber: /^[0-9]*$/,
        residents: /^([1-9][0-9]{0,2}|1000)$/
    }

    if (!dataPattern[name]) {
        return
    }

    return dataPattern[name].test(value)
}

function checkCoordinates (name, value) {
    if (name !== 'longitude' && name !== 'latitude') {
        return
    }

    const coordinate = Number(value)
    const coordinateLimit = name === 'longitude' ? 180 : 90

    return coordinate >= -coordinateLimit && coordinate <= coordinateLimit
}

export default function validate (name, value) {
    if (!value) {
        return `Preenchimento obrigatorio`
    } else if (!(checkPattern(name, value) || checkCoordinates(name, value))) {
        return `Campo invalido`
    }
}