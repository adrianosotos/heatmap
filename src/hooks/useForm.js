import { useState } from 'react'
import axios from 'axios'

function useForm (dataStruct, validation, mask, submitUrl, feedback) {
    const [values, setValues] = useState(dataStruct);
    const [errors, setErrors] = useState(dataStruct);
    
    function handleBlur (e) {
        const { name, value } = e.target
        setErrors({
            ...errors,
            [name]: validation(name, value)
        })
    }

    function handleChange (e) {
        const { name, value } = e.target
        let _value = value
        if (mask[name]) {
            _value = mask[name](e)
        }

        setValues({
            ...values,
            [name]: _value
        })
    }

    function hasEmptyData () {
        return Object.values(values).some(data => !data)
    }

    function hasErrors () {
        return Object.values(errors).some(error => error)
    }

    function getEmpty (userData) {
        return Object.keys(userData).reduce((obj, data) => {
            if (!values[data]) {
                obj[data] = `Preenchimento obrigatorio`
            }
            return obj
        }, {}) 
    }

    function getEmptyFields () {
        setErrors({
            ...errors,
            ...getEmpty(values)
        })
    }

    function resetInputs () {
        setValues({})
        setErrors({})
    }

    function handleSubmit () {
        getEmptyFields()

        if (hasEmptyData() || hasErrors()) {
            return alert(`Corrija os campos destacados`)
        }

        axios.post(submitUrl, {
            ...values
          })
          .then(function (response) {
            resetInputs()
            feedback('success')
          })
          .catch(function (error) {
            feedback('fail')
            console.log(error);
        });
    }

    return {
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        errors
      }
}

export default useForm

