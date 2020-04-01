import React, { useState } from "react"
import ObjectHeader from "./ObjectHeader"
import Variable from "./Variable"

function ObjectComponent(props) {
	const [name, setName] = useState("")
	const [count, setCount] = useState(0)
	const [variables, setVariables] = useState([])

	function updateName(name) {
		setName(name)
	}

	function addVariable(nature) {
		const newVariable = <Variable 
								key={count} 
								id={count} 
								nature={nature}
								removeVariable={removeVariable}
							/>
		setCount(prevCount => prevCount+1)
		setVariables(prevVariables => [...prevVariables, newVariable])
	}

	function removeVariable(id) {
		setVariables(prevVariables => prevVariables.filter(variable => id !== variable.props.id))
	}

	return (
		<div className="object">
			<ObjectHeader 
				id={props.id} 
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

export default ObjectComponent