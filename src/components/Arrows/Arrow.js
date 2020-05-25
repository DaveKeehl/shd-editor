import React, {useState, useEffect, useContext} from "react"
import {StateContext} from "../../contexts/stateContext"
import {ArrowsContext} from "../../contexts/arrowsContext"
import {ResizableStackContext} from "../../contexts/resizableStackContext"
import {utils} from "../../utils"

function Arrow(props) {
	const [width, setWidth] = useState(window.screen.width)
	const [height, setHeight] = useState(window.screen.height)
	const [isSelected, setIsSelected] = useState(false)

	const app = useContext(StateContext)
	const arrows = useContext(ArrowsContext)
	const {stackWidth} = useContext(ResizableStackContext)

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

	function handleKeyDown(event) {
		if (isSelected && (event.keyCode === 8 || event.keyCode === 46)) {
			arrows.setArrows(prevArrows => prevArrows.filter(arrow => {
				return arrow.from.id !== props.data.from.id || arrow.to !== props.data.to
			}))
			app.resetVariablesValueAfterArrowDeletion(props.data.from.id)
		}
	}

	function handleClick() {
		console.log("arrow is clicked")
		setIsSelected(prevState => !prevState)
	}

	function handleClickOnStartHandle() {
		console.log("Click @start")
		setIsSelected(prevState => !prevState)
	}
	
	function handleMouseDownOnStartHandle() {
		console.log("Mouse down @start")
		arrows.rebaseNewArrow(props.data, "start")
		if (props.data.coordinates.start.Y === arrows.newArrow.coordinates.start.Y) {
			setIsSelected(prevState => !prevState)
		}
	}

	function handleClickOnEndHandle() {
		console.log("Click @end")
		setIsSelected(prevState => !prevState)
	}

	function handleMouseDownOnEndHandle() {
		console.log("Mouse down @end")
		arrows.rebaseNewArrow(props.data, "end")

		// MUST HANDLE BOTH LOOP AND NOT
		const {start, end} = props.data.coordinates
		const intersection = arrows.recomputeIntersection(
			{ X: start.X, Y: start.Y },
			props.data.to, 
			app.diagram.heap, 
			stackWidth
		)
		// console.log(intersection)
		if (intersection.X === end.X && intersection.Y === end.Y) {
			setIsSelected(prevState => !prevState)
		}

		// console.log(props.data.coordinates.start)
		// console.log(arrows.newArrow.coordinates.end)
	}

	return (
		<div 
			className="arrow" 
			onKeyDown={handleKeyDown} 
			tabIndex="-1" 
		>
			<svg 
				viewBox={`0 0 ${width} ${height}`}
				className={props.data.from.region === "stack" ? "arrow__stack" : "arrow__heap"}
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
					className={`${isSelected ? "arrow--selected" : ""}`}
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
		</div>
	)
}

export default Arrow