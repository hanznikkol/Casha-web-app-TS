import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Plus } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import AddAccountDialogBox from "../Accounts/AddAccountDialogBox"

type AddTransactionModalProps = {
  onAdded?: () => void
}

type Account = {
  account_id: string
  account_name: string
}

export default function AddTransactionDialogBox({ onAdded }: AddTransactionModalProps) {
  
const [form, setForm] = useState({
    account_id: "",
    category: "",
    amount: "",
    type: "expense",
    description: "",    
})  

const [accounts, setAccounts] = useState<Account[]>([])
const [openAccountDialog, setOpenAccountDialog] = useState(false)

const fetchAccounts = async () => {
    const {data, error} = await supabase.from('accounts').select("account_id, account_name")

    if(error) {
        toast.error("Failed to load accounts")
    } 
    else {
        setAccounts(data || [])
    }
}

useEffect(() => {
    fetchAccounts()
}, [])


const handleSubmit = async () => {
    if (!form.account_id) {
        toast.error("Please select an account")
        return
    }
    const {error} = await supabase.from("transactions").insert([form])
    if (error) {
        toast.error(`Transaction failed: ${error.message}`)
        console.log(`Transaction failed: ${error.message}`)
    }
    else {
        toast.success(`${form.type} of ${form.amount} saved successfully!`)
        setForm({
            category: "",
            amount: "",
            type: "",
            description: "",
            account_id: "",
        })
        onAdded?.()
    }
}

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
            <div className="grid gap-4 py-4">
                {/* Account */}
                <div className="grid gap-2">
                    <Label htmlFor="account">Account</Label>
                    <Select
                        value={form.account_id}
                        onValueChange={(val) => {
                            if (val === "add") {
                            setOpenAccountDialog(true)
                            } 
                            else {
                                setForm({ ...form, account_id: val })
                            }
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Preferred Account"></SelectValue>
                        </SelectTrigger>

                        <SelectContent>
                            {accounts.map((acc) => (
                                <SelectItem key={acc.account_id} value={acc.account_id}>
                                    {acc.account_name}
                                </SelectItem>
                            ))}

                            <SelectItem className="" value="add">
                                + Add Item
                            </SelectItem>   
                        </SelectContent>
                    </Select>
                </div>
                {/* Amount */}
                <div className="grid gap-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                    id="amount"
                    type="number"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    />
                </div>
                {/* Type */}
                <div className="grid gap-2">
                    <Label>Type</Label>
                    <RadioGroup
                        defaultValue="expense"
                        onValueChange={(val) => setForm({ ...form, type: val })}
                        className="flex gap-4"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="income" id="income" />
                            <Label htmlFor="income">Income</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="expense" id="expense" />
                            <Label htmlFor="expense">Expense</Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* Category */}
                <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                    id="category"
                    placeholder="Food, Bills, Transport..."
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    />
                </div>
                {/* Description */}
                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                    id="description"
                    placeholder="Optional note"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                </div>
            </div>
            
            
            <DialogFooter>
                <Button type="submit" onClick={handleSubmit}>Save</Button>
            </DialogFooter>
        </DialogContent>

        {/* Nested Add Account Dialog */}
        <AddAccountDialogBox
            open = {openAccountDialog}
            onOpenChange={setOpenAccountDialog}
            onAdded={fetchAccounts}
            withTrigger={false}   
        ></AddAccountDialogBox>  
    </Dialog>
  )
}