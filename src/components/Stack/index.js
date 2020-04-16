import React, {useState} from "react"
import Header from "../Header"
import StackFrame from "./StackFrame"

function Stack(props) {
	const [count, setCount] = useState(0)
	const [objects, setObjects] = useState([])

	function addBlock() {
		const newBlock = (
			<StackFrame 
				key={count} 
				id={count} 
				removeBlock={removeBlock}
			/>	
		)
		setCount(prevCount => prevCount+1)
		setObjects(prevObjects => [newBlock, ...prevObjects])
	}

	function removeBlock(id) {
		setObjects(prevObjects => prevObjects.filter(object => id !== object.props.id))
	}

	return (
		<div className="stack">
			<Header 
				region="stack" 
				objectsCount={objects.length} 
				addBlock={addBlock}
			/>
			<div className="stack__objects objects">
				{objects.length === 0 ? <p>Click on the "+" button to create a Stack Frame.</p> : objects}
			</div>
		</div>
	)
}

export default Stack