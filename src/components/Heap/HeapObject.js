import React, {useState, useEffect, useContext, useRef} from "react"
import ObjectHeader from "../Object/ObjectHeader"
import Variable from "../Object/Variable"
import {StateContext} from "../../contexts/stateContext"
import {ResizableStackContext} from "../../contexts/resizableStackContext"
import {HeapDepthIndexContext} from "../../contexts/heapDepthIndexContext"
import {HeapMousePositionContext} from "../../contexts/heapMousePositionContext"
import {utils} from "../../utils"

function HeapObject(props) {
	const [name, setName] = useState("")
	const [variables, setVariables] = useState([])
	const [position, setPosition] = useState({X: props.initialPosition.X, Y: props.initialPosition.Y})
	const [isDragged, setIsDragged] = useState(false)
	const [localDepthIndex, setLocalDepthIndex] = useState("")

	const app = useContext(StateContext)
	const {stackWidth} = useContext(ResizableStackContext)
	const {depthIndex, setDepthIndex} = useContext(HeapDepthIndexContext)
	const {mousePosition, setMousePosition} = useContext(HeapMousePositionContext)

	const obj = useRef(null)

	useEffect(() => {
		if (isDragged) {
			const newPosition = utils.functions.convertFromAbsoluteToRelative(
				stackWidth, 
				{X: mousePosition.X, Y: mousePosition.Y}
			)
			setPosition(newPosition)
			app.setHeapObjectPosition(props.id, newPosition)
		}
	}, [mousePosition])

	useEffect(() => {
		if (props.initialPosition.X < 0 && props.initialPosition.Y < 0) {
			const newPosition = {X: 0, Y: 0}
			setPosition(newPosition)
			app.setHeapObjectPosition(props.id, newPosition)
		}
		// else if (props.initialPosition.X > window.innerWidth && props.initialPosition.Y > window.innerHeight) {
		// 	const newPosition = {X: "to be defined", Y: "to be defined"}
		// 	setPosition(newPosition)
		// 	app.setHeapObjectPosition(props.id, newPosition)
		// }
		else if (props.initialPosition.X < 0) {
			const newPosition = {X: 0, Y: props.initialPosition.Y}
			setPosition(newPosition)
			app.setHeapObjectPosition(props.id, newPosition)
		}
		else if (props.initialPosition.Y < 0) {
			const newPosition = {X: props.initialPosition.X, Y: 0}
			setPosition(newPosition)
			app.setHeapObjectPosition(props.id, newPosition)
		}
		setDepthIndex(prevState => prevState+1)
		setLocalDepthIndex(depthIndex+1)
		app.setHeapObjectDepthIndex(props.id, depthIndex+1)
	}, [])

	function updateName(newName) {
		setName(newName)
		app.setHeapObjectName(props.id, newName)
	}

	function addVariable(nature) {
		const newVariable = (
			<Variable 
				key={app.count} 
				id={app.count} 
				nature={nature}
				region="heap"
				parentID={props.id}
				removeVariable={removeVariable}
			/>
		)
		setVariables(prevVariables => [...prevVariables, newVariable])
		app.addHeapObjectVariable(props.id, nature)
	}

	function removeVariable(id) {
		setVariables(prevVariables => prevVariables.filter(variable => id !== variable.props.id))
		app.removeHeapObjectVariable(props.id, id)
	}

	function handleMouseDown() {
		setIsDragged(true)
		if (localDepthIndex < depthIndex) {
			setDepthIndex(prevIndex => prevIndex+1)
			setLocalDepthIndex(depthIndex+1)
			app.setHeapObjectDepthIndex(props.id, depthIndex+1)
		}
	}

	function handleMouseUp() {
		setIsDragged(false)
		if (position.X < 0 && position.Y < 0) {
			const newPosition = {X: 0, Y: 0}
			setPosition(newPosition)
			app.setHeapObjectPosition(props.id, newPosition)
		}
		else if (position.X < 0) {
			const newPosition = {X: 0, Y: position.Y}
			setPosition(newPosition)
			app.setHeapObjectPosition(props.id, newPosition)
		}
		else if (position.Y < 0) {
			const newPosition = {X: position.X, Y: 0}
			setPosition(newPosition)
			app.setHeapObjectPosition(props.id, newPosition)
		}
	}

	return (
		<div 
			className={`object ${isDragged ? "object--selected" : ""}`} 
			draggable={false}
			ref={obj}
			style={{transform: `translate(${position.X}px, ${position.Y}px)`, zIndex: localDepthIndex}}
		>
			<div 
				className="object__drag-handle"
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
			>
			</div>
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