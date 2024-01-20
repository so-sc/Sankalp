"use client"
import { getCookie } from "cookies-next"
import React, { useEffect, useState } from "react"
import { QrReader } from "react-qr-reader"

import { Button } from "@/components/ui/button"

export default function Page() {
  const [data, setData] = useState("")
  const [selectedOption, setSelectedOption] = useState("e")
  const [scanning, setScanning] = useState(false)
  const [errorOccurred, setErrorOccurred] = useState(false) // Added error state

  useEffect(() => {
    data && console.log("state value changed -->", data)
  }, [data])

  useEffect(() => {
    console.log("selectedOption changed -->", selectedOption)
  }, [selectedOption])

  const handleScannerOutput = async (res: React.SetStateAction<string>) => {
    console.log("response of qr code scanner -->", res)
    console.log("option: " + selectedOption)

    try {
      if (!errorOccurred) {
        await sendDataToAPI(selectedOption, res)
      }
    } catch (error) {
      console.error("Error sending data to the API:", error)
      setErrorOccurred(true)
      // alert("Error sending data to the API: " + error)
    } finally {
      setScanning(false) // Set scanning back to false after successful scan or error
    }
  }

  const startScanning = () => {
    setErrorOccurred(false) // Reset error state when starting a new scan
    setScanning(true)
  }

  const sendDataToAPI = async (
    option: string,
    qrData: React.SetStateAction<string>
  ) => {
    const token = getCookie("admin-token")
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/verify/${option}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventID: qrData }),
      }
    )

    let res = await response.json()

    if (res.success) {
      alert("Data sent to the API successfully")
      window.location.reload()
    } else {
      alert(`${res.message}`)
      window.location.reload()
      throw new Error(`Error: ${res.message}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center">
      {scanning ? (
        <div>
          {/* @ts-ignore */}
          <QrReader
            onResult={(result: any) => {
              if (!!result) {
                // @ts-ignore
                handleScannerOutput(result?.text)
              }
            }}
            className="mx-10"
            // videoContainerStyle={{
            //   height: "90%",
            //   width: "90%",
            // }}
          />
        </div>
      ) : (
        <div className="flex flex-col space-y-5 justify-center items-center py-5">
          <select
            className="px-5 py-3 rounded-lg bg-secondary text-white font-bold"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="e">Event</option>
            <option value="h">Hackathon</option>
            <option value="t">Talk</option>
          </select>
          <div>
            <Button onClick={startScanning}>Start Scanning</Button>
          </div>
        </div>
      )}

      {/* <div>
        <p>Scanned QR Code Data:</p>
        <p>{data}</p>
      </div> */}
    </div>
  )
}
