import React, {useState, useEffect, useRef} from "react"

function Arrow() {
	const [width, setWidth] = useState(0)
	const [height, setHeight] = useState(0)

	const arrowRef = useRef(null)

	useEffect(() => {
		// console.log(arrowRef)
		// console.log(arrowRef.current.clientWidth)
		setWidth(arrowRef.current.clientWidth)
		setHeight(arrowRef.current.clientHeight)
	})

	function handleMouseOver() {
		console.log("Mouseover")
	}

	return (
		<svg 
			ref={arrowRef}
			width={width} 
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			fill="none" 
			xmlns="http://www.w3.org/2000/svg"
			onMouseOver={handleMouseOver}
		>
			<path 
				d="
					M 1.5 142
					L 623.5 5
				" 
				stroke="blue" 
				strokeWidth="5" 
				pointerEvents="visible"
			/>
		</svg>
	)
}

export default Arrow