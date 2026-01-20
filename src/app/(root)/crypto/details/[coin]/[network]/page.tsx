import { getCoinRelatedTransactions } from '@/actions/notification.action';
import CryptoDetailsNetworkClient from '@/components/clients/crypto-details-network-client'
import { CRYPTO_ASSETS } from '@/constants';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

const getCoinPrice = async (coinId: string) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch crypto data")
    }

    const data = await response.json()

    return {
      usd: data[coinId].usd
    };
  } catch (err) {
    console.error("Error fetching crypto data:", err)
    return {}
  }
}

type Params = {
  params: Promise<{ coin: string, network: string }>
}

async function CryptoDetailsNetwork({ params }: Params) {
  const { coin, network } = (await params);

  const asset = CRYPTO_ASSETS.filter(asset => asset.symbol === coin.toUpperCase())[0];

  if (!asset) {
    throw notFound();
  }

  const [session, coinPrice] = await Promise.all([
    auth.api.getSession({
      headers: await headers()
    }),
    getCoinPrice(asset.id)
  ])

  if (!session) {
    throw redirect("/login")
  }

  const transactions = await getCoinRelatedTransactions(session.user.id, coin.toLocaleUpperCase());

  const coinProp = (
    network === "native" ? coin.toUpperCase() : `${coin.toUpperCase()}_${network.toUpperCase()}`
  ) as keyof UserCoin

  return (
    <CryptoDetailsNetworkClient
      coin={coin}
      transactions={JSON.stringify(transactions)}
      coinDetails={{
        coinBalance: (JSON.parse(session.user.coins) as UserCoin)[coinProp].balance,
        coinPrice: coinPrice.usd,
        coinName: asset.name,
        src: asset.icon_image,
        alt: asset.name,
        networkSrc: asset.network_image,
        network: asset.network
      }}
    />
  )
}

export default CryptoDetailsNetwork