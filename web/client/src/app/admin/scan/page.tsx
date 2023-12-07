"use client"
import React, { useEffect, useState } from "react"
import { QrReader } from "react-qr-reader"
import { redirect } from "next/navigation"

export default function Page() {
  const [data, setData] = useState("")
  const [selectedOption, setSelectedOption] = useState("")

  useEffect(() => {
    data && console.log("state value changed -->", data)
  }, [data])

  useEffect(() => {
    console.log("selectedOption changed -->", selectedOption)
  }, [selectedOption])

  // scanner result handler
  const handleScannerOutput = (res: React.SetStateAction<string>) => {
    console.log("response of qr code scanner -->", res)
    setData(res)
    sendDataToAPI(selectedOption, res)
    // Redirect should be performed after the state has been updated
    // redirect(`/hackathon/qrcode/${res}`)

    // Send data to API after the state has been updated
  }

  const sendDataToAPI = async (
    option: string,
    qrData: React.SetStateAction<string>
  ) => {
    const apiUrl = `http://localhost:7000/api/admin/verify/${option}`
    console.log(qrData)
    console.log("option:", option)
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qrData }), // Sending JSON data in the request body
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      let res = await response.json()
      console.log(res)

      if (res.success) {
        alert("Data sent to the API successfully")
        // Handle success if needed
      } else {
        const errorMessage = res.message
        console.error(`API error: ${errorMessage}`)
        // Handle error if needed
      }
    } catch (error) {
      console.error("Error sending data to the API:", error)
      // Handle error if needed
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
