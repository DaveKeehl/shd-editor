import React, { useState } from "react"
import Header from "../Header"
import Object from "../Object"

function Stack() {
	const [count, setCount] = useState(0)
	const [objects, setObjects] = useState([])

	const addBlock = () => {
		const newBlock = <Object 
							key={count} 
							id={count} 
							region="stack"
							removeBlock={removeBlock} 
						/>
		setTotalObjectsCreated(prevCount => prevCount+1)
		setObjects(prevObjects => [newBlock, ...prevObjects])
	}

	const removeBlock = (id) => {
		setObjects(prevObjects => prevObjects.filter(object => id !== object.props.id))
	}

	return (
		<div className="stack">
			<Header 
				region="stack" 
				objectsCount={objects.length} 
				addBlock={addBlock}
			/>
			<div className="stack__objects">
				{objects}
			</div>
		</div>
	)
}

export default Stack