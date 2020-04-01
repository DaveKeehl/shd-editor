import React, { useState } from 'react'
import ObjectHeader from './ObjectHeader'
// import Variable from './Variable'
// import NewVariableForm from './NewVariableForm'

function Object(props) {
	const [name, setName] = useState("")
	const [totalVariablesCreated, setTotalVariablesCreated] = useState(0)
	const [variables, setVariables] = useState([])

	updateName = (name) => {
		setName(name)
	}

	addVariable = (nature) => {
		const newVariable = <Variable 
								key={totalVariablesCreated} 
								id={totalVariablesCreated} 
								nature={nature}
								removeVariable={removeVariable}
							/>
		setTotalVariablesCreated(oldCount => oldCount+1)
		setVariables(existingVariables => [...existingVariables, newVariable])
	}

	removeVariable = (id) => {
		setVariables(variables => variables.filter(variable => id !== variable.props.id))
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
			{/* <div className="object__variables">{variables}</div>
			<NewVariableForm addVariable={addVariable} /> */}
		</div>
	)
}

export default Object