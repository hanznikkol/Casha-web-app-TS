import AddTransactionDialogBox from "@/components/pages_components/Transaction/AddTransactionDialogBox"

function Transaction() {
  return (
    <>
      <div className='w-full h-full flex-col'>
        <div className='flex items-center justify-between'> 
          {/* Header */}
          <h1 className='text-2xl'>Transaction</h1>
          <AddTransactionDialogBox onAdded={() => {}}/> 
        </div>
      </div>
    </>
  )
}

export default Transaction