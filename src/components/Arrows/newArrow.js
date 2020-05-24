import React, {useState, useContext} from "react"
import {ArrowsContext} from "../../contexts/arrowsContext"

function NewArrow() {
	const [width, setWidth] = useState(window.screen.width)
	const [height, setHeight] = useState(window.screen.height)

	const {isArrowDragged, newArrow} = useContext(ArrowsContext)

	const start = {
		X: newArrow.coordinates.start.X === "" ? 0 : newArrow.coordinates.start.X,
		Y: newArrow.coordinates.start.Y === "" ? 0 : newArrow.coordinates.start.Y
	}

	const end = {
		X: newArrow.coordinates.end.X === "" ? 0 : newArrow.coordinates.end.X,
		Y: newArrow.coordinates.end.Y === "" ? 0 : newArrow.coordinates.end.Y
	}

	return (
		<svg 
			className={`arrows__new ${newArrow.from.region === "stack" ? "arrow__stack" : "arrow__heap"}`}
			style={{display: `${!isArrowDragged ? "none" : ""}`}}
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
				pointerEvents="visible"
				style={isArrowDragged ? {cursor: "pointer"} : null}
			/>
			<circle 
				cx={start.X} 
				cy={start.Y} 
				// pointerEvents="visible" 
				// onClick={handleClickOnStartHandle}
			/>
			<circle 
				cx={end.X} 
				cy={end.Y} 
				// pointerEvents="visible" 
				// onClick={handleClickOnEndHandle} 
			/>
		</svg>
	)
}

export default NewArrow