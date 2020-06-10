import React, {useState, useContext, useEffect, useRef} from "react"
import Header from "../Header"
import HeapObject from "./HeapObject"
import {StateContext} from "../../contexts/stateContext"
import {ArrowsContext} from "../../contexts/arrowsContext"
import {HeapAddModeContext} from "../../contexts/heapAddModeContext"
import {HeapMousePositionContext} from "../../contexts/heapMousePositionContext"
import {HeapDepthIndexContextProvider} from "../../contexts/heapDepthIndexContext"
import {utils} from "../../utils"

function Heap(props) {
	const [objects, setObjects] = useState([])

	const app = useContext(StateContext)
	const arrows = useContext(ArrowsContext)
	const {isAddModeActive, toggleAddMode} = useContext(HeapAddModeContext)
	const {mousePosition, setMousePosition} = useContext(HeapMousePositionContext)

	const heapRef = useRef(null)

	// LOAD COMPUTED CSS VALUE WHEN COMPONENT MOUNTS
	useEffect(() => {
		const padding = parseInt(window.getComputedStyle(heapRef.current).getPropertyValue("padding-top"))
		utils.functions.updateConstantValue("REGION_PADDING", padding)
	}, [])

	useEffect(() => {
		const updatedHeap = app.diagram.heap.map(object => {
			return (
				<HeapObject 
					key={object.id} 
					id={object.id} 
					name={object.name}
					variables={object.variables}
					position={object.position}
					depthIndex={object.depthIndex}
					removeBlock={removeBlock}
				/>
			)
		})
		setObjects(updatedHeap)
	}, [app.diagram.heap])

	function removeBlock(id) {
		setObjects(prevObjects => prevObjects.filter(object => id !== object.props.id))
		app.removeHeapObject(id)
	}

	function handleClick(event) {
		const {REGION_PADDING, SEPARATOR, BLOCK_WIDTH, HEADER_HEIGHT, BLOCK_PADDING, OBJECT_HANDLE_HEIGHT} = utils.constants

		if (isAddModeActive) {
			const {clientX, clientY} = event
			const initialPosition = {
				X: clientX - props.stackWidth - REGION_PADDING - SEPARATOR - BLOCK_WIDTH/2,
				Y: clientY - REGION_PADDING - HEADER_HEIGHT - BLOCK_PADDING - OBJECT_HANDLE_HEIGHT/2
			}
			app.addHeapObject(initialPosition)
			toggleAddMode()
		}
	}

	function handleMouseMove(event) {
		const {clientX, clientY} = event
		setMousePosition({X: clientX, Y: clientY})
	}
	
	return (
		<div 
			className="heap" 
			style={arrows.isArrowDragged ? {cursor: "pointer"} : null}
		>
			<Header region="heap" objectsCount={objects.length}/>
			<HeapDepthIndexContextProvider>
				<div 
					className="heap__objects objects"
					style={isAddModeActive ? {cursor: "crosshair"} : null}
					onClick={handleClick}
					onMouseMove={handleMouseMove}
					ref={heapRef}
				>
					{
						objects.length === 0 ? 
						<p>Click on the "+" button to freely position an Object on the Heap.</p> : 
						objects
					}
				</div>
			</HeapDepthIndexContextProvider>
		</div>
	)
}

export default Heap