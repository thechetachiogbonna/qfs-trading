"use client";

import { useState } from "react"
import { ArrowLeft, Copy, Share2 } from "lucide-react"
import Link from "next/link"
import CryptoImage from "../crypto-image";
import { User } from "@/lib/auth";
import { CRYPTO_ASSETS } from "@/constants";
import Image from "next/image";

interface DepositClientProps {
  coin: string
  network: string
  user: User
}

const coinAddresses = {
  btc: "bc1qlv3hl52d58u43ckgw8z2ypx9d2y58yauvxzzlq",
  xrp: "rhm1ZXEG8gqwFYt5poQVtsJf6psj3Wrvj6",
  sol: "9bsUcSx5YMyzBGLE46Mirg92JLD7SuUFEEJBGFcwhpDB",
  doge: "DEheHosSRKV4mo83C7AdZKbWv9QnhqzJKp",
  xlm: "GAUC5557KQ7J3LR2KRLA4H4L3TODFOLIPPLZWR4FPBX3VUX6BTM4NQEY",
  ada: "addr1qxp56txqn6npejt3u7a3czvf4pwn3dkededswr2xtxsqzwzwese38wtqgn0pnf32nw4shsj8edc93en5aj0hpw6nwf7s63tlm9"
}

function DepositClient({ coin, network, user }: DepositClientProps) {
  const [copied, setCopied] = useState(false)

  const coinDetails = CRYPTO_ASSETS.find(asset => {
    return asset.network === network || asset.symbol === coin.toLocaleUpperCase()
  })

  const coinSrc = `/images/qrcodes/${coin.toLowerCase()}.png`
  const coinAddress = coinAddresses[coin.toLowerCase() as keyof typeof coinAddresses]
  const currency = coin.toUpperCase();


  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(coinAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const sharePayID = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Deposit ${currency}`,
          text: coinAddress,
        })
      } catch (err) {
        console.error("Share failed:", err)
      }
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <Link href="/deposit" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-semibold">Deposit {currency}</h1>
        <div className="w-6" />
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Warning Banner */}
        <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="text-yellow-500 text-xl shrink-0">⚠</div>
            <p className="text-yellow-500 text-sm">
              Only send {currency} assets to this address.
            </p>
          </div>
        </div>

        {/* Coin Header */}
        <div className="flex items-center justify-center space-x-2 pt-4">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-black">
            <CryptoImage
              src={coinDetails?.icon_image ?? ""}
              alt={coinDetails?.name ?? ""}
              networkSrc={coinDetails?.network_image ?? ""}
              network={coinDetails?.network ?? ""}
            />
          </div>
          <span className="text-lg font-medium">{currency}</span>
          {network !== "native" && (
            <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
              {network}
            </span>
          )}
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center space-y-6">
          {/* QR Code */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <Image
              src={coinSrc}
              alt={currency}
              width={256}
              height={256}
              className="w-[256px] h-[256px]"
            />
          </div>

          {/* Display Value */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {currency} Address
            </p>
            <p className="text-sm font-mono break-all px-4 select-all max-w-xs">{coinAddress}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-8 pt-4">
          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <Copy className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">{copied ? "Copied!" : "Copy"}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={sharePayID}
            className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Share</span>
          </button>
        </div>

        {/* Copy Success Message */}
        {copied && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg animate-fade-in-out">
            Address copied to clipboard
          </div>
        )}
      </div>
    </main>
  )
}

export default DepositClient;