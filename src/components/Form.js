import useForm from '../hooks/useForm'
import validate from '../utils/validate'
import '../App.css'
import Axios from 'axios'

function Form({ setRequestStatus }) {
    const data = {
        zipcode: '',
        locationNumber: '',
        longitude: '',
        latitude: '',
        residents: ''
    }
    
    const {
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues
    } = useForm(data, validate, { zipcode: applyZipcodeMask }, 'http://localhost:5000/address', handleFeedback)

    function getGeolocation (location) {
        return location.results?.reduce((obj, data) => {
            obj = data.geometry?.location 
            return obj 
        }, {})
    }

    function setGeolocation (geolocation) {
        const { lat, lng } = geolocation
        setValues({
            ...values,
            longitude: lng,
            latitude: lat
        })
    }

    function loadGeolocation (value) {
        Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=cep${value}&key=${process.env.REACT_APP_GOOGLE_APIKEY}`)
            .then(({ data }) => {
                const geolocation = getGeolocation(data)
                return geolocation && setGeolocation(geolocation)
            })
            .catch(e => console.log(e))
    }

    function interceptHandleBlue (e) {
        const { name, value } = e.target
        handleBlur(e)

        if (name === 'zipcode' && value) {
            loadGeolocation(value)
        }
    }

    function applyZipcodeMask (e) {
        e.currentTarget.maxLength = 9
        let value = e.currentTarget.value
        value = value.replace(/\D/g, "");
        return value.replace(/^(\d{5})(\d)/, "$1-$2");
    }

    function handleFeedback (status) {
        setRequestStatus(status)
        setTimeout(() => {
            setRequestStatus(null)
        }, 2000)
    }

    return (
        <div className={'user-form'}>
            <label>CEP</label>
            <input 
                onChange={(e) => handleChange(e)}
                onBlur={e => interceptHandleBlue(e)}
                name='zipcode'
                type={'text'}
                value={values.zipcode || ''}
            />
            {errors.zipcode}

            <label>Número</label>
            <input 
                onChange={(e) => handleChange(e)}
                onBlur={e => handleBlur(e)}
                name='locationNumber'
                type={'text'} 
                value={values.locationNumber || ''}
            />
            {errors.locationNumber}

            <label>Latitude</label>
            <input 
                onChange={(e) => handleChange(e)}
                onBlur={e => handleBlur(e)}
                name='latitude'
                type={'text'}
                value={values.latitude || ''} 
            />
            {errors.latitude}

            <label>Logitude</label>
            <input 
                onChange={(e) => handleChange(e)}
                onBlur={e => handleBlur(e)}
                name='longitude'
                type={'text'}
                value={values.longitude || ''}
            />
            {errors.longitude}
            <label>Quantidade de residentes</label>
            <input 
                onChange={(e) => handleChange(e)}
                onBlur={e => handleBlur(e)}
                name='residents'
                type={'text'}
                value={values.residents || ''}
            />
            {errors.residents}
            <button onClick={() => handleSubmit()}>Enviar</button>
        </div>
    );
}

export default Form;
