import React from 'react'
import GoogleSVG from '../../icons/auth_icons/GoogleSVG'

interface GoogleButtonProps {
    firstText: string
}

const GoogleButton: React.FC<GoogleButtonProps> = ({
    firstText
}) => {
  return (
    <button className='bg-white border p-3 rounded-xl flex justify-center items-center gap-2 hover:cursor-pointer hover:bg-gray-200 duration-150'>
        <GoogleSVG></GoogleSVG>
        {firstText} with Google
    </button>
  )
}

export default GoogleButton