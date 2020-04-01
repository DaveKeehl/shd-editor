import React, { useState, useEffect } from "react"
import Header from "../Header"
import Object from "../Object"

function Region(props) {
	const [name, setName] = useState("")
	const [count, setCount] = useState(0)
	const [objects, setObjects] = useState([])

	useEffect(() => setName(props.name), [])

	function addBlock() {
		const newBlock = <Object 
							key={count} 
							id={count} 
							region={name}
							removeBlock={removeBlock} 
						/>
		setCount(prevCount => prevCount+1)
		setObjects(prevObjects => [newBlock, ...prevObjects])
	}

	function removeBlock(id) {
		setObjects(prevObjects => prevObjects.filter(object => id !== object.props.id))
	}

	const message = <p>Click on the "+" button to create a {name === "stack" ? <em>Stack Frame</em> : "Object"}<em>Stack Frame</em>.</p>

	return (
		<div className={name}>
			<Header 
				region={name} 
				objectsCount={objects.length} 
				addBlock={addBlock}
			/>
			<div className={`${name}__objects`}>
				{objects.length === 0 ? message : objects}
			</div>
		</div>
	)
}

export default Region