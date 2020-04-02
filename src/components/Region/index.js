import React, { useState } from "react"
import Header from "../Header"
import Object from "../Object"
import {HeapAddModeProvider, HeapAddModeConsumer} from "../../contexts/heapAddModeContext"

function Region(props) {
	const [name, setName] = useState(props.name)
	const [count, setCount] = useState(0)
	const [objects, setObjects] = useState([])
	const [draggableArea, setDraggableArea] = useState({top: "", right: "", bottom: "", left: ""})

	function addBlock(event) {
		// console.log(event)
		const newBlock = (
			<Object 
				key={count} 
				id={count} 
				region={name}
				removeBlock={removeBlock}
			/>	
		)
		setCount(prevCount => prevCount+1)
		setObjects(prevObjects => [newBlock, ...prevObjects])
	}

	function removeBlock(id) {
		setObjects(prevObjects => prevObjects.filter(object => id !== object.props.id))
	}

	const message = <p>Click on the "+" button {name === "stack" ? "to create a Stack Frame" : "to freely position an Object on the Heap"}.</p>

	const stack = (
		<div className={`${name}__objects objects`}>
			{objects.length === 0 ? message : objects}
		</div>
	)

	const heap = (
		<HeapAddModeConsumer>
			{({isAddModeActive, toggleAddMode}) => {
				return (
					<div 
						className={`${name}__objects objects`}
						style={isAddModeActive ? {cursor: "crosshair"} : null}
						onClick={(event) => {
							if (isAddModeActive) {
								const {clientX, clientY} = event
								const newBlock = <Object 
													key={count} 
													id={count} 
													region={name}
													top={clientY}
													left={clientX}
													removeBlock={removeBlock}
												/>
								setCount(prevCount => prevCount+1)
								setObjects(prevObjects => [newBlock, ...prevObjects])
								toggleAddMode()
							}
						}}
					>
						{objects.length === 0 ? message : objects}
					</div>
				)
			}}
		</HeapAddModeConsumer>
	)

	return (
		<HeapAddModeProvider>
			<div className={name}>
				<Header 
					region={name} 
					objectsCount={objects.length}
					addBlock={name === "stack" ? addBlock : null}
				/>
				{name === "heap" ? heap : stack}
			</div>
		</HeapAddModeProvider>
	)
}

export default Region