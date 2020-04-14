import React, {useState, useEffect, useContext} from "react"
import Header from "../Header"
import HeapObject from "./HeapObject"
import {HeapAddModeContext} from "../../contexts/heapAddModeContext"

function Heap(props) {
	const [count, setCount] = useState(0)
	const [objects, setObjects] = useState([])

	const {isAddModeActive, toggleAddMode} = useContext(HeapAddModeContext)

	function removeBlock(id) {
		setObjects(prevObjects => prevObjects.filter(object => id !== object.props.id))
	}

	function handleClick(event) {
		if (isAddModeActive) {
			const {clientX, clientY} = event
			const newBlock = (
				<HeapObject 
					key={count} 
					id={count} 
					initialPosition={{X: clientX-props.stackWidth-10-20-160, Y: clientY-20-55-23}}
					removeBlock={removeBlock}
				/>	
			)
			setCount(prevCount => prevCount+1)
			setObjects(prevObjects => [newBlock, ...prevObjects])
			toggleAddMode()
		}
	}
	
	return (
		<div className="heap">
			<Header region="heap" objectsCount={objects.length}/>
			<div 
				className="heap__objects objects"
				style={isAddModeActive ? {cursor: "crosshair"} : null}
				onClick={handleClick}
			>
				{objects.length === 0 ? <p>Click on the "+" button to freely position an Object on the Heap.</p> : objects}
			</div>
		</div>
	)
}

export default Heap