import React, {useState, useEffect, useRef} from "react"
import ObjectHeader from "../Object/ObjectHeader"
import Variable from "../Object/Variable"

function HeapObject(props) {
	const [name, setName] = useState("")
	const [count, setCount] = useState(0)
	const [variables, setVariables] = useState([])
	const [size, setSize] = useState({width: "", height: ""})
	const [position, setPosition] = useState({top: "", left: ""})

	const obj = useRef(null)

	useEffect(() => {
		const {width, height} = obj.current.getBoundingClientRect()
		const leftLimit = props.stackWidth + 10
		const topLimit = 55
		let top = props.mouseTop - topLimit - 23
		let left = props.mouseLeft - leftLimit - width/2

		if (top-23 < topLimit && left < 0) {
			top = 20
			left = 20
		} else if (top-23 < topLimit) {
			top = 20
		} else if (left < 0) {
			left = 20
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
			ref={obj}
			draggable={true}
			style={props.region === "heap" ? {top: position.top, left: position.left} : null}
		>
			<DragHandle />
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