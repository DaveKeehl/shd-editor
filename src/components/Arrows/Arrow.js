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
	const [isSelected, setIsSelected] = useState(() => (
		checkIsArrowSelected() === undefined ? false : true
	))

	const start = {
		X: props.coordinates.start.X,
		Y: props.coordinates.start.Y
	}

	const end = {
		X: props.coordinates.end.X,
		Y: props.coordinates.end.Y
	}

	useEffect(() => {}, [getDrawableArrow(arrows.arrows)])

	useEffect(() => {
		setIsSelected(checkIsArrowSelected() === undefined ? false : true)
	}, [arrows.selectedArrows])

	function checkIsArrowSelected() {
		const match = arrows.selectedArrows.find(arrow => (
			arrow.from.id === props.from.id && arrow.to === props.to
		))
		return match
	}

	function getDrawableArrow(arrows) {
		arrows.find(arrow => arrow.from.id === props.from.id && arrow.to === props.to)
	}

	function handleClick() {
		// console.log("arrow is clicked")
		arrows.toggleSelectedArrow(props)
	}

	// function handleClickOnStartHandle() {
	// 	console.log("Click @start")
	// 	arrows.toggleIsSelected(props.from.id, props.to)
	// }
	
	function handleMouseDownOnStartHandle() {
		// console.log("Mouse down @start")
		arrows.rebaseNewArrow(props, "start")
	}

	// function handleClickOnEndHandle() {
	// 	console.log("Click @end")
	// 	arrows.toggleIsSelected(props.from.id, props.to)
	// }

	function handleMouseDownOnEndHandle() {
		// console.log("Mouse down @end")
		arrows.rebaseNewArrow(props, "end")

		const {start, end} = props.coordinates
		const intersection = arrows.recomputeIntersection(
			{ X: start.X, Y: start.Y },
			props.to, 
			app.diagram.heap, 
			stackWidth
		)
		// if (intersection.X === end.X && intersection.Y === end.Y) {
		// 	arrows.toggleIsSelected(props.from.id, props.to)
		// }
	}

	return (
		<svg 
			viewBox={`0 0 ${width} ${height}`}
			className={`arrow ${props.from.region === "stack" ? "arrow__stack" : "arrow__heap"}`}
			style={{
				display: `${props.isDragged ? "none" : "block"}`,
				zIndex: `${props.zIndex+1}`
			}}
			width={width} 
			height={height}
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<marker 
					id={`arrow${props.from.id}${props.to}`} 
					viewBox="0 0 10 10" 
					refX="8" 
					refY="5" 
					markerWidth="6" 
					markerHeight="6" 
					orient="auto-start-reverse"
				>
					<path 
						d="M 0 0 L 10 5 L 0 10 z"
						className={`arrow__head ${isSelected ? "arrow--selected" : ""}`}
					/>
				</marker>
			</defs>
			<path 
				d={`
					M ${start.X} ${start.Y}
					L ${end.X} ${end.Y}
				`} 
				className={`${isSelected ? "arrow--selected" : ""}`}
				pointerEvents="visible"
				onClick={handleClick}
				markerEnd={`url(#arrow${props.from.id}${props.to})`}
			/>
			<circle 
				cx={start.X} 
				cy={start.Y} 
				pointerEvents="visible" 
				// onClick={handleClickOnStartHandle}
				onMouseDown={handleMouseDownOnStartHandle}
			/>
			<circle 
				cx={end.X} 
				cy={end.Y} 
				pointerEvents="visible" 
				// onClick={handleClickOnEndHandle}
				onMouseDown={handleMouseDownOnEndHandle}
			/>
		</svg>
	)
}

export default Arrow