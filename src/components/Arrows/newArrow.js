import React, {useState, useRef, useEffect, useContext} from "react"
import {ArrowsContext} from "../../contexts/arrowsContext"

function NewArrow() {
	const [width, setWidth] = useState(window.screen.width)
	const [height, setHeight] = useState(window.screen.height)

	const lineRef = useRef(null)

	const {activeDragHandle, isArrowDragged, isArrowHeadVisible, newArrow, arrows} = useContext(ArrowsContext)

	const start = {
		X: newArrow.coordinates.start.X === "" ? 0 : newArrow.coordinates.start.X,
		Y: newArrow.coordinates.start.Y === "" ? 0 : newArrow.coordinates.start.Y
	}

	const end = {
		X: newArrow.coordinates.end.X === "" ? 0 : newArrow.coordinates.end.X,
		Y: newArrow.coordinates.end.Y === "" ? 0 : newArrow.coordinates.end.Y
	}

	const match = arrows.find(arrow => arrow.from.id === newArrow.from.id && arrow.to === newArrow.to)

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
			<defs>
				<marker 
					id="new_arrow" 
					viewBox="0 0 10 10" 
					refX="8" 
					refY="5" 
					markerWidth="6" 
					markerHeight="6" 
					orient="auto-start-reverse"
				>
					<path
						d="M 0 0 L 10 5 L 0 10 z" 
						style={{
							transition: `${isArrowHeadVisible ? "opacity .3s" : "none"}`, 
							opacity: `${isArrowHeadVisible || activeDragHandle !== "" ? "1" : "0"}`
						}} 
					/>
				</marker>
			</defs>
			<path 
				d={`
					M ${start.X} ${start.Y}
					L ${end.X} ${end.Y}
				`} 
				className={`${
					match === undefined ?
					"" :
					match.isSelected ?
						"arrow--selected" :
						""
				}`}
				style={isArrowDragged ? {cursor: "pointer"} : null}
				ref={lineRef}
				markerEnd="url(#new_arrow)"
			/>
			<circle cx={start.X} cy={start.Y} style={{opacity: `${activeDragHandle === "start"? "1" : "0"}`}} />
			<circle cx={end.X} cy={end.Y}  style={{opacity: `${activeDragHandle === "end"? "1" : "0"}`}} />
		</svg>
	)
}

export default NewArrow