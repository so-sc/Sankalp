"use client"
import React, { useEffect, useState } from "react"
import { getCookie } from "cookies-next"
import { QrReader } from "react-qr-reader"
import { redirect } from "next/navigation"

export default function Page() {
  const [data, setData] = useState("")
  const [selectedOption, setSelectedOption] = useState("e")

  useEffect(() => {
    data && console.log("state value changed -->", data)
  }, [data])

  useEffect(() => {
    console.log("selectedOption changed -->", selectedOption)
  }, [selectedOption])
  
  const handleScannerOutput = (res: React.SetStateAction<string>) => {
    console.log("response of qr code scanner -->", res)
    console.log('option: '+selectedOption)
    sendDataToAPI(selectedOption, res)
    // Redirect should be performed after the state has been updated
    // redirect(`/hackathon/qrcode/${res}`)

    // Send data to API after the state has been updated
  }

  const sendDataToAPI = async (
    option: string,
    qrData: React.SetStateAction<string>
  ) => {
    const token = getCookie("admin-token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/verify/${option}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ "eventID": qrData }),
        }
      )
      let res = await response.json()
      if (res.success) {
        alert("Data sent to the API successfully")
      } else {
        throw new Error(`Error: ${res.message}`)
      }
    } catch (error) {
      console.error("Error sending data to the API:", error)
    }
  }

  return (
    <div>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="e">Event</option>
        <option value="h">Hackathon</option>
        <option value="t">Talk</option>
      </select>

      <div>
        <p>Scanned QR Code Data:</p>
        <p>{data}</p>
      </div>

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
