import React, {useState, useContext} from "react"
import ObjectHeader from "../Object/ObjectHeader"
import Variable from "../Object/Variable"
import {StateContext} from "../../contexts/stateContext"
import {ArrowsContext} from "../../contexts/arrowsContext"
import {ResizableStackContext} from "../../contexts/resizableStackContext"
import {utils} from "../../utils"

function StackFrame(props) {
	const [name, setName] = useState("")
	const [variables, setVariables] = useState([])

	const app = useContext(StateContext)
	const arrows = useContext(ArrowsContext)
	const {stackWidth} = useContext(ResizableStackContext)

	const {VAR_HEIGHT, VAR_VERTICAL_MARGIN, INPUT_HEIGHT} = utils.constants

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

		arrows.updateArrows("addStackFrameVariable", {
			frameID: props.id,
			stack: app.diagram.stack,
			heap: app.diagram.heap, 
			stackWidth
		})
	}

	function removeVariable(id) {
		setVariables(prevVariables => prevVariables.filter(variable => id !== variable.props.id))
		app.removeStackFrameVariable(props.id, id)
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