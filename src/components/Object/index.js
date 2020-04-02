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
		let top = props.top
		let left = props.left - width/2
		console.log(`Mouse top: ${props.top}, Mouse left: ${props.left}`)
		// IF THE OBJECT CROSSES THE TOP BORDER
		if (top-23 < 55) {
			top = 55 + 20
		}
		// IF THE OBJECT CROSSES THE BOTTOM BORDER
		else if (top+height > window.innerHeight) {
			top = window.innerHeight - height - 20
		} 
		// IF THE OBJECT CROSSES THE LEFT BORDER
		else if (left < 370) {
			top = top - height/2
			left = 370 + 20
		}
		// IF THE OBJECT CROSSES THE RIGHT BORDER
		else if (left+width > window.innerWidth) {
			left = window.innerWidth - width - 20
		}
		else {
			top = top - 23
		}
		setPosition({top: top, left: left})
		setSize({width: width, height: height})
	}, [props.left, props.top])

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