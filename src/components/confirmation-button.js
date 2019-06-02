import React, { useEffect, useRef, useState } from "react"
import "../assets/css/components/confirmation-button.css"

const ConfirmationButton = ({ children, onConfirm }) => {
  const [isConfirming, setConfirming] = useState(false)
  const containerRef = useRef(null)

  const onClickOutside = e => {
    if (containerRef.current.contains(e.target)) {
      // inside
      return
    }
    // outside
    setConfirming(false)
  }

  useEffect(() => {
    if (isConfirming) {
      document.addEventListener("mousedown", onClickOutside)
      return () => {
        document.removeEventListener("mousedown", onClickOutside)
      }
    } else {
      document.removeEventListener("mousedown", onClickOutside)
    }
  }, [isConfirming])

  const confirm = () => {
    setConfirming(false)
    onConfirm()
  }

  return (
    <div className="confirmation-button" ref={containerRef}>
      {isConfirming ? (
        <>
          <button className="confirm-yes" key="confirm" onClick={confirm}>
            I'm Sure
          </button>
          <button
            className="confirm-no"
            key="cancel-confirm"
            onClick={() => setConfirming(false)}
          >
            Nevermind
          </button>
        </>
      ) : (
        <button onClick={() => setConfirming(true)}>{children}</button>
      )}
    </div>
  )
}

export default ConfirmationButton
