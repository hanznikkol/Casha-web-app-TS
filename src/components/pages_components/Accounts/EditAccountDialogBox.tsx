import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/lib/supabase";
import type { Accounts } from "@/types/Accounts";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type EditAccountDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: Accounts | null;
  onUpdated?: () => void;
};

export default function EditAccountDialogBox({ open, onOpenChange, account, onUpdated }: EditAccountDialogProps) {
const [form, setForm] = useState({ 
    account_name: "", 
    account_type: "wallet", 
    balance: ""
})

useEffect(() => {
  if (open && account) {
    setForm({
      account_name: account.account_name,
      account_type: account.account_type,
      balance: String(account.balance),
    });
  }
}, [open, account]);

const handleSubmit = async () => {
    if (!account) return;

    const { error } = await supabase.from('accounts').update([
        {
        account_name: form.account_name,
        account_type: form.account_type,
        balance: Number(form.balance) || 0,
      }
    ]).eq("account_id", account.account_id)

    if (error) {
      toast.error("Failed to update account");
    } else {
      toast.success("Account updated successfully");
      onUpdated?.();
      onOpenChange(false);
    }
}

return(
    <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Edit Account</DialogTitle>
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