import React, {useContext} from "react"
import {StateContext} from "../../contexts/stateContext"
import {ArrowsContext} from "../../contexts/arrowsContext"
import {ResizableStackContext} from "../../contexts/resizableStackContext"

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
		// SET START+END COORDINATES AT THE BEGINNING
		if (props.region === "heap") {
			// HEAP
			const target = app.getHoveredHeapObject(event.clientX, event.clientY, stackWidth)
			arrows.setExactHeapStartPosition(stackWidth, target, event.clientY)
		} else {
			// STACK
			arrows.setExactStackStartPosition(app.diagram.stack, stackWidth, event.clientY)
			app.getHoveredStackData(arrows.stackScrollAmount, event.clientY)
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