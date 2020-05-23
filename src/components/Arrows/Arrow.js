import React, {useState, useEffect, useContext} from "react"
import {ArrowsContext} from "../../contexts/arrowsContext"

function Arrow(props) {
	const [width, setWidth] = useState(window.screen.width)
	const [height, setHeight] = useState(window.screen.height)

	const arrows = useContext(ArrowsContext)

	useEffect(() => {}, [getDrawableArrows(arrows.arrows)])

	function getDrawableArrows(arrows) {
		arrows.find(arrow => arrow.from.id === props.data.from.id && arrow.to === props.data.to)
	}

	function handleMouseOver() {
		// console.log("Mouseover")
	}

	const start = {
		X: props.data.coordinates.start.X,
		Y: props.data.coordinates.start.Y
	}

	const end = {
		X: props.data.coordinates.end.X,
		Y: props.data.coordinates.end.Y
	}

	return (
		<svg 
			width={width} 
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			fill="none" 
			xmlns="http://www.w3.org/2000/svg"
			onMouseOver={handleMouseOver}
			style={{zIndex: `${props.data.zIndex+1}`}}
			className={props.data.from.region === "stack" ? "arrows__stack" : "arrows__heap"}
		>
			<path 
				d={`
					M ${start.X} ${start.Y}
					L ${end.X} ${end.Y}
				`} 
				pointerEvents="visible"
			/>
			<circle cx={start.X} cy={start.Y} r="4" />
			<circle cx={end.X} cy={end.Y} r="4" />
		</svg>
	)
}

export default Arrow