import React, {useState, useEffect, useContext} from "react"
import {ArrowsContext} from "../../contexts/arrowsContext"

function NewArrow() {
	const [width, setWidth] = useState(window.screen.width)
	const [height, setHeight] = useState(window.screen.height)

	const {isArrowDragged, newArrow, arrows, storeNewArrow, resetNewArrow} = useContext(ArrowsContext)

	// Populate arrows array when new one is created
	useEffect(() => {
		if (!isArrowDragged && newArrow.to !== "") {
			// console.log("new arrow is released")
			if (arrows.length === 0) {
				// console.log("first arrow")
				storeNewArrow()
				resetNewArrow()
			} 
			else {
				const updated = [...arrows, newArrow]
				// console.log(updated)
				let found = false
				for (const arrow of arrows) {
					const last = updated.length-1
					if (arrow.from.id === updated[last].from.id && arrow.to === updated[last].to) {
						found = true
						// console.log(`there's already an arrow starting from key=${newArrow.from.id} and ending in key=${newArrow.to}`)
						break
					}
				}
				if (!found) {
					// console.log("new arrow here")
					storeNewArrow()
					resetNewArrow()
				}
			}
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
		</svg>
	)
}

export default NewArrow