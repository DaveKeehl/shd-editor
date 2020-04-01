import React, { useState } from "react"
import Header from "../Header"
import Object from "../Object"

function Stack() {
	const [totalObjectsCreated, setTotalObjectsCreated] = useState(0)
	const [objects, setObjects] = useState([])

	const addBlock = () => {
		const newBlock = <Object 
							key={totalObjectsCreated}  
							id={totalObjectsCreated}  
							region="stack"
							removeBlock={removeBlock} 
						/>
		setTotalObjectsCreated(oldCount => oldCount+1)
		setObjects(existingBlocks => [newBlock, ...existingBlocks])
	}

	const removeBlock = (id) => {
		setObjects(objects => objects.filter(object => id !== object.props.id))
	}

	return (
		<div className="stack">
			<Header 
				region="stack" 
				objectsCount={objects.length} 
			/>
			<div className="stack__objects">
				{objects}
			</div>
		</div>
	)
}

export default Stack