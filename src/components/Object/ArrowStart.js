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
		console.log("creating new arrow...")
		arrows.startDraggingArrow(app.diagram, stackWidth, event, {
			region: props.region,
			id: props.variableID,
			parentId: props.parentID
		})
	}

	function handleMouseUp() {
		arrows.setIsArrowDragged(false)
		const {X,Y} = arrows.newArrow.coordinates.start
		arrows.setEnd({
			X: X, 
			Y: Y
		})
		if (arrow === null) {
		}
	}

	return (
		<svg 
			viewBox="0 0 19 18" 
			fill="none" 
			xmlns="http://www.w3.org/2000/svg"
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			style={{cursor: `${arrow === null ? "pointer" : "default"}`}}
		>
			<circle 
				className="outer" 
				style={{opacity: `${arrow === null ? "1" : "0.1"}`}}
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