import React, {useContext} from "react"
import {StateContext} from "../../contexts/stateContext"
import {ArrowsContext} from "../../contexts/arrowsContext"
import {ResizableStackContext} from "../../contexts/resizableStackContext"

function ArrowStart(props) {
	const app = useContext(StateContext)
	const {stackScrollAmount, setCaller, setIsArrowDragged, start, setStart, setEnd} = useContext(ArrowsContext)
	const {stackWidth} = useContext(ResizableStackContext)

	function handleMouseDown(event) {
		setIsArrowDragged(true)
		setCaller({region: props.region, parentId: props.parentID, id: props.variableID})
		// const parentID = app.getParent(props.variableID).id

		const varWidth = stackWidth - 40 - 40 - 20
		const inputWidth = (varWidth - 40 - 10)/2

		const virtualY = stackScrollAmount + event.clientY - 55
		let accumulator = 20

		for (const frame of app.diagram.stack) {
			let startY = accumulator
			let endY = (
				startY + 
				126 + 
				frame.variables.length * 103 + 
				(frame.variables.length > 0 ? 31 : 0) + 
				(frame.variables.length > 1 ? 15 * (frame.variables.length-1) : 0)
			)
			console.log(`startY: ${startY}, endY: ${endY}, virtualY: ${virtualY}`)
			if (virtualY >= startY && virtualY <= endY) {
				console.log(frame.id)
				break
				// return true
			} else {
				accumulator = (endY + 10)
			}
		}
		// console.log(virtualY)
		setStart({
			X: stackWidth - 70 - inputWidth/2, 
			Y: event.clientY
		})
		// console.log(stackScrollAmount)
	}

	function handleMouseUp(event) {
		setIsArrowDragged(false)
		setEnd({X: start.X, Y: start.Y})
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