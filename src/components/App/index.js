import React, {useState, useRef, useEffect, useContext} from "react"
import Stack from "../Stack"
import Heap from "../Heap"
import Arrows from "../Arrows"
import {StateContext} from "../../contexts/stateContext"
import {ArrowsContext} from "../../contexts/arrowsContext"
import {ResizableStackContext} from "../../contexts/resizableStackContext"
import {HeapAddModeContextProvider} from "../../contexts/heapAddModeContext"
import {HeapMousePositionContextProvider} from "../../contexts/heapMousePositionContext"
import {utils} from "../../utils"

function App() {
	const [diagram, setDiagram] = useState({})
	
	const app = useContext(StateContext)
	const arrows = useContext(ArrowsContext)
	const { stackWidth, 
			setStackWidth, 
			stackInputWidth, 
			setStackInputWidth, 
			isResizable, 
			setIsResizable } = useContext(ResizableStackContext)
	
	const separator = useRef(null)

	// LOAD COMPUTED CSS VALUE WHEN APP MOUNTS
	useEffect(() => {
		// SEPARATOR
		const separatorWidth = parseInt(window.getComputedStyle(separator.current).getPropertyValue("width"))
		utils.functions.updateConstantValue("SEPARATOR", separatorWidth)
	}, [])

	useEffect(() => {
		setDiagram(app.diagram)
		arrows.rebuildArrows(app.diagram, stackWidth)
		// console.log(utils.constants)
	}, [app.diagram, utils.constants])

	function handleMouseDown() {
		setIsResizable(true)
		separator.current.style.background = "#c3c3c3"
	}

	function handleMouseUp(event) {
		setIsResizable(false)
		separator.current.style.background = "#F3F3F3"

		if (arrows.isArrowDragged) {

			if (arrows.activeDragHandle === "start") {

				const arrowStart = arrows.getExactStackStartPosition(app.diagram.stack, stackWidth, event.clientY)
				console.log(arrowStart)
				
				if (arrowStart !== undefined) {
					app.resetVariablesValueAfterArrowDeletion(arrows.newArrow.from.id)
					arrows.setStart({
						X: arrowStart.coordinates.X,
						Y: arrowStart.coordinates.Y
					})
					arrows.setFrom({
						region: arrowStart.region,
						parentId: arrowStart.parentId,
						id: arrowStart.variableId
					})
					app.setVariableData(arrowStart.region, arrowStart.parentId, arrowStart.variableId, { name: "value", value: arrows.newArrow.to})
				}
			} else {
				arrows.stopDraggingArrow(app.diagram.heap, stackWidth, event, app.setVariableData)
			}
			arrows.setIsArrowDragged(false)
			arrows.setActiveDragHandle("")
		}
	}

	function handleDoubleClick() {
		const {STACK_MIN, INPUT_MIN_WIDTH} = utils.constants
		setStackWidth(STACK_MIN)
		const INPUT_WIDTH = utils.functions.getStackFrameInputWidth(stackWidth)
		arrows.updateArrowsOnStackWidthReset(stackWidth, INPUT_WIDTH)
		setStackInputWidth(INPUT_MIN_WIDTH)
	}

	function handleMouseMove(event) {
		const {STACK_MIN, STACK_MAX} = utils.constants
		const {clientX, clientY} = event
		if (arrows.isArrowDragged) {
			if (arrows.activeDragHandle === "start") {
				arrows.setStart({X: clientX, Y: clientY})
			} else {
				arrows.setEnd({X: clientX, Y: clientY})
			}
		}
		if (isResizable && clientX >= STACK_MIN && clientX <= STACK_MAX) {
			const INPUT_WIDTH = utils.functions.getStackFrameInputWidth(clientX)
			arrows.updateArrowsOnStackResize(clientX, stackWidth, stackInputWidth, INPUT_WIDTH)
			setStackWidth(clientX)
			setStackInputWidth(INPUT_WIDTH)
		}
	}

	return (
		<div
			className="App"
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
			style={
				isResizable ? 
				{cursor: "col-resize"} : 
				arrows.activeDragHandle !== "" ? 
					{cursor: "pointer"} : 
					null
			}
		>
			<Arrows />
			<main style={{gridTemplateColumns: `${stackWidth}px min-content auto`}}>
				<Stack />
				<div
					className="separator"
					ref={separator}
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
					onDoubleClick={handleDoubleClick}
				>
				</div>
				<HeapAddModeContextProvider>
					<HeapMousePositionContextProvider>
						<Heap stackWidth={stackWidth} />
					</HeapMousePositionContextProvider>
				</HeapAddModeContextProvider>
			</main>
		</div>
	)
}

export default React.memo(App)