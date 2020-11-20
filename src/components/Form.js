import { useState, useEffect } from 'react';
import '../App.css';

function Form() {
    const data = {
        zipcode: null,
        locationNumber: null,
        longitude: undefined,
        latitude: undefined,
        residents: null
    }
    const [ userData, setUserData ] = useState(data)
    const [ errors, setErrors ] = useState(data)
    const [ zipcodeMask, setZipCodeMask ] = useState('')

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function getPosition (position) {
                setUserData({
                    ...userData,
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
                })
            });    
        } 
    })

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

    function validateInput (name, value) {
        if (!value) {
            return setErrors({
                ...errors,
                [name]: `Preenchimento obrigatorio`
            })
        }

        if (!(checkPattern(name, value) || checkCoordinates(name, value))) {
           return setErrors({
                ...errors,
                [name]: `Campo invalido`
            })
        }

        return setErrors({...errors, [name]: null})
    }

    function handleBlur (e) {
        const { name, value } = e.target
        validateInput(name, value)
    }

    function applyZipcodeMask (e) {
        e.currentTarget.maxLength = 9
        let value = e.currentTarget.value
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{5})(\d)/, "$1-$2");
        setZipCodeMask(value)
    }

    function handleChange (e) {
        const { name, value } = e.target

        if (name === 'zipcode') {
            applyZipcodeMask(e)
        }

        setUserData({
            ...userData,
            [name]: value
        })
    }

    function hasEmpty (data) {
        return Object.values(data).some(value => !value)
    }

    function getEmpty (userData) {
        return Object.keys(userData).reduce((obj, data) => {
            if (!userData[data]) {
                obj[data] = `Preenchimento obrigatorio`
            }
            return obj
        }, {}) 
    }

    function hasErrors () {
        return hasEmpty(userData) || !hasEmpty(errors)
    }

    function sendUserData() {
        setErrors({
            ...errors,
            ...getEmpty(userData)
        })
        
        if (hasErrors()) {
            return alert(`Corrija os campos destacados`)
        } 
        console.log(userData)
    }
    return (
        <div className={'user-form'}>
            <label>CEP</label>
            <input 
                onChange={(e) => handleChange(e)}
                onBlur={e => handleBlur(e)}
                name='zipcode'
                type={'text'}
                value={zipcodeMask || ''}
            />
            {errors.zipcode}

            <label>Número</label>
            <input 
                onChange={(e) => handleChange(e)}
                onBlur={e => handleBlur(e)}
                name='locationNumber'
                type={'text'} 
            />
            {errors.locationNumber}

            <label>Latitude</label>
            <input 
                onChange={(e) => handleChange(e)}
                onBlur={e => handleBlur(e)}
                name='latitude'
                type={'text'}
                value={userData.latitude || ''} 
            />
            {errors.latitude}

            <label>Logitude</label>
            <input 
                onChange={(e) => handleChange(e)}
                onBlur={e => handleBlur(e)}
                name='longitude'
                type={'text'}
                value={userData.longitude || ''}
            />
            {errors.longitude}
            <label>Quantidade de residentes</label>
            <input 
                onChange={(e) => handleChange(e)}
                onBlur={e => handleBlur(e)}
                name='residents'
                type={'text'} 
            />
            {errors.residents}
            <button onClick={() => sendUserData()}>Enviar</button>
        </div>
    );
}

export default Form;
