import React, {useState} from "react"
import ObjectHeader from "../Object/ObjectHeader"
import Variable from "../Object/Variable"

function HeapObject(props) {
	const [name, setName] = useState("")
	const [count, setCount] = useState(0)
	const [variables, setVariables] = useState([])
	const [position, setPosition] = useState({X: props.initialPosition.X, Y: props.initialPosition.Y})
	const [isDragged, setIsDragged] = useState(false)

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
			console.log(`X: ${clientX}, Y: ${clientY}`)
			setPosition({X: clientX-360-10-20-160, Y: clientY-20-55-23})
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
				onMouseUp={() => setIsDragged(false)}
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