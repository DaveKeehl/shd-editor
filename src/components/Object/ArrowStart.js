import React, {useContext} from "react"
import {StateContext} from "../../contexts/stateContext"
import {ArrowsContext} from "../../contexts/arrowsContext"
import {ResizableStackContext} from "../../contexts/resizableStackContext"

function ArrowStart(props) {
	const app = useContext(StateContext)
	const arrows = useContext(ArrowsContext)
	const {stackWidth} = useContext(ResizableStackContext)

	function handleMouseDown(event) {
		arrows.setIsArrowDragged(true)
		arrows.setFrom({
			region: props.region, 
			parentId: props.parentID, 
			id: props.variableID
		})

		// UPDATE START COORDINATES

		const varWidth = stackWidth - 40 - 40 - 20
		const inputWidth = (varWidth - 40 - 10) / 2
		const inputHeight = 31

		if (props.region === "heap") {
			console.log("start region: heap")

			const to = app.getHoveredHeapObject(event.clientX, event.clientY, stackWidth)
			const startX = stackWidth + 30 + to.position.X
			const startY = 55 + 20 + to.position.Y

			console.log(to)
			console.log(`startX: ${startX}, startY: ${startY}`)

			let accumulator = 101

			for (const variable of to.variables) {

				const varStartY = startY + accumulator
				const varEndY = varStartY + 103

				console.log(`varStartY: ${varStartY}, varEndY: ${varEndY}`)

				if (event.clientY >= varStartY && event.clientY <= varEndY) {
					console.log("found correct variable")

					const arrowStart = {
						X: startX + 320 - 50 - inputWidth/2,
						Y: varEndY - 18 - inputHeight/2
					}
					arrows.setStart({
						X: arrowStart.X, 
						Y: arrowStart.Y
					})
					arrows.setEnd({
						X: arrowStart.X, 
						Y: arrowStart.Y
					})

					break

				} else {
					accumulator = accumulator + 103 + 15
				}

			}

		} else {
			console.log("start region: stack")
	
			const virtualY = arrows.stackScrollAmount + event.clientY - 55
			let accumulator = 20
	
			for (const frame of app.diagram.stack) {
	
				// Break, if the mouse is not over a frame in the stack
				if (event.clientX > 360) {
					break
				}
	
				let startY = accumulator
				let endY = (
					startY + 
					126 + 
					frame.variables.length * 103 + 
					(frame.variables.length > 0 ? 31 : 0) + 
					(frame.variables.length > 1 ? 15 * (frame.variables.length-1) : 0)
				)
	
				// console.log(`startY: ${startY}, endY: ${endY}, virtualY: ${virtualY}`)
	
				if (virtualY >= startY && virtualY <= endY) {
	
					// console.log(frame.id)
	
					let varAccumulator = startY + 20 + 39 + 15
	
					// 1. Find closest variable
					for (const variable of frame.variables) {
	
						let varStartY = varAccumulator
						let varEndY = varStartY + 103
	
						// console.log(`varStartY: ${varStartY}, varEndY: ${varEndY}, virtualY: ${virtualY}`)
	
						if (virtualY >= varStartY && virtualY <= varEndY) {
	
							// console.log(variable.id)
	
							const arrowStart = {
								X: stackWidth - 70 - inputWidth/2,
								Y: varStartY + 18 + 31 + 5 + inputHeight/2 - arrows.stackScrollAmount + 55
							}

							// 2. Set start arrow position
							arrows.setStart({
								X: arrowStart.X, 
								Y: arrowStart.Y
							})
							arrows.setEnd({
								X: arrowStart.X, 
								Y: arrowStart.Y
							})
	
							break
	
						} else {
							varAccumulator = (varEndY + 15)
						}
					}
	
					break
					
				} else {
					accumulator = (endY + 10)
				}
			}
		}

	}

	function handleMouseUp(event) {
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