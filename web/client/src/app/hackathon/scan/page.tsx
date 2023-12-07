"use client"
import React, { useEffect, useState } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import { QrReader } from "react-qr-reader"
import { redirect } from "next/navigation"
export default function Page() {
  const [data, setData] = useState("")

  useEffect(() => {
    data && console.log("state value changed -->", data)
  }, [data])

  // scanner result handler
  const handleScannerOutput = (res: any) => {
    console.log("response of qr code scanner -->", res)
    redirect(`/hackathon/qrcode/${res}`)
    setData(res)
  }

  return (
    <div>
      {/* @ts-ignore */}
      <QrReader
        onResult={(result) => {
          if (!!result) {
            // @ts-ignore
            handleScannerOutput(result?.text)
          }
        }}
        videoContainerStyle={{
          paddingTop: "100vh",
          height: "50%",
          width: "50%",
        }}
        className="rounded-3xl"
      />
    </div>
  )
}
