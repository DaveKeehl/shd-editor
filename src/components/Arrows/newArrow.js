import React, {useState, useEffect, useContext} from "react"
import {StateContext} from "../../contexts/stateContext"
import {ArrowsContext} from "../../contexts/arrowsContext"
import {ResizableStackContext} from "../../contexts/resizableStackContext"

function NewArrow() {
	const [width, setWidth] = useState(window.innerWidth)
	const [height, setHeight] = useState(window.innerHeight)
	const [angle, setAngle] = useState(0)

	const app = useContext(StateContext)
	const {stackWidth} = useContext(ResizableStackContext)
	const {isArrowDragged, newArrow, arrows, storeNewArrow, resetNewArrow, rebuildArrows} = useContext(ArrowsContext)

	// useEffect(() => {
	// 	computeArrowAngle()
	// }, [newArrow])
	
	// Populate arrows array when new one is created
	useEffect(() => {
		if (!isArrowDragged && newArrow.to !== "") {
			// if (arrows.length === 0) {
			// 	storeNewArrow()
			// 	resetNewArrow()
			// } 
			// else {
			// 	const updated = [...arrows, newArrow]
			// 	let found = false
			// 	for (const arrow of arrows) {
			// 		const last = updated.length-1
			// 		if (arrow.from.id === updated[last].from.id && arrow.to === updated[last].to) {
			// 			found = true
			// 			// console.log(`there's already an arrow starting from key=${newArrow.from.id} and ending in key=${newArrow.to}`)
			// 			break
			// 		}
			// 	}
			// 	if (!found) {
			// 		// console.log("new arrow to be stored")
			// 		storeNewArrow()
			// 		resetNewArrow()
			// 	}
			// }
			// rebuildArrows(app.diagram, stackWidth)
		}
	}, [isArrowDragged])

	const start = {
		X: newArrow.coordinates.start.X === "" ? 0 : newArrow.coordinates.start.X,
		Y: newArrow.coordinates.start.Y === "" ? 0 : newArrow.coordinates.start.Y
	}

	const end = {
		X: newArrow.coordinates.end.X === "" ? 0 : newArrow.coordinates.end.X,
		Y: newArrow.coordinates.end.Y === "" ? 0 : newArrow.coordinates.end.Y
	}

	function computeArrowAngle() {
		const width = Math.abs(end.X - start.X)
		// setWidth(width)
		const height = Math.abs(end.Y - start.Y)
		// setHeight(height)
		let angle = Math.atan(width/height) * 180 / Math.PI
		if (end.X < start.X) {
			angle = Math.atan(width/height) * 180 / Math.PI
		} else {
			angle = -Math.atan(width/height) * 180 / Math.PI
		}
		setAngle(angle)
		console.log("start")
		console.log(start)
		console.log("end")
		console.log(end)
		console.log(`width: ${width}, height: ${height}, angle: ${angle}`)
		return angle
	}

	const arrowTip = {
		size: 30
	}

	return (
		<svg 
			className="newArrow"
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
				stroke="black" 
				strokeWidth="2" 
				pointerEvents="visible"
			/>
			{/* <rect style={{transform: `rotate(${angle}deg)`}} x={end.X - arrowTip.size/2} y={end.Y - arrowTip.size/2} width="30" height="30" fill="rgba(0,0,0,0.5)"/> */}
		</svg>
	)
}

export default NewArrow