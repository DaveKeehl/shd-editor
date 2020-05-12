import React, {useState, useEffect, useContext} from "react"
import {ArrowsContext} from "../../contexts/arrowsContext"

function NewArrow() {
	const [width, setWidth] = useState(window.innerWidth)
	const [height, setHeight] = useState(window.innerHeight)

	const arrows = useContext(ArrowsContext)

	useEffect(() => {}, [arrows.newArrow])

	const start = {
		X: arrows.newArrow.coordinates.start.X === "" ? 0 : arrows.newArrow.coordinates.start.X,
		Y: arrows.newArrow.coordinates.start.Y === "" ? 0 : arrows.newArrow.coordinates.start.Y
	}

	const end = {
		X: arrows.newArrow.coordinates.end.X === "" ? 0 : arrows.newArrow.coordinates.end.X,
		Y: arrows.newArrow.coordinates.end.Y === "" ? 0 : arrows.newArrow.coordinates.end.Y
	}

	return (
		<svg 
			className="newArrow"
			style={{display: `${!arrows.isArrowDragged ? "none" : ""}`}}
			width={width} 
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			fill="none" 
			xmlns="http://www.w3.org/2000/svg"
		>
			<path 
				d={`
					M ${start.X} ${start.Y}
					L ${end.X} ${end.Y}
				`} 
				stroke="black" 
				strokeWidth="2" 
				pointerEvents="visible"
			/>
		</svg>
	)
}

export default NewArrow