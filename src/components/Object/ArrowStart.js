import React, {useContext} from "react"
import {ArrowsContext} from "../../contexts/arrowsContext"

function ArrowStart() {
	const {setIsArrowDragged, start, setStart, setEnd} = useContext(ArrowsContext)

	function handleMouseDown(event) {
		setIsArrowDragged(true)
		setStart({X: event.clientX, Y: event.clientY})
	}

	function handleMouseUp(event) {
		setIsArrowDragged(false)
		setEnd({X: start.X, Y: start.Y})
	}

	return (
		<svg 
			viewBox="0 0 19 18" 
			fill="none" 
			xmlns="http://www.w3.org/2000/svg"
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
		>
			<circle className="outer" cx="9.5" cy="9" r="8" strokeWidth="2"/>
			<circle className="inner" cx="9.5" cy="9" r="4"/>
		</svg>
	)
}

export default ArrowStart