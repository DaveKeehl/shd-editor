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
	const arrows = useContext(ArrowsContext)
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

		if (arrows.isArrowDragged) {
			arrows.setIsArrowDragged(false)
			const to = app.getArrowTargetData(event.clientX, event.clientY, stackWidth)
			console.log(to)
			if (to !== undefined) {
				arrows.setTo(to.id)

				const position = to.position
				console.log(`Position X: ${position.X}, Position Y: ${position.Y}`)
				const height = (
					153 +
					to.variables.length * 103 +
					(to.variables.length > 0 ? 31 : 0) +
					(to.variables.length > 1 ? 15 * (to.variables.length-1) : 0)
				)
				const width = 320
				const start = arrows.newArrow.coordinates.start
				const center = {
					X: stackWidth + 10 + 20 + position.X + width/2, 
					Y: 55 + 20 + position.Y + height/2
				}
				const end = arrows.computeIntersection(start, center, width, height)
				arrows.setEnd({
					// X: stackWidth + 10 + 20 + to.position.X, 
					// Y: 55 + 20 + to.position.Y + 101
					X: end.X,
					Y: end.Y
				})
				const {region, parentId, id} = arrows.newArrow.from
				app.setVariableData(region, parentId, id, { name: "value", value: to.id })
			}
			else {
				// console.log("fail")
				const {X,Y} = arrows.newArrow.coordinates.start
				arrows.setEnd({
					X: X, 
					Y: Y
				})
			}
		}
	}

	function handleDoubleClick() {
		setStackWidth(360)
	}

	function handleMouseMove(event) {
		const {clientX,clientY} = event
		if (arrows.isArrowDragged) {
			// console.log(`X: ${clientX}, Y: ${clientY}`)
			arrows.setEnd({X: clientX, Y: clientY})
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