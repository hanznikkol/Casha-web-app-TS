import AddAccountDialogBox from '@/components/pages_components/Accounts/AddAccountDialogBox'
import React, { useEffect, useState } from 'react'
import type { Accounts } from '@/types/Accounts'
import { supabase } from '@/lib/supabase'
import AccountCards from '@/components/pages_components/Accounts/AccountCards'
import { Card } from '@/components/ui/card'
import { CirclePlus } from 'lucide-react'
import EditAccountDialogBox from '@/components/pages_components/Accounts/EditAccountDialogBox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Accounts() {

  const [accounts, setAccounts] = useState<Accounts[]>([])
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [loading, setLoading] = useState(true)
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectAccount, setSelectedAccount] = useState<Accounts | null>(null);
  const [selectedTab, setSelectedTab] = useState('all')

  const accountTypes = ["all", "cash", "bank", "wallet"];
  const fetchAccount = async () => {
    setLoading(true)
    const {data, error} = await supabase.from('accounts').select("*")
    if (!error) setAccounts (data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchAccount()
  }, [])

  return (
    <>
      <div className='w-full h-full flex-col gap-8'>
        {/* Header */}
        <div className='flex items-center justify-between mb-4'> 
          <h1 className='text-2xl font-bold text-foreground'>Accounts</h1>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} orientation='horizontal'>
          <TabsList>
            {accountTypes.map((type) => (
              <TabsTrigger key={type} value={type} className='hover:cursor-pointer data-[state=active]:bg-accent'>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedTab} className='pt-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 '>
              {loading ? (
                <>
                  <Card className="h-32 animate-pulse bg-muted"></Card>
                  <Card className="h-32 animate-pulse bg-muted"></Card>
                  <Card className="h-32 animate-pulse bg-muted"></Card>
                </>
              ) : (
                <>
                  {/* Account Card List */}
                    {accounts
                    .filter(acc => selectedTab === "all" || acc.account_type.toLowerCase() === selectedTab)
                    .map((acc) => 
                    (
                      <AccountCards
                        key={acc.account_id}
                        account_id={acc.account_id}
                        account_name={acc.account_name}
                        account_type={acc.account_type}
                        balance={acc.balance}
                        onEdit={() => {
                          setSelectedAccount(acc)
                          setOpenEditDialog(true)
                        }}
                      ></AccountCards>
                    )
                    )}

                    {/* Add Account Card */}
                    <Card
                      onClick={() => setOpenAddDialog(true)}
                      className="flex flex-col items-center justify-center border-2 border-dashed shadow-none cursor-pointer hover:bg-muted/50 transition"
                    >
                      <CirclePlus className="h-8 w-8 mb-2 text-gray-400" />
                      <span className="text-sm text-gray-500">Add Account</span>
                    </Card>
                </>
              )}  
            </div>
          </TabsContent>
          
        </Tabs>


        {/* Dialog Box */}
        <AddAccountDialogBox
          open={openAddDialog}        
          onOpenChange={setOpenAddDialog} 
          onAdded={fetchAccount}          
          withTrigger={false}
        />

        <EditAccountDialogBox
          open={openEditDialog}
          onOpenChange={setOpenEditDialog}
          account={selectAccount}
          onUpdated={fetchAccount}
        />
      </div>
    </>
  )
}