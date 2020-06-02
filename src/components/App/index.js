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
	// const [diagram, setDiagram] = useState({})
	
	const app = useContext(StateContext)
	const arrows = useContext(ArrowsContext)
	const { stackWidth, 
			setStackWidth, 
			stackInputWidth, 
			setStackInputWidth, 
			isResizable, 
			setIsResizable } = useContext(ResizableStackContext)
	
	const separator = useRef(null)

	// LOAD COMPUTED CSS VALUE WHEN COMPONENT MOUNTS
	useEffect(() => {
		// SEPARATOR
		const separatorWidth = parseInt(window.getComputedStyle(separator.current).getPropertyValue("width"))
		utils.functions.updateConstantValue("SEPARATOR", separatorWidth)
	}, [])

	useEffect(() => {
		// setDiagram(app.diagram)
		arrows.rebuildArrows(app.diagram, stackWidth)
		// console.log(utils.constants)
	}, [app.diagram, utils.constants])

	function handleMouseDown() {
		setIsResizable(true)
		separator.current.style.background = "#c3c3c3"
	}

	function handleMouseUp(event) {

		if (isResizable) {
			setIsResizable(false)
			separator.current.style.background = "#F3F3F3"
		}

		arrows.setIsArrowHeadVisible(false)

		if (arrows.isArrowDragged) {
			if (arrows.activeDragHandle === "start") {
				// CHECK IF NEW START IS ON A STACK FRAME OR A HEAP OBJECT
				const arrowStart = () => {
					const stackArrowStart = arrows.getExactStackStartPosition(
						app.diagram.stack, 
						stackWidth, 
						event.clientX, 
						event.clientY
					)
					const target = utils.functions.getHoveredHeapObject(
						app.diagram.heap, 
						event.clientX, 
						event.clientY, 
						stackWidth
					)
					const heapArrowStart = (
						target === undefined ? 
						undefined : 
						arrows.getExactHeapStartPosition(stackWidth, target, event.clientX, event.clientY)
					)
					if (stackArrowStart !== undefined && heapArrowStart === undefined) {
						return stackArrowStart
					} 
					else if (stackArrowStart === undefined && heapArrowStart !== undefined) {
						return heapArrowStart
					}
					else {
						return undefined
					}
				}
				if (arrowStart() !== undefined) {
					// KEEP SELECTED ARROWS UPDATED WHEN REBASING ARROW
					arrows.updateSelectedArrowOnDragStart(arrowStart)
					// UPDATE NEW ARROW VALUES
					app.resetVariablesValueAfterArrowDeletion(arrows.newArrow.from.id)
					arrows.setStart({
						X: arrowStart().coordinates.X,
						Y: arrowStart().coordinates.Y
					})
					arrows.setFrom({
						region: arrowStart().region,
						parentId: arrowStart().parentId,
						id: arrowStart().variableId
					})
					app.setVariableData(
						arrowStart().region, 
						arrowStart().parentId, 
						arrowStart().variableId, 
						{name: "value", value: arrows.newArrow.to}
					)
				}
			} 
			else {
				arrows.stopDraggingArrow(app.diagram.heap, stackWidth, event, app.setVariableData)
			}
			arrows.setIsArrowDragged(false)
			arrows.setActiveDragHandle("")
			arrows.setDragged(arrows.newArrow.from.id, arrows.newArrow.to, false)
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

				// HIDE ARROWHEAD IF CURSOR DIDN'T MOVE A LOT
				const start = arrows.newArrow.coordinates.start
				const tolerance = 5
				if (clientX >= start.X-tolerance && 
					clientX <= start.X+tolerance && 
					clientY >= start.Y-tolerance && 
					clientY <= start.Y+tolerance)
				{
					arrows.setIsArrowHeadVisible(false)
				} else {
					arrows.setIsArrowHeadVisible(true)
				}
			}
		}
		if (isResizable && clientX >= STACK_MIN && clientX <= STACK_MAX) {
			const INPUT_WIDTH = utils.functions.getStackFrameInputWidth(clientX)
			arrows.updateArrowsOnStackResize(clientX, stackWidth, stackInputWidth, INPUT_WIDTH)
			setStackWidth(clientX)
			setStackInputWidth(INPUT_WIDTH)
		}
	}

	function handleKeyDown(event) {
		if (event.keyCode === 8 || event.keyCode === 46) {
			const filteredArrows = arrows.arrows.filter(arrow => {
				// check if arrow if present in selected arrows array
				const match = arrows.selectedArrows.find(selectedArrow => (
					arrow.from.id === selectedArrow.from.id && arrow.to === selectedArrow.to
				))
				if (match !== undefined) {
					app.resetVariablesValueAfterArrowDeletion(arrow.from.id)
					arrows.setSelectedArrows(selectedArrows => {
						return selectedArrows.filter(selectedArrow => (
							arrow.from.id !== selectedArrow.from.id || arrow.to !== selectedArrow.to
						))
					})
					return true
				} else {
					return false
				}
			})
			arrows.setArrows(filteredArrows)
		}
	}

	return (
		<div
			className="App"
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
			onKeyDown={handleKeyDown}
			style={
				isResizable ? 
				{cursor: "col-resize"} : 
				arrows.activeDragHandle !== "" ? 
					{cursor: "pointer"} : 
					null
			}
			tabIndex="-1"
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