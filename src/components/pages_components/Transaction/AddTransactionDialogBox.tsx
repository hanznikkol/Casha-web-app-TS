import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Plus } from "lucide-react"

function AddTransactionDialogBox() {
  return (
    <Dialog>
        {/* Add Transaction Button */}
        <DialogTrigger asChild>
            <Button className="hover:cursor-pointer duration-100">
                <Plus/>
                Add Transaction
            </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-md">
            {/* Header */}
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Add Transaction</DialogTitle>
                <DialogDescription>Fill in the details of your transaction</DialogDescription>
            </DialogHeader>

            {/* Form */}
            
            
            <DialogFooter>
                <Button type="submit">Save</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default AddTransactionDialogBox