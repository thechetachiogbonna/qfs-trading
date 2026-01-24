"use client";

import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Suspense } from "react";
import Link from "next/link";
import { CRYPTO_ASSETS } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function ActivateCardContent() {
  const searchParams = useSearchParams();
  const searchParamsValue = searchParams.get("card-type");

  if (!searchParamsValue) {
    return toast.error("URL has been modified. Please use the browser back button to go back");
  }

  if (searchParamsValue !== "silver" && searchParamsValue !== "gold") {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="text-center text-red-500 dark:text-red-400">
          <p>URL has been modified. Please use the browser back button to go back</p>
        </div>
      </div>
    );
  }

  const depositAmount = searchParamsValue === "silver" ? "$30,000" : "$50,000";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col px-2 md:px-4 py-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/card"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <div />
        </Link>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Activate Card</h1>
        <div className="w-5" />
      </div>

      {/* Main Content */}
      <div className="flex-1" >
        <div className="max-w-2xl mx-auto">
          {/* Card Type Badge */}
          <div className="mb-8 text-center">
            <span className="inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium capitalize">
              {searchParamsValue} Card Activation
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Card Activation Required
          </h2>

          {/* Content Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 mb-8 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Deposit Requirements</h3>
              <p className="text-gray-700 dark:text-gray-300">
                To activate your {searchParamsValue} card, you need to make a deposit of{" "}
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">{depositAmount}</span> worth of
                approved cryptocurrencies.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Approved Coins</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {CRYPTO_ASSETS.map((asset) => (
                  <div
                    key={asset.id + crypto.randomUUID()}
                    className={cn("px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-center text-sm font-medium text-gray-700 dark:text-gray-300 relative", asset.network && "max-sm:pl-0")}
                  >
                    {asset.symbol}
                    {asset.network && (
                      <Badge
                        className="absolute bottom-0 right-0"
                      >
                        {asset.network}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Automatic Activation</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Once our system detects your deposit, your card will be activated automatically within a few minutes.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/deposit"
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors text-center"
            >
              Make a Deposit
            </Link>
            <Link
              href="/card"
              className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold rounded-lg transition-colors text-center"
            >
              Back to Cards
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const ActivateCard = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ActivateCardContent />
  </Suspense>
);

export default ActivateCard;