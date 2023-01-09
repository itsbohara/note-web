import React from 'react'

function NotAvailable() {
  return (
    <div
      className="h-1 w-1"
      style={{
        display: "grid",
        background: "#f8f8f8",
        placeContent: "center",
      }}
    >
      <h1>Page not available</h1>
    </div>
  )
}

export default NotAvailable