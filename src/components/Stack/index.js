import React, {useState, useContext, useRef} from "react"
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

		arrows.updateArrows("addStackFrame", {
			heap: app.diagram.heap,
			stackWidth
		})
	}

	function removeBlock(id) {
		// 1. CHECK IF STACK FRAME WITH GIVEN ID HAS ANY ARROWS
		// const toDelete = app.diagram.stack.find(frame => frame.id === id)
		// console.log(app.diagram.stack)


		// const removableArrows = []


		// app.stack.filter(frame => {
		// 	frame.variables.forEach(variable => {
		// 		if (variable.nature === "reference" && variable.value !== "") {
		// 			removableArrows.push({
		// 				from: variable.id,
		// 				to: variable.value
		// 			})
		// 		} 
		// 	})
		// })
		// // 1.1 REMOVE THOSE ARROWS FROM ARROWS LIST
		// if (removableArrows.length > 0) {
			
		// }
		// // 2. GET HEIGHT OF STACK FRAME WITH GIVEN ID
		// // 3. MOVE UPWARDS STACK FRAMES THAT FOLLOW FRAME WITH GIVEN ID


		setObjects(prevObjects => prevObjects.filter(object => id !== object.props.id))
		app.removeStackFrame(id)
	}

	function handleScroll() {
		arrows.updateArrows("stackScroll", {
			newScrollAmount: stackFramesRef.current.scrollTop,
			heap: app.diagram.heap,
			stackWidth
		})
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