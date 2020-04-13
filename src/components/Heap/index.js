import React, {useState, useContext} from "react"
import Header from "../Header"
import HeapObject from "./HeapObject"
import {HeapAddModeContext} from "../../contexts/heapAddModeContext"

function Heap(props) {
	const [count, setCount] = useState(0)
	const [objects, setObjects] = useState([])
	// const [dragging, setDragging] = useState(false)

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
					initialPosition={{X: clientX-360-10-20-160, Y: clientY-20-55-23}}
					removeBlock={removeBlock}
					// setDragging={setDragging}
				/>	
			)
			setCount(prevCount => prevCount+1)
			setObjects(prevObjects => [newBlock, ...prevObjects])
			toggleAddMode()
		}
	}

	// function handleMouseMove(event) {
	// 	const {clientX, clientY} = event
	// 	if (dragging) {
	// 		console.log(`X: ${clientX}, Y: ${clientY}`)
	// 	}
	// }

	// function handleMouseUp() {
	// 	if (dragging) {
	// 		setDragging(false)
	// 	}
	// }

	function HeapObjects() {
		const message = <p>Click on the "+" button to freely position an Object on the Heap.</p>
		return (
			<div 
				className="heap__objects objects"
				style={isAddModeActive ? {cursor: "crosshair"} : null}
				onClick={handleClick}
				// onMouseMove={handleMouseMove}
				// onMouseUp={handleMouseUp}
			>
				{objects.length === 0 ? message : objects}
			</div>
		)
	}
	
	return (
		<div className="heap">
			<Header region="heap" objectsCount={objects.length}/>
			<HeapObjects />
		</div>
	)
}

export default Heap