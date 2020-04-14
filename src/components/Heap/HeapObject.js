import React, {useState, useEffect, useContext} from "react"
import ObjectHeader from "../Object/ObjectHeader"
import Variable from "../Object/Variable"
import {ResizableStackContext} from "../../contexts/resizableStackContext"

function HeapObject(props) {
	const [name, setName] = useState("")
	const [count, setCount] = useState(0)
	const [variables, setVariables] = useState([])
	const [position, setPosition] = useState({X: props.initialPosition.X, Y: props.initialPosition.Y})
	const [isDragged, setIsDragged] = useState(false)

	const {stackWidth} = useContext(ResizableStackContext)

	// useEffect(() => {
	// 	console.log("Resized stack width")
	// }, [stackWidth])

	useEffect(() => {
		if (props.initialPosition.X < 0 && props.initialPosition.Y < 0) {
			setPosition({X: 0, Y: 0})
		}
		else if (props.initialPosition.X < 0) {
			setPosition({X: 0, Y: props.initialPosition.Y})
		}
		else if (props.initialPosition.Y < 0) {
			setPosition({X: props.initialPosition.X, Y: 0})
		}
	}, [])

	function updateName(newName) {
		setName(newName)
	}

	function addVariable(nature) {
		const newVariable = (
			<Variable 
				key={count} 
				id={count} 
				nature={nature}
				removeVariable={removeVariable}
			/>
		)
		setCount(prevCount => prevCount+1)
		setVariables(prevVariables => [...prevVariables, newVariable])
	}

	function removeVariable(id) {
		setVariables(prevVariables => prevVariables.filter(variable => id !== variable.props.id))
	}

	function handleMouseMove(event) {
		const {clientX, clientY} = event
		if (isDragged) {
			// console.log(`X: ${clientX}, Y: ${clientY}`)
			setPosition({X: clientX-stackWidth-10-20-160, Y: clientY-20-55-23})
		}
	}

	function handleMouseUp() {
		setIsDragged(false)
		if (position.X < 0 && position.Y < 0) {
			setPosition({X: 0, Y: 0})
		}
		else if (position.X < 0) {
			setPosition({X: 0, Y: position.Y})
		}
		else if (position.Y < 0) {
			setPosition({X: position.X, Y: 0})
		}
	}

	return (
		<div 
			className="object" 
			draggable={false}
			onMouseMove={handleMouseMove}
			style={{transform: `translate(${position.X}px, ${position.Y}px)`}}
		>
			<div 
				className="object__drag-handle"
				onMouseDown={() => setIsDragged(true)}
				onMouseUp={handleMouseUp}
			>
			</div>
			<ObjectHeader 
				id={props.id} 
				region="heap"
				updateName={updateName}
				removeBlock={props.removeBlock}
			/>
			<div>{variables}</div>
			<div 
				className="object__separator" 
				style={variables.length > 0 ? {display: "block"} : {display: "none"}}
			></div>
			<div className="object__buttons">
				<button onClick={() => {addVariable("primitive")}}>Add Prim.</button>
				<button onClick={() => {addVariable("reference")}}>Add Ref.</button>
			</div>
		</div>
	)
}

export default HeapObject