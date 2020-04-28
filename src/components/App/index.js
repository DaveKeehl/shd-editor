import React, {useState, useRef, useEffect, useContext} from "react"
import Stack from "../Stack"
import Heap from "../Heap"
import Arrows from "../Arrows"
import {StateContext} from "../../contexts/stateContext"
import {ArrowsContext} from "../../contexts/arrowsContext"
import {ResizableStackContext} from "../../contexts/resizableStackContext"
import {HeapAddModeContextProvider} from "../../contexts/heapAddModeContext"
import {HeapMousePositionContextProvider} from "../../contexts/heapMousePositionContext"

function App() {
	const [diagram, setDiagram] = useState({})

	const app = useContext(StateContext)
	const {isArrowDragged, setIsArrowDragged, start, setEnd} = useContext(ArrowsContext)
	const {stackWidth, setStackWidth, isResizable, setIsResizable} = useContext(ResizableStackContext)

	const separator = useRef(null)

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
		if (isArrowDragged) {
			setIsArrowDragged(false)
			// If the mouse position is on a Heap Object variable, then draw the arrow
			if (app.isMouseOnHeapObject(event.clientX, event.clientY, stackWidth) === true) {
				setEnd({X: event.clientX, Y: event.clientY})
				console.log("Mouse is on object")
			}
			// Otherwise don't draw the arrow
			else {
				setEnd({X: start.X, Y: start.Y})
				console.log("Mouse is not on object")
			}
		}
	}

	function handleDoubleClick() {
		setStackWidth(360)
	}

	function handleMouseMove(event) {
		const {clientX,clientY} = event
		if (isArrowDragged) {
			console.log(`X: ${clientX}, Y: ${clientY}`)
		}
		if (isResizable && clientX >= 360 && clientX <= 500) {
			setStackWidth(clientX)
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