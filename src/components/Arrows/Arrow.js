import React from "react"

function Arrow() {

	function handleMouseOver() {
		console.log("Mouseover")
	}

	return (
		<svg 
			width="625" 
			height="147" 
			viewBox="0 0 625 147" 
			fill="none" 
			xmlns="http://www.w3.org/2000/svg"
			onMouseOver={handleMouseOver}
		>
			<path 
				d="M1.5 142L623.5 5" 
				stroke="blue" 
				strokeWidth="10" 
				pointerEvents="visible"
			/>
		</svg>
	)
}

export default Arrow