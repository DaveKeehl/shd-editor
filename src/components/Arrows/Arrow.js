import React, {useState, useEffect, useContext} from "react"
import {StateContext} from "../../contexts/stateContext"
import {ArrowsContext} from "../../contexts/arrowsContext"
import {ResizableStackContext} from "../../contexts/resizableStackContext"

function Arrow(props) {
	const [width, setWidth] = useState(window.innerWidth)
	const [height, setHeight] = useState(window.innerHeight)

	const app = useContext(StateContext)
	const arrows = useContext(ArrowsContext)
	const {stackWidth} = useContext(ResizableStackContext)

	useEffect(
		() => {
			return (
				arrows.rebuildArrows(app.diagram, stackWidth)
			)
		}, 
		[]
	)

	// function getDrawableArrows(arrows) {
	// 	arrows.filter(arrow => arrow.from.id === props.data.from.id && arrow.to === props.data.to)
	// }

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