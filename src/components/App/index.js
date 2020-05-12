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
			setIsResizable} = useContext(ResizableStackContext)
	
	const separator = useRef(null)

	const {STACK_MIN, STACK_MAX, INPUT_MIN_WIDTH} = utils.constants
	const {getStackFrameVariableWidth, getStackFrameInputWidth} = utils.functions

	useEffect(() => {
		setDiagram(app.diagram)
	}, [app.diagram])

	function handleMouseDown() {
		setIsResizable(true)
		separator.current.style.background = "#c3c3c3"
	}

	function handleMouseUp(event) {
		setIsResizable(false)
		separator.current.style.background = "#F3F3F3"

		if (arrows.isArrowDragged) {
			
			arrows.setIsArrowDragged(false)
			const target = app.getHoveredHeapObject(event.clientX, event.clientY, stackWidth)

			// CASE 1: START POINT IS IN THE HEAP, AND THE END POINT IS THE SAME OBJECT
			if (target !== undefined && arrows.newArrow.from.parentId === target.id) {

				arrows.setExactHeapEndPosition("loop", stackWidth, target, event.clientY)

				const {region, parentId, id} = arrows.newArrow.from
				app.setVariableData(region, parentId, id, { name: "value", value: target.id })

			}
			// CASE 2: ARROW-END WAS RELEASED ON A HEAP OBJECT
			else if (target !== undefined) {

				arrows.setExactHeapEndPosition("intersection", stackWidth, target)

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

	function handleDoubleClick(event) {
		setStackWidth(STACK_MIN)

		const VAR_WIDTH = getStackFrameVariableWidth(stackWidth)
		const INPUT_WIDTH = getStackFrameInputWidth(VAR_WIDTH)

		const resizeOffset = stackWidth - STACK_MIN
		const inputOffset = INPUT_WIDTH - INPUT_MIN_WIDTH
		
		const updatedArrows = arrows.arrows.map(arrow => {
			if (arrow.from.region === "stack") {
				arrow.coordinates.start.X = arrow.coordinates.start.X - resizeOffset + inputOffset/2
				arrow.coordinates.end.X = arrow.coordinates.end.X - resizeOffset
			}
			return arrow
		})
		arrows.setArrows(updatedArrows)
		setStackInputWidth(INPUT_MIN_WIDTH)
	}

	function handleMouseMove(event) {
		const {clientX, clientY} = event

		if (arrows.isArrowDragged) {
			arrows.setEnd({X: clientX, Y: clientY})
		}

		if (isResizable && clientX >= STACK_MIN && clientX <= STACK_MAX) {

			const VAR_WIDTH = getStackFrameVariableWidth(clientX)
			const INPUT_WIDTH = getStackFrameInputWidth(VAR_WIDTH)

			const resizeOffset = clientX - stackWidth
			const inputOffset = INPUT_WIDTH - stackInputWidth

			const updatedArrows = arrows.arrows.map(arrow => {
				if (arrow.from.region === "stack") {
					arrow.coordinates.start.X = arrow.coordinates.start.X + resizeOffset - (inputOffset/2)
					arrow.coordinates.end.X = arrow.coordinates.end.X + resizeOffset
				}
				return arrow
			})
			arrows.setArrows(updatedArrows)
			
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

export default App