import React, {useState, useContext} from "react"
import Header from "../Header"
import HeapObject from "./HeapObject"
import {HeapSmartAddContext} from "../../contexts/heapSmartAddContext"

function Heap(props) {
	const [name, setName] = useState(props.name)
	const [count, setCount] = useState(0)
	const [objects, setObjects] = useState([])

	const {isSmartAddActive, toggleSmartAdd} = useContext(HeapSmartAddContext)

	function removeBlock(id) {
		setObjects(prevObjects => prevObjects.filter(object => id !== object.props.id))
	}

	
	function HeapObjects() {
		const message = <p>Click on the "+" button to freely position an Object on the Heap.</p>
		return (
			<div 
			className="heap__objects objects"
			style={isSmartAddActive ? {cursor: "crosshair"} : null}
			onClick={(event) => {
				if (isSmartAddActive) {
					const {clientX, clientY} = event
					const newBlock = (
						<HeapObject 
							key={count} 
							id={count} 
							mouseTop={clientY}
							mouseLeft={clientX}
							stackWidth={props.stackWidth}
							removeBlock={removeBlock}
						/>	
					)
					setCount(prevCount => prevCount+1)
					setObjects(prevObjects => [newBlock, ...prevObjects])
					toggleSmartAdd()
				}
			}}
			>
				{objects.length === 0 ? message : objects}
			</div>
		)
	}
	
	return (
		<div className="heap">
			<Header 
				region="heap" 
				objectsCount={objects.length}
			/>
			<HeapObjects />
		</div>
	)
}

export default Heap