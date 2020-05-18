import React, {useState, useContext, useRef, useEffect} from "react"
import Header from "../Header"
import StackFrame from "./StackFrame"
import {StateContext} from "../../contexts/stateContext"
import {ArrowsContext} from "../../contexts/arrowsContext"
import {ResizableStackContext} from "../../contexts/resizableStackContext"
import {utils} from "../../utils"

function Stack() {
	const [objects, setObjects] = useState([])

	const stackFramesRef = useRef(null)

	const {FRAME_MIN_HEIGHT, BLOCK_MARGIN_BOTTOM} = utils.constants

	const app = useContext(StateContext)
	const arrows = useContext(ArrowsContext)
	const {stackWidth} = useContext(ResizableStackContext)

	function addBlock() {
		const newBlock = (
			<StackFrame 
				key={app.count} 
				id={app.count} 
				removeBlock={removeBlock}
			/>	
		)
		setObjects(prevObjects => [newBlock, ...prevObjects])
		app.addStackFrame()

		arrows.updateArrowsOnNewStackFrame(app.diagram.heap, stackWidth)
	}

	function removeBlock(id) {
		setObjects(prevObjects => prevObjects.filter(object => id !== object.props.id))
		app.removeStackFrame(id)
	}

	function handleScroll() {
		arrows.updateArrowsOnStackScroll(stackFramesRef.current.scrollTop, app.diagram.heap, stackWidth)
	}

	return (
		<div className="stack">
			<Header 
				region="stack" 
				objectsCount={objects.length} 
				addBlock={addBlock}
			/>
			<div className="stack__objects objects" onScroll={handleScroll} ref={stackFramesRef}>
				{objects.length === 0 ? <p>Click on the "+" button to create a Stack Frame.</p> : objects}
			</div>
		</div>
	)
}

export default Stack