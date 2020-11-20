import { useState } from 'react';
import '../App.css';

function Form() {
    const data = {
        zipcode: null,
        locationNumber: null,
        longitude: null,
        latitude: null,
        residents: null
    }
    const [ userData, setUserData ] = useState(data)
    const [ errors, setErrors ] = useState(data)

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

    function handleChange (e) {
        const { name, value } = e.target
        setUserData({
            ...userData,
            [name]: value
        })
    }

    function hasErrors () {
        return Object.values(errors).some(value => value !== null)
    }

    function sendUserData() {
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
            />
            {errors.latitude}

            <label>Logitude</label>
            <input 
                onChange={(e) => handleChange(e)}
                onBlur={e => handleBlur(e)}
                name='longitude'
                type={'text'} 
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
