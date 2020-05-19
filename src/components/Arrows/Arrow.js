import React, {useState, useEffect, useContext} from "react"
import {ArrowsContext} from "../../contexts/arrowsContext"

function Arrow(props) {
	const [width, setWidth] = useState(window.screen.width)
	const [height, setHeight] = useState(window.screen.height)

	const arrows = useContext(ArrowsContext)

	useEffect(
		() => {}, 
		[getDrawableArrows(arrows.arrows)]
	)

	function getDrawableArrows(arrows) {
		arrows.find(arrow => arrow.from.id === props.data.from.id && arrow.to === props.data.to)
	}

	function handleMouseOver() {
		// console.log("Mouseover")
	}

	return (
		<svg 
			width={width} 
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			fill="none" 
			xmlns="http://www.w3.org/2000/svg"
			onMouseOver={handleMouseOver}
			style={{zIndex: `${props.data.zIndex}`}}
		>
			<path 
				d={`
					M ${props.data.coordinates.start.X} ${props.data.coordinates.start.Y}
					L ${props.data.coordinates.end.X} ${props.data.coordinates.end.Y}
				`} 
				stroke="black" 
				strokeWidth="2" 
				pointerEvents="visible"
			/>
		</svg>
	)
}

export default Arrow