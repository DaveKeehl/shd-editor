import React, {useState, useContext, useEffect, useRef} from "react"
import ObjectHeader from "../Object/ObjectHeader"
import Variable from "../Object/Variable"
import {StateContext} from "../../contexts/stateContext"
import {utils} from "../../utils"

function StackFrame(props) {
	const [name, setName] = useState("")
	const [variables, setVariables] = useState([])

	const app = useContext(StateContext)

	const frameRef = useRef(null)

	useEffect(() => {
		// BLOCK_PADDING
		const padding = parseInt(window.getComputedStyle(frameRef.current).getPropertyValue("padding"))
		utils.functions.updateConstantValue("BLOCK_PADDING", padding)
		// FRAME_MIN_HEIGHT
		const frameMinHeight = parseInt(window.getComputedStyle(frameRef.current).getPropertyValue("height"))
		utils.functions.updateConstantValue("FRAME_MIN_HEIGHT", frameMinHeight)
		// FRAME_MARGIN_BOTTOM
		const frameMarginBottom = parseInt(window.getComputedStyle(frameRef.current).getPropertyValue("margin-bottom"))
		utils.functions.updateConstantValue("FRAME_MARGIN_BOTTOM", frameMarginBottom)
	},[])

	function updateName(newName) {
		setName(newName)
		app.setStackFrameName(props.id, newName)
	}

	function addVariable(nature) {
		const newVariable = (
			<Variable 
				key={app.count} 
				id={app.count} 
				nature={nature}
				region="stack"
				parentID={props.id}
				removeVariable={removeVariable}
			/>
		)
		setVariables(prevVariables => [...prevVariables, newVariable])
		app.addStackFrameVariable(props.id, nature)
	}

	function removeVariable(id) {
		setVariables(prevVariables => prevVariables.filter(variable => id !== variable.props.id))
		app.removeStackFrameVariable(props.id, id)
	}

	return (
		<div 
			className="object" 
			draggable={false}
			ref={frameRef}
		>
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