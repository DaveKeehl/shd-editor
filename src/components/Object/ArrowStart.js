import React, {useContext} from "react"
import {StateContext} from "../../contexts/stateContext"
import {ArrowsContext} from "../../contexts/arrowsContext"
import {ResizableStackContext} from "../../contexts/resizableStackContext"

function ArrowStart(props) {
	const app = useContext(StateContext)
	const {setCaller, setIsArrowDragged, start, setStart, setEnd} = useContext(ArrowsContext)
	const {stackWidth} = useContext(ResizableStackContext)

	function handleMouseDown(event) {
		setIsArrowDragged(true)
		setCaller({region: props.region, parentId: props.parentID, id: props.variableID})
		const parentID = app.getParent(props.variableID).id
		const varWidth = stackWidth - 40 - 40 - 20
		const inputWidth = (varWidth - 40 - 10)/2
		setStart({
			X: stackWidth - 70 - inputWidth/2, 
			Y: event.clientY
		})
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