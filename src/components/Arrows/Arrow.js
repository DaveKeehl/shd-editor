import React, {useState, useEffect, useContext} from "react"
import {StateContext} from "../../contexts/stateContext"
import {ArrowsContext} from "../../contexts/arrowsContext"
import {ResizableStackContext} from "../../contexts/resizableStackContext"
import {utils} from "../../utils"

function Arrow(props) {
	const app = useContext(StateContext)
	const arrows = useContext(ArrowsContext)
	const {stackWidth} = useContext(ResizableStackContext)

	const [width, setWidth] = useState(window.screen.width)
	const [height, setHeight] = useState(window.screen.height)

	const start = {
		X: props.data.coordinates.start.X,
		Y: props.data.coordinates.start.Y
	}

	const end = {
		X: props.data.coordinates.end.X,
		Y: props.data.coordinates.end.Y
	}

	useEffect(() => {}, [getDrawableArrow(arrows.arrows)])

	function getDrawableArrow(arrows) {
		arrows.find(arrow => arrow.from.id === props.data.from.id && arrow.to === props.data.to)
	}

	function handleClick() {
		console.log("arrow is clicked")
		arrows.toggleIsSelected(props.data.from.id, props.data.to)
	}

	function handleClickOnStartHandle() {
		console.log("Click @start")
		arrows.toggleIsSelected(props.data.from.id, props.data.to)
	}
	
	function handleMouseDownOnStartHandle() {
		console.log("Mouse down @start")
		arrows.rebaseNewArrow(props.data, "start")
		if (props.data.coordinates.start.Y === arrows.newArrow.coordinates.start.Y) {
			arrows.toggleIsSelected(props.data.from.id, props.data.to)
		}
	}

	function handleClickOnEndHandle() {
		console.log("Click @end")
		arrows.toggleIsSelected(props.data.from.id, props.data.to)
	}

	function handleMouseDownOnEndHandle() {
		console.log("Mouse down @end")
		arrows.rebaseNewArrow(props.data, "end")

		const {start, end} = props.data.coordinates
		const intersection = arrows.recomputeIntersection(
			{ X: start.X, Y: start.Y },
			props.data.to, 
			app.diagram.heap, 
			stackWidth
		)
		if (intersection.X === end.X && intersection.Y === end.Y) {
			arrows.toggleIsSelected(props.data.from.id, props.data.to)
		}
	}

	return (
		<svg 
			viewBox={`0 0 ${width} ${height}`}
			className={`arrow ${props.data.from.region === "stack" ? "arrow__stack" : "arrow__heap"}`}
			style={{
				display: `${props.data.dragged ? "none" : "block"}`,
				zIndex: `${props.data.zIndex+1}`
			}}
			width={width} 
			height={height}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path 
				d={`
					M ${start.X} ${start.Y}
					L ${end.X} ${end.Y}
				`} 
				className={`${props.data.isSelected ? "arrow--selected" : ""}`}
				pointerEvents="visible"
				onClick={handleClick}
			/>
			<circle 
				cx={start.X} 
				cy={start.Y} 
				pointerEvents="visible" 
				onClick={handleClickOnStartHandle}
				onMouseDown={handleMouseDownOnStartHandle}
			/>
			<circle 
				cx={end.X} 
				cy={end.Y} 
				pointerEvents="visible" 
				onClick={handleClickOnEndHandle}
				onMouseDown={handleMouseDownOnEndHandle}
			/>
		</svg>
	)
}

export default Arrow