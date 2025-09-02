import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

interface InputFieldProps {
    type: string,
    label?: string,
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
     <Label className='text-sm lg:text-base font-bold'>{label}</Label>
        <Input
            required = {required}
            value = {value}
            name = {name}
            placeholder= {placeholder}
            type= {type} 
            className='text-lg w-full border border-neutral-300 text-neutral-500 placeholder:text-neutral-500'
            onChange = {onChange}
        ></Input>
    </>
  )
}
export default InputField