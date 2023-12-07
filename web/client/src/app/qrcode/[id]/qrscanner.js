import React, { Component } from "react"
import QrReader from "react-qr-scanner"
import axios from "axios" // Make sure to install axios using: npm install axios

class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      delay: 100,
      result: "No result",
      fetchedData: null,
    }

    this.handleScan = this.handleScan.bind(this)
  }

  handleScan(data) {
    if (data) {
      // Save the link or data
      this.setState({
        result: data.text,
      })

      // Fetch data from the specified route
      this.fetchData(data.text)
    }
  }

  async fetchData(parameter) {
    try {
      // Make a GET request using axios
      const response = await axios.get(
        `http://localhost:7000/api/admin/verify/${parameter}`
      )

      // Update the component state with the fetched data
      this.setState({
        fetchedData: response.data,
      })
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  handleError(err) {
    console.error(err)
  }

  render() {
    const previewStyle = {
      height: 240,
      width: 320,
    }

    return (
      <div>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
        />
        <p>{this.state.result}</p>
        {this.state.fetchedData && (
          <div>
            <h2>Fetched Data</h2>
            <p>{this.state.fetchedData}</p>
          </div>
        )}
      </div>
    )
  }
}

export default Test
