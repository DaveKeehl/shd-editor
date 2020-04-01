import React, { useState } from "react"
import ObjectHeader from "./ObjectHeader"
import Variable from "./Variable"
import NewVariableForm from "./NewVariableForm"

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

	const background = {
		background: "linear-gradient(180deg, #4A59A7 0%, #16298A 100%)"
	}

	return (
		<div 
			className="object" 
			style={props.region === "heap" ? background : null}
		>
			<ObjectHeader 
				id={props.id} 
				updateName={updateName}
				removeBlock={props.removeBlock}
			/>
			<div className="object__variables">{variables}</div>
			<NewVariableForm addVariable={addVariable} />
		</div>
	)
}

export default ObjectComponent