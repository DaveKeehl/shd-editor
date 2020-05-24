import React, {useState, useContext, useEffect} from "react"
import {StateContext} from "../../contexts/stateContext"
import {ArrowsContext} from "../../contexts/arrowsContext"
import {ResizableStackContext} from "../../contexts/resizableStackContext"
import {utils} from "../../utils"

function ArrowStart(props) {
	const app = useContext(StateContext)
	const arrows = useContext(ArrowsContext)
	const {stackWidth} = useContext(ResizableStackContext)

	const [arrow, setArrow] = useState(null)

	useEffect(() => {
		const result = arrows.arrows.find(arrow => arrow.from.id === props.variableID)
		if (result !== undefined) {
			setArrow(result)
		} else {
			setArrow(null)
		}
	}, [arrows.arrows])

	function handleMouseDown(event) {
		if (arrow === null) {
			arrows.resetNewArrow()
			arrows.setIsArrowDragged(true)
			arrows.setFrom({
				region: props.region, 
				parentId: props.parentID, 
				id: props.variableID
			})
			// SET START COORDINATES OF NEW ARROW
			if (props.region === "heap") {
				// HEAP
				const target = utils.functions.getHoveredHeapObject(app.diagram.heap, event.clientX, event.clientY, stackWidth)
				arrows.setExactHeapStartPosition(stackWidth, target, event.clientY)
			} else {
				// STACK
				arrows.setExactStackStartPosition(app.diagram.stack, stackWidth, event.clientY)
				// utils.functions.getHoveredStackData(app.diagram.stack, stackWidth, arrows.stackScrollAmount, event.clientY)
			}
		}
	}

	function handleMouseUp() {
		if (arrow === null) {
			arrows.setIsArrowDragged(false)
			const {X,Y} = arrows.newArrow.coordinates.start
			arrows.setEnd({
				X: X, 
				Y: Y
			})
		}
	}

	return (
		<svg 
			viewBox="0 0 19 18" 
			fill="none" 
			xmlns="http://www.w3.org/2000/svg"
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
		>
			<circle 
				className="outer" 
				style={{opacity: `${arrow === null ? "1" : "0.2"}`}}
				cx="9.5" 
				cy="9" 
				r="8" 
				strokeWidth="2"
			/>
			<circle className="inner" cx="9.5" cy="9" r="4"/>
		</svg>
	)
}

export default ArrowStart