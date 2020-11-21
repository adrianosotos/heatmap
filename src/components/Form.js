import { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'

function Form() {
    const data = {
        zipcode: '',
        locationNumber: '',
        longitude: '',
        latitude: '',
        residents: ''
    }
    const [ userData, setUserData ] = useState(data)
    const [ errors, setErrors ] = useState(data)
    const [ zipcodeMask, setZipCodeMask ] = useState('')
    const [ requestStatus, setRequestStatus ] = useState(null)

    useEffect(() => {
        getGeoLocation()
    })

    function getGeoLocation () {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function getPosition (position) {
                setUserData({
                    ...userData,
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
                })
            });    
        } 
    }

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

    function applyZipcodeMask (e) {
        e.currentTarget.maxLength = 9
        let value = e.currentTarget.value
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{5})(\d)/, "$1-$2");
        setZipCodeMask(value)
    }

    function handleBlur (e) {
        const { name, value } = e.target
        validateInput(name, value)
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

    function hasEmptyUserData () {
        return Object.values(userData).some(data => !data)
    }

    function hasErrors () {
        return Object.values(errors).some(error => error)
    }

    function getEmpty (userData) {
        return Object.keys(userData).reduce((obj, data) => {
            if (!userData[data]) {
                obj[data] = `Preenchimento obrigatorio`
            }
            return obj
        }, {}) 
    }

    function getEmptyFields () {
        setErrors({
            ...errors,
            ...getEmpty(userData)
        })
    }

    function resetInputs () {
        setUserData({...userData, ...data})
        setZipCodeMask('')
    }

    function handleFeedback (status) {
        setRequestStatus(status)
        setTimeout(() => {
            setRequestStatus(null)
        }, 2000)
    }

    function sendUserData () {
        getEmptyFields()

        if (hasEmptyUserData() || hasErrors()) {
            return alert(`Corrija os campos destacados`)
        }

        axios.post('http://localhost:5000/address', {
            ...userData
          })
          .then(function (response) {
            resetInputs()
            handleFeedback('success')
          })
          .catch(function (error) {
            handleFeedback('fail')
            console.log(error);
        });
    }
    return (
        <div className={'user-form'}>
            <div className={`feedback ${requestStatus}`}>
                {requestStatus === 'success' ? 'Enviado' : 'Falha no envio'}
            </div>
            <label>CEP</label>
            <input 
                onChange={(e) => handleChange(e)}
                onBlur={e => handleBlur(e)}
                name='zipcode'
                type={'text'}
                value={zipcodeMask}
            />
            {errors.zipcode}

            <label>Número</label>
            <input 
                onChange={(e) => handleChange(e)}
                onBlur={e => handleBlur(e)}
                name='locationNumber'
                type={'text'} 
                value={userData.locationNumber}
            />
            {errors.locationNumber}

            <label>Latitude</label>
            <input 
                onChange={(e) => handleChange(e)}
                onBlur={e => handleBlur(e)}
                name='latitude'
                type={'text'}
                value={userData.latitude} 
            />
            {errors.latitude}

            <label>Logitude</label>
            <input 
                onChange={(e) => handleChange(e)}
                onBlur={e => handleBlur(e)}
                name='longitude'
                type={'text'}
                value={userData.longitude}
            />
            {errors.longitude}
            <label>Quantidade de residentes</label>
            <input 
                onChange={(e) => handleChange(e)}
                onBlur={e => handleBlur(e)}
                name='residents'
                type={'text'}
                value={userData.residents}
            />
            {errors.residents}
            <button onClick={() => sendUserData()}>Enviar</button>
        </div>
    );
}

export default Form;
