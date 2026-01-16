"use client";

import { CRYPTO_ASSETS } from '@/constants'
import { ArrowLeft, Copy, Search } from 'lucide-react'
import Link from 'next/link'
import CryptoImage from '../crypto-image'
import { Badge } from '../ui/badge';

function CryptoAddressClient() {
  const handleCopyAddress = (address: string) => {

  }

  return (
    <section className="p-2 px-4 pb-24 md:pb-4 text-[15px]">
      {/* Header with Back Button */}
      <div className="mb-8 space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1
            className="text-xl font-semibold text-center flex-1"
          >
            Crypto Address
          </h1>
          <div className="w-6"></div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-[0.5px] focus:ring-gray-700"
          />
        </div>

        <Badge
          className="px-5 py-2 bg-transparent border border-gray-300 dark:border-gray-700 text-black dark:text-white"
        >
          All Networks
        </Badge>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-t-xl md:rounded-lg w-full max-h-[80vh]">
        <div className="p-4">
          {CRYPTO_ASSETS.map((asset) => {
            return (
              <div
                key={asset.id + crypto.randomUUID()}
                className="w-full flex items-center justify-between p-4 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <CryptoImage
                    src={asset.icon_image}
                    alt={asset.name}
                    networkSrc={asset.network_image}
                    network={asset.network}
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm">{asset.symbol}</span>
                      {asset.network && (
                        <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                          {asset.network}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      <span>Balance:</span> 876776
                    </div>
                  </div>
                </div>

                <Copy size={15} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CryptoAddressClient