import React, {useContext, useEffect} from "react"
import {StateContext} from "../../contexts/stateContext"
import {ArrowsContext} from "../../contexts/arrowsContext"
import {ResizableStackContext} from "../../contexts/resizableStackContext"
import {constants} from "../../utils"

function ArrowStart(props) {
	const app = useContext(StateContext)
	const arrows = useContext(ArrowsContext)
	const {stackWidth} = useContext(ResizableStackContext)

	function handleMouseDown(event) {
		arrows.resetNewArrow()
		arrows.setIsArrowDragged(true)
		arrows.setFrom({
			region: props.region, 
			parentId: props.parentID, 
			id: props.variableID
		})

		// SET START COORDINATES

		
		if (props.region === "heap") {
			
			// HEAP
			
			const target = app.getHoveredHeapObject(event.clientX, event.clientY, stackWidth)
			arrows.setExactHeapStartPosition(stackWidth, target, event.clientY)



			// const inputHeight = 31
			// const inputWidth = 105

			// const target = app.getHoveredHeapObject(event.clientX, event.clientY, stackWidth)
			// const startX = stackWidth + 30 + target.position.X
			// const startY = 55 + 20 + target.position.Y

			// // console.log(target)
			// // console.log(`startX: ${startX}, startY: ${startY}`)

			// let accumulator = 101

			// for (const variable of target.variables) {

			// 	const varStartY = startY + accumulator
			// 	const varEndY = varStartY + 103

			// 	// console.log(`varStartY: ${varStartY}, varEndY: ${varEndY}`)

			// 	if (event.clientY >= varStartY && event.clientY <= varEndY) {
			// 		// console.log("found correct variable")

			// 		const arrowStart = {
			// 			X: startX + 320 - 50 - inputWidth/2,
			// 			Y: varEndY - 18 - inputHeight/2
			// 		}
			// 		arrows.setStart({
			// 			X: arrowStart.X, 
			// 			Y: arrowStart.Y
			// 		})
			// 		arrows.setEnd({
			// 			X: arrowStart.X, 
			// 			Y: arrowStart.Y
			// 		})

			// 		break

			// 	} else {
			// 		accumulator = accumulator + 103 + 15
			// 	}

			// }

		} else {
			// STACK
			arrows.setExactStackStartPosition(app.diagram.stack, stackWidth, event.clientY)
		}

	}

	function handleMouseUp() {
		arrows.setIsArrowDragged(false)
		const {X,Y} = arrows.newArrow.coordinates.start
		arrows.setEnd({
			X: X, 
			Y: Y
		})
	}

	return (
		<svg 
			viewBox="0 0 19 18" 
			fill="none" 
			xmlns="http://www.w3.org/2000/svg"
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
		>
			<circle className="outer" cx="9.5" cy="9" r="8" strokeWidth="2"/>
			<circle className="inner" cx="9.5" cy="9" r="4"/>
		</svg>
	)
}

export default ArrowStart