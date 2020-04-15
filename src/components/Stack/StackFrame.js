import React, {useState, useRef, useEffect} from "react"
import ObjectHeader from "../Object/ObjectHeader"
import Variable from "../Object/Variable"

function StackFrame(props) {
	const [name, setName] = useState("")
	const [count, setCount] = useState(0)
	const [variables, setVariables] = useState([])

	const frame = useRef(null)

	function cumulativeOffset(element) {
		var top = 0, left = 0;
		do {
			top += element.offsetTop  || 0;
			left += element.offsetLeft || 0;
			element = element.offsetParent;
		} while(element);
	
		return {
			top: top,
			left: left
		};
	};

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

	return (
		<div className="object" draggable={false}>
			<ObjectHeader 
				id={props.id} 
				region="stack"
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

export default StackFrame