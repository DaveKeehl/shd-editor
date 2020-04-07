import React, { useState, useRef } from "react"
import Region from "../Region"

function App() {
	const [isResizable, setIsResizable] = useState(false)
	const [stackWidth, setStackWidth] = useState(360)

	const separator = useRef(null)

	function handleDoubleClick() {
		setStackWidth(360)
		separator.current.style.background = "#F3F3F3"
	}

	function handleMouseDown(event) {
		setIsResizable(true)
		separator.current.style.background = "#c3c3c3"
	}

	function handleMouseUp(event) {
		setIsResizable(false)
		separator.current.style.background = "#F3F3F3"
	}

	function handleMouseMove(event) {
		const minWidth = 360
		const maxWidth = 500
		if (isResizable) {
			if (event.clientX >= minWidth && event.clientX <= maxWidth) {
				setStackWidth(event.clientX)
			}
		}
	}

	return (
		<div 
			className="App"
			onMouseMove={handleMouseMove} 
			onMouseUp={handleMouseUp} 
			draggable={false}
			style={{gridTemplateColumns: `${stackWidth}px min-content auto`}}
		>
			<Region name="stack" />
			<div 
				className="separator"
				onDoubleClick={handleDoubleClick}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				draggable={false}
				ref={separator}
			>
			</div>
			<Region name="heap" stackWidth={stackWidth} />
		</div>
	)
}

export default App