function Input ({ label, onChange, onBlur, name, type, value, error}) {
    return (
        <div className='input-wrapper'>
            <label>{label}</label>
            <input 
                onChange={(e) => onChange(e)}
                onBlur={e => onBlur(e)}
                name={name}
                type={type}
                value={value}
            />
            <div className='input-error'>{error}</div>
        </div>
    )
}

export default Input