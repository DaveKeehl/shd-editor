import React, {useState, useContext, useRef} from "react"
import Header from "../Header"
import StackFrame from "./StackFrame"
import {StateContext} from "../../contexts/stateContext"

function Stack(props) {
	const [objects, setObjects] = useState([])

	const stackFramesRef = useRef(null)

	const app = useContext(StateContext)

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
	}

	function removeBlock(id) {
		setObjects(prevObjects => prevObjects.filter(object => id !== object.props.id))
		app.removeStackFrame(id)
	}

	function handleScroll() {
		console.log(stackFramesRef.current.scrollTop)
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