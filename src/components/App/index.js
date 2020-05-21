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

	const {STACK_MIN, STACK_MAX, INPUT_MIN_WIDTH} = utils.constants

	useEffect(() => {
		setDiagram(app.diagram)
		arrows.rebuildArrows(app.diagram, stackWidth)
	}, [app.diagram, utils.constants])

	function handleMouseDown() {
		setIsResizable(true)
		separator.current.style.background = "#c3c3c3"
	}

	function handleMouseUp(event) {
		setIsResizable(false)
		separator.current.style.background = "#F3F3F3"

		if (arrows.isArrowDragged) {
			
			arrows.setIsArrowDragged(false)
			const target = utils.functions.getHoveredHeapObject(app.diagram.heap, event.clientX, event.clientY, stackWidth)

			// CASE 1: START POINT IS IN THE HEAP, AND THE END POINT IS THE SAME OBJECT
			if (target !== undefined && arrows.newArrow.from.parentId === target.id) {
				const {region, parentId, id} = arrows.newArrow.from
				app.setVariableData(region, parentId, id, { name: "value", value: target.id })
			}
			// CASE 2: ARROW-END WAS RELEASED ON A HEAP OBJECT
			else if (target !== undefined) {
				const {region, parentId, id} = arrows.newArrow.from
				app.setVariableData(region, parentId, id, { name: "value", value: target.id })
			}
			// CASE 3: ARROW-END POSITION IS NOT VALID (IT SNAPS BACK TO ARROW-START POSITION)
			else {
				const {X,Y} = arrows.newArrow.coordinates.start
				arrows.setEnd({
					X: X, 
					Y: Y
				})
			}
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
			arrows.setEnd({X: clientX, Y: clientY})
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