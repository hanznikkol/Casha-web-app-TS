import AddAccountDialogBox from '@/components/pages_components/Accounts/AddAccountDialogBox'
import React from 'react'

function Accounts() {
  return (
    <>
      <div className='w-full h-full flex-col'>
        <div className='flex items-center justify-between'> 
          {/* Header */}
          <h1 className='text-2xl'>Accounts</h1>
          <AddAccountDialogBox onAdded={() => {}}/>
        </div>
      </div>
    </>
  )
}

export default Accounts