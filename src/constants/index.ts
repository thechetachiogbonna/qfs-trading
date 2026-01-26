import { ArrowLeftRight, Home, Cog, CreditCard, ImageIcon, Smartphone, TrendingUp, Shield, Globe, Send, CheckCircle2, Lock, User, UserCheck } from "lucide-react";

export const CRYPTO_ASSETS = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    id: "bitcoin",
    balance: 0,
    icon_image: "/images/coins/btc.png",
    network_image: null,
    network: null
  },
  {
    symbol: "USDT",
    name: "Tether",
    id: "tether",
    balance: 0,
    icon_image: "/images/coins/usdt.png",
    network_image: "/images/coins/trx.png",
    network: "TRC20"
  },
  {
    symbol: "ADA",
    name: "Cardano",
    id: "cardano",
    balance: 0,
    icon_image: "/images/coins/ada.png",
    network_image: null,
    network: null
  },
  {
    symbol: "XLM",
    name: "Stellar",
    id: "stellar",
    balance: 0,
    icon_image: "/images/coins/xlm.png",
    network_image: null,
    network: null
  },
  {
    symbol: "XRP",
    name: "Ripple",
    id: "ripple",
    balance: 0,
    icon_image: "/images/coins/xrp.png",
    network_image: null,
    network: null
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    id: "dogecoin",
    balance: 0,
    icon_image: "/images/coins/doge.png",
    network_image: null,
    network: null
  },
  {
    symbol: "SOL",
    name: "Solana",
    id: "solana",
    balance: 0,
    icon_image: "/images/coins/sol.png",
    network_image: null,
    network: null
  }
]

export const enum MenuItems {
  Home = "Home",
  Kyc = "Kyc",
  Deposit = "Deposit",
  Withdraw = "Withdraw",
  Card = "Card",
  Settings = "Settings",
  Notification = "Notification"
}

export enum NotificationCategory {
  SWAP = "swap",
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  BUY = "buy",
  BONUS = "bonus",
  KYC_UPDATE = "kyc_update",
  METAL_BUY = "metal_buy"
}

export const MENU_ITEMS = [
  { href: "/dashboard", icon: Home, label: MenuItems.Home },
  { href: "/kyc", icon: UserCheck, label: MenuItems.Kyc },
  { href: "/card", icon: CreditCard, label: MenuItems.Card },
  { href: "/settings", icon: Cog, label: MenuItems.Settings }
];

export const features = [
  {
    icon: Globe,
    title: "Multi-Chain Support",
    description: "Support for multiple blockchains including Ethereum, Binance Smart Chain, Polygon, and more.",
    tags: ["Ethereum", "BSC", "Polygon"],
    color: "purple",
  },
  {
    icon: TrendingUp,
    title: "DeFi Integration",
    description: "Direct access to decentralized exchanges, lending platforms, and yield farming opportunities.",
    tags: ["Swap", "Stake", "Farm"],
    color: "pink",
  },
  {
    icon: Shield,
    title: "Advanced Security",
    description:
      "Enterprise-grade security with multi-sig support, hardware wallet integration, and biometric authentication.",
    tags: ["2FA", "Multi-sig", "Biometric"],
    color: "purple",
  },
  {
    icon: TrendingUp,
    title: "Portfolio Tracking",
    description: "Real-time portfolio monitoring with price alerts, performance analytics, and tax reporting tools.",
    tags: ["Analytics", "Alerts", "Reports"],
    color: "pink",
  },
  {
    icon: ImageIcon,
    title: "NFT Support",
    description: "Store, view, and manage your NFT collection with support for multiple marketplaces and chains.",
    tags: ["Gallery", "Trading", "Tracking"],
    color: "purple",
  },
  {
    icon: Smartphone,
    title: "Cross-Platform",
    description: "Access your wallet seamlessly across desktop, mobile, and browser extension platforms.",
    tags: ["Desktop", "Mobile", "Extension"],
    color: "pink",
  },
]

export const securityFeatures = [
  {
    icon: Lock,
    title: "Military-Grade Encryption",
    description:
      "Your private keys are encrypted using AES-256 encryption, the same standard used by military and financial institutions.",
  },
  {
    icon: CheckCircle2,
    title: "Multi-Factor Authentication",
    description:
      "Enhanced security with optional biometric authentication, hardware key support, and time-based OTP.",
  },
  {
    icon: Send,
    title: "Smart Contract Auditing",
    description:
      "Automatic scanning and verification of smart contracts before interaction to prevent malicious transactions.",
  },
]

export const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/card", icon: CreditCard, label: "Cards" },
  { href: "/swap", icon: ArrowLeftRight, label: "Swap" },
  { href: "/settings", icon: User, label: "Me" }
];

export const platforms = [
  { value: "trustwallet", label: "Trust Wallet" },
  { value: "metamask", label: "Metamask" },
  { value: "lobstr", label: "Lobstr" },
  { value: "bitpay", label: "Bitpay" },
  { value: "coinbase", label: "Coinbase Wallet" },
  { value: "edge", label: "Edge Wallet" },
  { value: "uniswap", label: "Uniswap" },
  { value: "polygon", label: "Polygon" },
  { value: "blockchain", label: "Blockchain" },
  { value: "exodus", label: "Exodus" },
  { value: "atomic_wallet", label: "Atomic Wallet" },
  { value: "robinhood", label: "Robinhood Wallet" },
  { value: "uphold_wallet", label: "Uphold Wallet" },
  { value: "luno", label: "Luno Wallet" },
  { value: "ledger_wallet", label: "Ledger Wallet" },
  { value: "trezor_wallet", label: "Trezor Wallet" },
  { value: "electrum_wallet", label: "Electrum Wallet" },
  { value: "coinomi_wallet", label: "Coinomi Wallet" },
  { value: "safepal_wallet", label: "Safepal Wallet" },
  { value: "zengo_wallet", label: "Zengo Wallet" },
  { value: "other", label: "Others" },
]