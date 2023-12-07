// ScanPage.js
"use client"
import React from "react"
import Test from "@/app/qrcode/[id]/qrscanner"
const ScanPage = () => {
  return (
    <div>
      <h1>QR Code Scanner</h1>
      <Test />
    </div>
  )
}

export default ScanPage
