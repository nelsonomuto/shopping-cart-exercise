import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import "../assets/css/components/confirmation-button.css"

const ConfirmationButton = ({
  children,
  onConfirm,
  confirmText = "I'm Sure",
  cancelText = "Nevermind",
  className = "",
}) => {
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
    <div className={`confirmation-button ${className}`} ref={containerRef}>
      {isConfirming ? (
        <>
          <button
            className="confirm-no"
            key="cancel-confirm"
            onClick={() => setConfirming(false)}
          >
            {cancelText}
          </button>
          <button className="confirm-yes" key="confirm" onClick={confirm}>
            {confirmText}
          </button>
        </>
      ) : (
        <button onClick={() => setConfirming(true)}>{children}</button>
      )}
    </div>
  )
}

ConfirmationButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  className: PropTypes.string,
}

export default ConfirmationButton
