import React, {useState, useRef} from "react"
import Stack from "../Stack"
import Heap from "../Heap"
import {HeapAddModeContextProvider} from "../../contexts/heapAddModeContext"

function App() {
	const [isResizable, setIsResizable] = useState(false)
	const [stackWidth, setStackWidth] = useState(360)

	const separator = useRef(null)

	function handleMouseDown() {
		setIsResizable(true)
	}

	function handleMouseUp() {
		setIsResizable(false)
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
			<Stack />
			<div 
				className="separator" 
				ref={separator}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
			>
			</div>
			<HeapAddModeContextProvider>
				<Heap stackWidth={stackWidth} />
			</HeapAddModeContextProvider>
		</div>
	)
}

export default App