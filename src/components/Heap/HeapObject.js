import React, {useState, useEffect, useContext, useRef} from "react"
import ObjectHeader from "../Object/ObjectHeader"
import Variable from "../Object/Variable"
import {StateContext} from "../../contexts/stateContext"
import {ResizableStackContext} from "../../contexts/resizableStackContext"
import {HeapDepthIndexContext} from "../../contexts/heapDepthIndexContext"
import {HeapMousePositionContext} from "../../contexts/heapMousePositionContext"
import {utils} from "../../utils"

function HeapObject(props) {
	const [variables, setVariables] = useState([])
	const [isDragged, setIsDragged] = useState(false)
	const [localDepthIndex, setLocalDepthIndex] = useState("")

	const app = useContext(StateContext)
	const {stackWidth} = useContext(ResizableStackContext)
	const {depthIndex, setDepthIndex} = useContext(HeapDepthIndexContext)
	const {mousePosition, setMousePosition} = useContext(HeapMousePositionContext)

	const obj = useRef(null)
	const dragHandleRef = useRef(null)

	// LOAD COMPUTED CSS VALUE WHEN COMPONENT MOUNTS
	useEffect(() => {
		// BLOCK_WIDTH
		const blockWidth = parseInt(window.getComputedStyle(obj.current).getPropertyValue("width"))
		utils.functions.updateConstantValue("BLOCK_WIDTH", blockWidth)
		// BLOCK_PADDING
		const blockPadding = parseInt(window.getComputedStyle(obj.current).getPropertyValue("padding-top"))
		utils.functions.updateConstantValue("BLOCK_PADDING", blockPadding)
		// OBJECT_MIN_HEIGHT
		const objectMinHeight = parseInt(window.getComputedStyle(obj.current).getPropertyValue("height"))
		utils.functions.updateConstantValue("OBJECT_MIN_HEIGHT", objectMinHeight)
		// OBJECT_HANDLE_WIDTH
		const handleWidth = parseInt(window.getComputedStyle(dragHandleRef.current).getPropertyValue("width"))
		utils.functions.updateConstantValue("OBJECT_HANDLE_WIDTH", handleWidth)
		// OBJECT_HANDLE_HEIGHT
		const handleHeight = parseInt(window.getComputedStyle(dragHandleRef.current).getPropertyValue("height"))
		utils.functions.updateConstantValue("OBJECT_HANDLE_HEIGHT", handleHeight)
		// OBJECT_HANDLE_BOTTOM_MARGIN
		const handleMarginBottom = parseInt(window.getComputedStyle(dragHandleRef.current).getPropertyValue("margin-bottom"))
		utils.functions.updateConstantValue("OBJECT_HANDLE_BOTTOM_MARGIN", handleMarginBottom)
	}, [])

	useEffect(() => {
		const updatedVariables = props.variables.map(variable => {
			return (
				<Variable 
					key={variable.id} 
					id={variable.id} 
					nature={variable.nature}
					region="heap"
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

	useEffect(() => {
		if (isDragged) {
			const newPosition = utils.functions.convertFromAbsoluteToRelative(
				stackWidth, 
				{X: mousePosition.X, Y: mousePosition.Y}
			)
			app.setHeapObjectPosition(props.id, newPosition)
		}
	}, [mousePosition])

	useEffect(() => {
		if (props.position.X < 0 && props.position.Y < 0) {
			const newPosition = {X: 0, Y: 0}
			app.setHeapObjectPosition(props.id, newPosition)
		}
		else if (props.position.X < 0) {
			const newPosition = {X: 0, Y: props.position.Y}
			app.setHeapObjectPosition(props.id, newPosition)
		}
		else if (props.position.Y < 0) {
			const newPosition = {X: props.position.X, Y: 0}
			app.setHeapObjectPosition(props.id, newPosition)
		}
		setDepthIndex(prevState => prevState+1)
		setLocalDepthIndex(depthIndex+1)
		app.setHeapObjectDepthIndex(props.id, depthIndex+1)
	}, [])

	const updateName = (newName) => { app.setHeapObjectName(props.id, newName) }
	const addVariable = (nature) => { app.addHeapObjectVariable(props.id, nature) }
	const removeVariable = (id) => { app.removeHeapObjectVariable(props.id, id) }

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
		if (props.position.X < 0 && props.position.Y < 0) {
			const newPosition = {X: 0, Y: 0}
			app.setHeapObjectPosition(props.id, newPosition)
		}
		else if (props.position.X < 0) {
			const newPosition = {X: 0, Y: props.position.Y}
			app.setHeapObjectPosition(props.id, newPosition)
		}
		else if (props.position.Y < 0) {
			const newPosition = {X: props.position.X, Y: 0}
			app.setHeapObjectPosition(props.id, newPosition)
		}
	}

	return (
		<div 
			className={`object ${isDragged ? "object--selected" : ""}`} 
			draggable={false}
			ref={obj}
			style={{
				transform: `translate(${props.position.X}px, ${props.position.Y}px)`, 
				zIndex: localDepthIndex,
				cursor: `${isDragged ? "pointer" : "default"}`
			}}
		>
			<div 
				className="object__drag-handle"
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				ref={dragHandleRef}
			>
			</div>
			<ObjectHeader 
				id={props.id} 
				region="heap"
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

export default HeapObject