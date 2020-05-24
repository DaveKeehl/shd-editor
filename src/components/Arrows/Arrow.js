import React, {useState, useEffect, useContext} from "react"
import {StateContext} from "../../contexts/stateContext"
import {ArrowsContext} from "../../contexts/arrowsContext"
import {utils} from "../../utils"

function Arrow(props) {
	const [width, setWidth] = useState(window.screen.width)
	const [height, setHeight] = useState(window.screen.height)
	const [isSelected, setIsSelected] = useState(false)

	const app = useContext(StateContext)
	const arrows = useContext(ArrowsContext)

	useEffect(() => {}, [getDrawableArrows(arrows.arrows)])

	function getDrawableArrows(arrows) {
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

	function handleMouseOver() {
		// console.log("Mouseover")
	}

	function handleClickOnStartHandle() {
		console.log("Start")
	}

	function handleClickOnEndHandle() {
		console.log("End")
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
		<div onKeyDown={handleKeyDown} tabIndex="-1" >
			<svg 
				viewBox={`0 0 ${width} ${height}`}
				className={props.data.from.region === "stack" ? "arrow__stack" : "arrow__heap"}
				style={{zIndex: `${props.data.zIndex+1}`}}
				width={width} 
				height={height}
				onClick={handleClick}
				onMouseOver={handleMouseOver}
				xmlns="http://www.w3.org/2000/svg"
			>
				<path 
					d={`
						M ${start.X} ${start.Y}
						L ${end.X} ${end.Y}
					`} 
					className={`${isSelected ? "arrow--selected" : ""}`}
					pointerEvents="visible"
				/>
				<circle cx={start.X} cy={start.Y} onClick={handleClickOnStartHandle} />
				<circle cx={end.X} cy={end.Y} onClick={handleClickOnEndHandle} />
			</svg>
		</div>
	)
}

export default Arrow