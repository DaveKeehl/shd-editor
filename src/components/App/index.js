import React, {useRef, useContext} from "react"
import Stack from "../Stack"
import Heap from "../Heap"
import {StateContextProvider} from "../../contexts/stateContext"
import {ResizableStackContext} from "../../contexts/resizableStackContext"
import {HeapAddModeContextProvider} from "../../contexts/heapAddModeContext"
import {HeapMousePositionContextProvider} from "../../contexts/heapMousePositionContext"

function App() {
	const {stackWidth, setStackWidth, isResizable, setIsResizable} = useContext(ResizableStackContext)

	const separator = useRef(null)

	function handleMouseDown() {
		setIsResizable(true)
		separator.current.style.background = "#c3c3c3"
	}

	function handleMouseUp() {
		setIsResizable(false)
		separator.current.style.background = "#F3F3F3"
	}

	function handleDoubleClick() {
		setStackWidth(360)
	}

	function handleMouseMove(event) {
		const {clientX} = event
		if (isResizable && clientX >= 360 && clientX <= 500) {
			setStackWidth(clientX)
		}
	}

	return (
		<div 
			className="App"
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
			style={{gridTemplateColumns: `${stackWidth}px min-content auto`}}
		>
			<StateContextProvider>
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
			</StateContextProvider>
		</div>
	)
}

export default App