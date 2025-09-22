import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Pencil, Trash } from 'lucide-react'

type AccountCardProps = {
  account_id: string,
  account_name: string,
  account_type: string
  balance: number,
  onEdit?: () => void
}

function AccountCards({ account_name, account_type, balance, onEdit,}: AccountCardProps) {

  const typeColors: Record<string, string> = {
    wallet: "text-blue-600",
    bank: "text-green-600",
    cash: "text-yellow-600",
  }
  
  return (
    <Card
      onClick={onEdit}
      className="flex-1 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer flex flex-col justify-between p-4"
    >
      <CardHeader className='flex flex-row justify-between items-center'>
        {/* Account Name */}
        <CardTitle className={`text-lg font-bold ${typeColors[account_type]}`}>{account_name}</CardTitle>
        <div className="flex gap-2" 
          onClick={(e) => {
            e.stopPropagation()
            onEdit?.()
          }}>
          {/* Edit */}
          <button onClick={(e) => {
                e.stopPropagation()
                onEdit?.()
              }
            } 
            className="p-1 rounded hover:bg-gray-100 hover:cursor-pointer">
            <Pencil className="w-4 h-4 text-gray-600 hover:text-primary" />
          </button>
          {/* Delete */}
          <button  onClick={() => {console.log("Add function later on")}} className="p-1 rounded hover:bg-gray-100 hover:cursor-pointer">
            <Trash className="w-4 h-4 text-gray-600 hover:text-destructive" />
          </button>
      </div>
      </CardHeader>

      {/* Account type and balance */}
      <CardContent className="flex flex-col justify-end h-full">
        <p className="text-sm text-gray-500 capitalize">{account_type}</p>
        <p className="mt-2 text-2xl font-bold text-gray-900">₱{balance.toLocaleString()}</p>
      </CardContent>
    </Card>
  )
}

export default AccountCards