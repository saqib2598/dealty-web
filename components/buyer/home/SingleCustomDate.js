import React from 'react'
import { useEffect, useRef, useState } from "react"
import { Calendar } from 'react-date-range';


const SingleCustomDate = (props) => {
    const ref = useRef()
    const [isMenuOpen, setIsMenuOpen] = useState(true)

    useEffect(() => {
        const checkIfClickedOutside = e => {
          if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
            setIsMenuOpen(false)
            props.toggleSingleCalender()
          }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
    
        return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isMenuOpen])
  return (
    <div className="wrapper" ref={ref}>
      {isMenuOpen &&
      <Calendar
        date={new Date()}
        onChange={props.handleSelects}
      />
      }
    </div>

  )
}

export default SingleCustomDate