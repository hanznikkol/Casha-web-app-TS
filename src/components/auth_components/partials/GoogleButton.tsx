import React from 'react'
import GoogleSVG from '../../icons/auth_icons/GoogleSVG'
import { Button } from '@/components/ui/button'

interface GoogleButtonProps {
    firstText: string
}

const GoogleButton: React.FC<GoogleButtonProps> = ({
    firstText
}) => {
  return (
    <Button className='bg-white shadow-xl text-black border flex justify-center items-center gap-2 hover:cursor-pointer hover:bg-muted duration-150'>
        <GoogleSVG></GoogleSVG>
        {firstText} with Google
    </Button>
  )
}

export default GoogleButton