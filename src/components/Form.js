import useForm from '../hooks/useForm'
import validate from '../utils/validate'
// import axios from 'axios'
import '../App.css'

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
    } = useForm(data, validate, { zipcode: applyZipcodeMask }, 'http://localhost:5000/address', handleFeedback)
    
    
    

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
                onBlur={e => handleBlur(e)}
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
                value={values.locationNumber}
            />
            {errors.locationNumber || ''}

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
