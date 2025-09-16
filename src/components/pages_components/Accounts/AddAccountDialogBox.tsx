import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/lib/supabase";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type AddAccountDialogProps = {
    onAdded?: () => void
    open?: boolean
    onOpenChange?: (open: boolean) => void
    withTrigger?: boolean
}

export default function AddAccountDialogBox({ onAdded, open, onOpenChange, withTrigger = true }: AddAccountDialogProps) {

const [form, setForm] = useState({ 
    account_name: "", 
    account_type: "wallet", 
    balance: ""
})

const handleSubmit = async () => {
    const {data: {user}} = await supabase.auth.getUser()
    if (!user) {
        toast.error("You must be logged in to add an account")
        return
    }

    const accountName = form.account_name.trim()
    if (!accountName) {
        toast.error("Account name is required")
        return
    }

    const balanceValue = form.balance === "" ? 0 : Number(form.balance)
    if (isNaN(balanceValue)) {
        toast.error("Starting balance is required and must be a number")
        return
    }

    const { error } = await supabase.from('accounts').insert([
        {
        account_name: accountName,
        account_type: form.account_type,
        balance: balanceValue,
        user_id: user.id,
      }
    ])

    if (error) {
      toast.error(`Failed to add account: ${error.message}`)
      console.error("Add account error:", error)
    } 
    else {
      toast.success(`Account "${form.account_name}" created successfully!`)
      setForm({ account_name: "", account_type: "wallet", balance: "" })
      onAdded?.()
      onOpenChange?.(false)
    }
}

return(
    <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            {withTrigger && (
                <DialogTrigger>
                    <Button className="hover:cursor-pointer duration-100">
                        <Plus/>
                        Add Account
                    </Button>
                </DialogTrigger>
            )
            }
            
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Add Account</DialogTitle>
                    <DialogDescription>Create a new wallet, bank, or cash account.</DialogDescription>
                </DialogHeader>

                 {/* Form */}
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="account_name">Account Name</Label>
                        <Input
                        id="account_name"
                        placeholder="GCash, BDO, Cash on Hand..."
                        value={form.account_name}
                        onChange={(e) => setForm({ ...form, account_name: e.target.value })}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Account Type</Label>
                        <RadioGroup
                            defaultValue="wallet"
                            onValueChange={(val) => setForm({ ...form, account_type: val })}
                            className="flex gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="wallet" id="wallet" />
                                <Label htmlFor="wallet">Wallet</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="bank" id="bank" />
                                <Label htmlFor="bank">Bank</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cash" id="cash" />
                                <Label htmlFor="cash">Cash</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="balance">Starting Balance</Label>
                        <Input
                            id="balance"
                            type="number"
                            placeholder="0"
                            value={form.balance}
                            onChange={(e) => setForm({ ...form, balance: e.target.value})}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit} className="hover:cursor-pointer">Save</Button>
                </DialogFooter>
            </DialogContent>
            
        
        </Dialog>
    </>
)
}