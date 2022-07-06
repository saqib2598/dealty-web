import React from 'react'
import { useEffect, useRef, useState } from "react"
import { DateRangePicker } from 'react-date-range';


const RangeCustomDate = (props) => {
    const ref = useRef()
    const [isMenuOpen, setIsMenuOpen] = useState(true)

    useEffect(() => {
        const checkIfClickedOutside = e => {
          if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
            setIsMenuOpen(false)
            props.toggleRangeCalender()
          }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
    
        return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isMenuOpen])

    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }
      const handleSelect = (ranges) => {
        var values = {StartDate:ranges.selection.startDate, EndDate:ranges.selection.endDate, place:props.place }
        props.handleFilters(values)
      }
    return(
        <div className="wrapper" ref={ref}>
        <div className='mt-3'> 
        <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
       />
       </div>
       </div>
    )
}

export default RangeCustomDate

