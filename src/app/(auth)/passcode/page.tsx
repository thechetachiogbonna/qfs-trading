"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Lock, ArrowLeft, Delete as Delete2 } from "lucide-react"
import { verifyPasscode } from "@/actions/passcode.action"

function Passcode() {
  const [passcode, setPasscode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleDelete = () => {
    setPasscode(passcode.slice(0, -1))
  }

  const handleClearPasscode = () => {
    setPasscode("")
    setError("")
  }

  const handleVerify = async (codeToVerify: string) => {
    const code = codeToVerify;
    if (code.length !== 6) {
      setError("Please enter a 6-digit passcode")
      return
    }

    setError("")

    setIsLoading(true)
    try {
      const { success } = await verifyPasscode(code)

      if (success) {
        router.push("/dashboard")
      } else {
        setError("Invalid passcode")
        setPasscode("")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      setPasscode("")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddNumber = async (num: number) => {
    if (passcode.length < 6) {
      const newPasscode = passcode + num
      setPasscode(newPasscode)
      setError("")

      // Auto-submit when 6 digits are entered
      if (newPasscode.length === 6) {
        await handleVerify(newPasscode)
      }
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleVerify(passcode)
  }

  if (!isMobile) {
    return (
      <>
        {/* Header with icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
            <Lock className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Security Check</h1>
          <p className="text-gray-600 dark:text-gray-400">Please enter your 6-digit passcode to continue</p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Passcode Input */}
          <div>
            <div className="relative group">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value.slice(0, 6))}
                maxLength={6}
                required
                className="block w-full text-center text-2xl tracking-[1em] py-4 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-600 focus:border-transparent dark:text-gray-200 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 group-hover:border-yellow-500 dark:group-hover:border-yellow-600"
                placeholder="••••••"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="off"
                autoFocus
              />
            </div>

            {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={isLoading || passcode.length !== 6}
            className="w-full px-4 py-3 text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
          >
            <span className="flex items-center justify-center">
              <Lock className="h-5 w-5 mr-2" />
              {isLoading ? "Verifying..." : "Verify"}
            </span>
          </button>
        </form>
      </>
    )
  }

  // Mobile Version with Keypad
  return (
    <div className="fixed inset-0 bg-linear-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center items-center">
      {/* Back Button */}
      <div className="p-3 self-start">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-200"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col items-center px-6 flex-1">
        {/* Header */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
            <Lock className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />
          </div>
          <h1 className="text-2xl font-bold text-yellow-500 dark:text-yellow-400 mb-2">Enter Passcode</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Passcode adds an extra layer of security</p>
        </div>

        {/* Passcode Dots */}
        <div className="flex space-x-4 mb-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 transform ${i < passcode.length ? "bg-yellow-500 dark:bg-yellow-400 scale-125" : "bg-gray-300 dark:bg-gray-600"
                }`}
            ></div>
          ))}
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm py-1 text-center">{error}</p>}

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {/* Number buttons 1-9 */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleAddNumber(num)}
              disabled={isLoading || passcode.length === 6}
              className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-yellow-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {num}
            </button>
          ))}

          {/* Bottom Row */}
          <button
            onClick={handleClearPasscode}
            disabled={isLoading}
            className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-yellow-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-500 active:scale-95 disabled:opacity-50"
          >
            <span className="text-xs">Clear</span>
          </button>

          <button
            onClick={() => handleAddNumber(0)}
            disabled={isLoading || passcode.length === 6}
            className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-yellow-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            0
          </button>

          <button
            onClick={handleDelete}
            disabled={isLoading || passcode.length === 0}
            className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-yellow-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-500 active:scale-95 disabled:opacity-50"
          >
            <Delete2 className="w-6 h-6 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Passcode