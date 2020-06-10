import React, {useState, useContext, useEffect, useRef} from "react"
import ObjectHeader from "../Object/ObjectHeader"
import Variable from "../Object/Variable"
import {StateContext} from "../../contexts/stateContext"
import {utils} from "../../utils"

function StackFrame(props) {
	const [variables, setVariables] = useState([])

	const app = useContext(StateContext)

	const frameRef = useRef(null)

	// LOAD COMPUTED CSS VALUE WHEN COMPONENT MOUNTS
	useEffect(() => {
		// BLOCK_PADDING
		const padding = parseInt(window.getComputedStyle(frameRef.current).getPropertyValue("padding-top"))
		utils.functions.updateConstantValue("BLOCK_PADDING", padding)
		// FRAME_MIN_HEIGHT
		const frameMinHeight = parseInt(window.getComputedStyle(frameRef.current).getPropertyValue("height"))
		utils.functions.updateConstantValue("FRAME_MIN_HEIGHT", frameMinHeight)
		// FRAME_MARGIN_BOTTOM
		const frameMarginBottom = parseInt(window.getComputedStyle(frameRef.current).getPropertyValue("margin-bottom"))
		utils.functions.updateConstantValue("FRAME_MARGIN_BOTTOM", frameMarginBottom)
	},[])

	useEffect(() => {
		const updatedVariables = props.variables.map(variable => {
			return (
				<Variable 
					key={variable.id} 
					id={variable.id} 
					nature={variable.nature}
					region="stack"
					name={variable.name}
					type={variable.type}
					value={variable.value}
					parentID={props.id}
					removeVariable={removeVariable}
				/>
			)
		})
		setVariables(updatedVariables)
	}, [props.variables])

	const updateName = (newName) => { app.setStackFrameName(props.id, newName) }
	const addVariable = (nature) => { app.addStackFrameVariable(props.id, nature) }
	const removeVariable = (id) => { app.removeStackFrameVariable(props.id, id) }

	return (
		<div 
			className="object" 
			draggable={false}
			ref={frameRef}
		>
			<ObjectHeader 
				id={props.id} 
				region="stack"
				name={props.name}
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