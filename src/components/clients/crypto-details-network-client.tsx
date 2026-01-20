"use client";

import { ChevronLeft, TrendingUp, CreditCard, ArrowUp, ArrowDown, ArrowLeftRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SendModal } from '../modals/send-modal';
import { ReceiveModal } from '../modals/receive-modal';
import { formatDate } from '@/lib/utils';
import CryptoImage from '../crypto-image';
import Link from "next/link";

interface CryptoDetailsNetworkClientProps {
  coin: string
  transactions: string
  coinDetails: {
    coinBalance: number
    coinPrice: number
    coinName: string
    src: string;
    alt: string;
    networkSrc: string | null;
    network: string | null;
  }
}

function CryptoDetailsNetworkClient({ coin, transactions, coinDetails }: CryptoDetailsNetworkClientProps) {
  const router = useRouter();

  const [showSendModal, setShowSendModal] = useState(false)
  const [showReceiveModal, setShowReceiveModal] = useState(false)

  const coinName = coinDetails.coinName
  const coinSymbol = coin.toUpperCase()
  const balance = coinDetails.coinBalance
  const usdValue = coinDetails.coinBalance * coinDetails.coinPrice;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white pb-24 md:pb-4">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => router.back()}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-bold">{coinSymbol}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {coinSymbol} | {coinName}
          </p>
        </div>
        <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <TrendingUp size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4">
        {/* Coin Icon */}
        <div className="flex justify-center my-8">
          <CryptoImage
            src={coinDetails.src}
            alt={coinDetails.alt}
            networkSrc={coinDetails.networkSrc}
            network={coinDetails.network}
          />
        </div>

        {/* Balance */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{balance} {coinSymbol}</h2>
          <p className="text-gray-500 dark:text-gray-400">
            ${usdValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="my-8 grid grid-cols-4 gap-4">
          <div className="flex flex-col items-center">
            <button
              onClick={() => setShowSendModal(true)}
              className="h-16 w-16 rounded-full bg-gray-200 dark:bg-[#374151] hover:bg-gray-300 dark:hover:bg-[#2e3847] flex items-center justify-center"
            >
              <ArrowUp className="text-xl w-5 h-5" />
            </button>
            <span className="mt-2 text-sm">Send</span>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={() => setShowReceiveModal(true)}
              className="h-16 w-16 rounded-full bg-gray-200 dark:bg-[#374151] hover:bg-gray-300 dark:hover:bg-[#2e3847] flex items-center justify-center"
            >
              <ArrowDown className="text-xl w-5 h-5" />
            </button>
            <span className="mt-2 text-sm">Receive</span>
          </div>
          <div className="flex flex-col items-center">
            <Link
              href="/buy"
              className="h-16 w-16 rounded-full bg-gray-200 dark:bg-[#374151] hover:bg-gray-300 dark:hover:bg-[#2e3847] flex items-center justify-center"
            >
              <CreditCard className="text-xl w-5 h-5" />
            </Link>
            <span className="mt-2 text-sm">Buy</span>
          </div>
          <div className="flex flex-col items-center">
            <Link
              href="/swap"
              className="h-16 w-16 rounded-full bg-gray-200 dark:bg-[#374151] hover:bg-gray-300 dark:hover:bg-[#2e3847] flex items-center justify-center"
            >
              <ArrowLeftRight className="text-xl w-5 h-5" />
            </Link>
            <span className="mt-2 text-sm">Swap</span>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-center pb-4 border-b-2 border-gray-900 dark:border-white">
            Transactions
          </h3>
        </div>

        {/* Transaction List */}
        <div className="space-y-4">
          {(JSON.parse(transactions) as NotificationType[]).length > 0
            ? (JSON.parse(transactions) as NotificationType[]).map((tx) => {
              const isPositive = tx.from === coin.toUpperCase();

              return (
                <div
                  key={tx._id}
                  className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${isPositive ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="text-white" size={20} />
                      ) : (
                        <TrendingUp className="text-white rotate-180" size={20} />
                      )}
                    </div>

                    {/* Details */}
                    <div>
                      <h4 className="font-semibold">
                        {isPositive ? `Swapped from ${tx.to}` : `Swapped to ${tx.from}`}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(tx.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="text-right">
                    <p className={`font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}>
                      {isPositive ? `+${tx.fromAmount}` : `-${tx.toAmount}`} {isPositive ? tx.to : tx.from}
                    </p>
                  </div>
                </div>
              )
            }) : (
              <div>

              </div>
            )
          }
        </div>
      </div>

      <SendModal
        isOpen={showSendModal}
        onClose={() => setShowSendModal(false)}
      />
      <ReceiveModal
        isOpen={showReceiveModal}
        onClose={() => setShowReceiveModal(false)}
      />
    </main>
  )
}

export default CryptoDetailsNetworkClient