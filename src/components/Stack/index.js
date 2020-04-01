import React, { useState } from "react"
import Header from "../Header"
import Object from "../Object"

function Stack() {
	const [count, setCount] = useState(0)
	const [objects, setObjects] = useState([])

	function addBlock() {
		const newBlock = <Object 
							key={count} 
							id={count} 
							region="stack"
							removeBlock={removeBlock} 
						/>
		setCount(prevCount => prevCount+1)
		setObjects(prevObjects => [newBlock, ...prevObjects])
	}

	function removeBlock(id) {
		setObjects(prevObjects => prevObjects.filter(object => id !== object.props.id))
	}

	const emptyStackMessage = <p>Click on the "+" button to create a <em>Stack Frame</em>.</p>

	return (
		<div className="stack">
			<Header 
				region="stack" 
				objectsCount={objects.length} 
				addBlock={addBlock}
			/>
			<div className="stack__objects">
				{objects.length === 0 ? emptyStackMessage : objects}
			</div>
		</div>
	)
}

export default Stack