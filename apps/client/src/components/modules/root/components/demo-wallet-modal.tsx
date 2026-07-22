import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Wallet } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { toast } from "sonner"

const DemoWalletModal = () => {
    const [amount, setAmount] = useState("")
    const [showInput, setShowInput] = useState(false)
    const [balance, setBalance] = useState(0);
    const [tab, setTab] = useState("credit");

    const handleAddMoney = () => {

        const numAmount = parseFloat(amount)
        if (!numAmount || numAmount < 5 || numAmount > 500) {
                toast.error("Invalid amount. Please enter an amount between $5 and $500.")
                setAmount("")  // Clear the input after withdrawal
                return
        }

        if (tab === "credit") {
            setBalance(prevBalance => prevBalance + numAmount);
            toast.success(`Successfully added $${numAmount.toFixed(2)} to your balance.`)
        } else {
            if (numAmount > balance) {
                toast.error("Insufficient balance to withdraw this amount.")
                setAmount("")  // Clear the input after withdrawal
                return
            }
            setBalance(prevBalance => prevBalance - numAmount)
            toast.success(`Successfully withdrew $${numAmount.toFixed(2)}.`)
        }
        setAmount("")  // Clear the input after withdrawal
    }

    return (
        <Card className="shadow-2xl rounded-2xl">
            <CardContent className="w-90 px-4 pt-6 pb-2 flex flex-col justify-between items-center gap-6">
                <div>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="text-center">
                            <h1 className="text-6xl font-black tracking-tight font-bubbledot text-[#454545]">
                                ${balance.toFixed(2)}
                            </h1>

                            <p className="mt-2 text-[14px] tracking-tight font-normal">
                                Current Amount
                            </p>
                        </div>
                    </div>
                </div>
                <Separator className="w-full" />
                <div className="w-full flex flex-col gap-2">

                    <Input
                        type="number"
                        placeholder="Amount ($5 - $500)"
                        min={5}
                        max={500}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="h-8"
                    />

                    <Tabs defaultValue="overview" value={tab} onValueChange={setTab} className="w-full">
                        <TabsList className="w-full">
                            <TabsTrigger value="credit">Credit</TabsTrigger>
                            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <Button
                        type="button"
                        className="w-full h-8 font-semibold bg-[#454545]"
                        onClick={handleAddMoney}
                        disabled={(showInput && (!amount || parseFloat(amount) < 5))}
                    >

                        {tab === "credit" ? (
                            <div className="flex items-center justify-center gap-2">
                                <Plus className="size-4" />
                                {"Add Money"}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2">
                                <Wallet className="size-4" />
                                {"Withdraw Money"}
                            </div>
                        )}

                    </Button>
                </div>
            </CardContent>
        </Card>
    )
};

export default DemoWalletModal;