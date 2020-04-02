import React, { useState, useEffect, useRef } from "react"
import ObjectHeader from "./ObjectHeader"
import Variable from "./Variable"

function ObjectComponent(props) {
	const [name, setName] = useState("")
	const [count, setCount] = useState(0)
	const [variables, setVariables] = useState([])
	const [size, setSize] = useState({width: "", height: ""})
	const [position, setPosition] = useState({top: "", left: ""})

	const obj = useRef(null)

	useEffect(() => {
		const {width, height} = obj.current.getBoundingClientRect()
		setPosition({top: props.top-23, left: props.left-width/2})
		setSize({width: width, height: height})
	}, [props.left, props.top])

	function updateName(newName) {
		setName(newName)
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

	function DragHandle() {
		return <div className="object__drag-handle"></div>
	}

	return (
		<div 
			className="object" 
			draggable={props.region === "heap" ? true : false} 
			ref={obj}
			style={{top: position.top, left: position.left}}
		>
			{props.region === "heap" ? <DragHandle /> : null}
			<ObjectHeader 
				id={props.id} 
				region={props.region}
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