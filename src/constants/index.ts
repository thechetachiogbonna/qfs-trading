import { Layers, Bell, ArrowLeftRight, Home, Cog, CreditCard, ImageIcon, Smartphone, TrendingUp, Shield, Globe, Send, CheckCircle2, Lock, User, UserCheck } from "lucide-react";

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
    symbol: "USDT",
    name: "Tether",
    id: "tether",
    balance: 0,
    icon_image: "/images/coins/usdt.png",
    network_image: "/images/coins/bnb.png",
    network: "BNB"
  },
  {
    symbol: "USDT",
    name: "Tether",
    id: "tether",
    balance: 0,
    icon_image: "/images/coins/usdt.png",
    network_image: "/images/coins/eth.png",
    network: "ERC20"
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

export const MENU_ITEMS = [
  { href: "/dashboard", icon: Home, label: MenuItems.Home },
  { href: "/kyc", icon: UserCheck, label: MenuItems.Kyc },
  { href: "/card", icon: CreditCard, label: MenuItems.Card },
  { href: "/settings", icon: Cog, label: MenuItems.Settings },
  { href: "/notifications", icon: Bell, label: MenuItems.Notification }
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
  { href: "/crypto/manage", icon: Layers, label: "Manage" },
  { href: "/settings", icon: User, label: "Me" }
];