import UpdateCoinBalanceButton from '@/components/admin/UpdateCoinBalance'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { auth, User } from '@/lib/auth'
import { AlertOctagon } from 'lucide-react'
import { headers } from 'next/headers'

async function AddBalance() {
  try {
    const result = await auth.api.listUsers({
      query: { limit: 100 },
      headers: await headers()
    })

    const users = result.users as User[]

    return (
      <div className="w-full max-w-6xl mx-auto pt-4">
        <div className="rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Coin Balance</TableHead>
                <TableHead>Coin Type</TableHead>
                <TableHead>New Coin Balance</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0
                ? users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      {user.name}
                    </TableCell>
                    <TableCell>
                      {user.email}
                    </TableCell>
                    <TableCell className="text-gray-500">
                      <select className="w-[100px] border rounded px-3 py-2 focus:outline-none focus:border-[#42a5f5]">
                        <option>Old balance</option>
                        {Object.entries(JSON.parse(user.coins) as UserCoin).map(([symbol, coin]) => {
                          return (
                            <option
                              key={symbol}
                            >
                              {symbol}: {coin.balance}
                            </option>
                          )
                        })}
                      </select>
                    </TableCell>

                    <UpdateCoinBalanceButton user={user} />
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-[#a0a0b2] py-6">
                      No data found.
                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </div >
      </div >
    )
  } catch {
    return (
      <div className="w-full flex justify-center items-center mt-2">
        <AlertOctagon color="red" size={15} /> <p className="text-red-700">An error occurred. Please check your internet connection and refresh the page.</p>
      </div>
    )
  }
}

export default AddBalance