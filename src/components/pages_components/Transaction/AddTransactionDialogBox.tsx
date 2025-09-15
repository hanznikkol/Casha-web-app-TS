import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Plus } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

type AddTransactionModalProps = {
  onAdded?: () => void
}

export default function AddTransactionDialogBox({ onAdded }: AddTransactionModalProps) {

  const [form, setForm] = useState({
    category: "",
    amount: "",
    type: "",
    description: "",
    account_id: null,
  })  

  const handleSubmit = async () => {
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
            type: "expense",
            description: "",
            account_id: null,
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
                <div className="grid gap-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                    id="amount"
                    type="number"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    />
                </div>

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

                <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                    id="category"
                    placeholder="Food, Bills, Transport..."
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    />
                </div>

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
    </Dialog>
  )
}