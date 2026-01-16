"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import {
  Moon,
  Sun,
  Lock,
  Mail
} from "lucide-react"
import { features, securityFeatures } from "@/constants"

function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-linear-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link
            href="/"
            className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600"
          >
            Defibit
          </Link>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="hover:text-purple-600 transition-colors">
              Features
            </a>
            <a href="#security" className="hover:text-purple-600 transition-colors">
              Security
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full text-sm transition-colors duration-300">
                Open Wallet
              </button>
            </Link>
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <section className="relative mb-24">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-600/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left column */}
            <div className="text-center lg:text-left">
              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                Your{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">
                  Universal
                </span>{" "}
                Wallet
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">
                One secure wallet for all your digital assets. Trade and manage your portfolio with confidence.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-12">
                <Link href="/register">
                  <button className="px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:opacity-90 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                    Create Free Wallet
                  </button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">$2B+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Assets Managed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600">1M+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">150+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Supported Coins</div>
                </div>
              </div>
            </div>

            {/* Right column - Wallet Preview */}
            <div className="relative">
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 transform transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-linear-to-r from-purple-600 to-pink-600 rounded-full"></div>
                    <div>
                      <div className="font-semibold">Total Balance</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Updated just now</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold">$25,432.95</div>
                </div>

                {/* Asset preview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        ₿
                      </div>
                      <div>Bitcoin</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">0.45 BTC</div>
                      <div className="text-sm text-green-500">+3.54%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        Ξ
                      </div>
                      <div>Ethereum</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">4.21 ETH</div>
                      <div className="text-sm text-green-500">+5.23%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-600/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-pink-600/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">
                Digital Assets
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Everything you need to manage your cryptocurrency portfolio in one secure platform
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const bgColor =
                feature.color === "purple" ? "bg-purple-100 dark:bg-purple-900/30" : "bg-pink-100 dark:bg-pink-900/30"
              const textColor = feature.color === "purple" ? "text-purple-600" : "text-pink-600"
              const tagBg =
                feature.color === "purple" ? "bg-purple-100 dark:bg-purple-900/30" : "bg-pink-100 dark:bg-pink-900/30"

              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mb-6`}>
                    <Icon className={`w-6 h-6 ${textColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{feature.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className={`px-3 py-1 ${tagBg} ${textColor} rounded-full text-sm`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Security Section */}
        <section id="security" className="mb-24 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/5 rounded-full blur-3xl -z-10"></div>

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bank-Grade{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">
                Security
              </span>{" "}
              Protocols
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Your assets are protected by multiple layers of cutting-edge security measures
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Security visualization */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg flex items-center justify-center min-h-[400px]">
              <div className="relative w-64 h-64">
                <div
                  className="absolute inset-0 rounded-full border-4 border-dashed border-purple-200 dark:border-purple-900 animate-spin"
                  style={{ animationDuration: "20s" }}
                ></div>
                <div
                  className="absolute inset-8 rounded-full border-4 border-dashed border-pink-200 dark:border-pink-900 animate-spin"
                  style={{ animationDuration: "15s", animationDirection: "reverse" }}
                ></div>
                <div className="absolute inset-16 rounded-full bg-linear-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                  <Lock className="w-12 h-12 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Security features */}
            <div className="space-y-6">
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600 mb-4">
                Defibit
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Secure, reliable, and user-friendly crypto wallet for the next generation of digital finance.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  <a href="#features" className="hover:text-purple-600 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors">
                    Staking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors">
                    Supported Assets
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Subscribe to our newsletter for the latest updates and features.
              </p>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button className="px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 dark:text-gray-400 text-sm">
            <p>© 2026 Defibit. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-purple-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-purple-600 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-purple-600 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home