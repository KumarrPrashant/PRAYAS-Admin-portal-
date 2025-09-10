"use client"

import { motion } from "framer-motion"

export function MarqueeSlogan() {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative overflow-hidden border-b-4 border-primary/20 shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500 via-white to-green-600 opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-white/40 to-green-600/20 backdrop-blur-sm" />

      <div className="relative z-10 py-4">
        <div className="marquee whitespace-nowrap">
          <span className="text-xl lg:text-2xl font-serif font-bold tracking-wide text-navy-800 drop-shadow-lg">
            🇮🇳 PRAYAS : PROBLEM REPORTING AND ACTION FOR YOUR AREA'S SECURITY - सभी नागरिकों के लिए डिजिटल भारत पहल -
            PRAYAS : PROBLEM REPORTING AND ACTION FOR YOUR AREA'S SECURITY - जन कनेक्ट - आपकी समस्या, हमारा समाधान 🇮🇳
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-white to-green-600 animate-pulse"></div>
    </motion.div>
  )
}
