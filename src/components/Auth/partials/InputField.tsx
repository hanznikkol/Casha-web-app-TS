import React from 'react'

interface InputFieldProps {
    type: string,
    label: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,

    required?: boolean,
    value?: string,
    placeholder?: string,
    name?: string,
}

const InputField: React.FC<InputFieldProps> = ({
    type,
    required,
    label,
    value,
    name,
    placeholder,
    onChange,
}) => {
  return (
    <>
     <label className='text-sm lg:text-base font-bold'>{label}</label>
        <input
            required = {required}
            value = {value}
            name = {name}
            placeholder= {placeholder}
            type= {type} 
            className='text-sm lg:text-base w-full border border-gray-400 rounded-xl px-2 py-3 mb-2'
            onChange = {onChange}
        ></input>

    </>
  )
}
export default InputField