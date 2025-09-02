import React from 'react'
import CloseSVG from '../../icons/auth_icons/CloseSVG'

interface AlertProps {
    message: string,
    type?: 'error' | 'success',
    onClose?: () => void,
}

const FormAlert: React.FC<AlertProps> = ({
    message,
    type = 'error',
    onClose,
}) => {
  return (
    <div 
        className={`w-full px-2 py-3 flex justify-between items-center border-2 border-error rounded-xl 
        ${type === 'error' ? 'border-2 border-error text-error': 'border-2 border-success text-success'}`}
    >
        <p>{type === 'error' ? 'Oops! ' : ''}{message}</p>

        {type === 'error' && (
            <button onClick={onClose}>
            <CloseSVG></CloseSVG>
            </button>
        )}
        
    </div>
  )
}

export default FormAlert