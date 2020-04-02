import React, { useState } from "react"
import Region from "../Region"

function App() {
	const [isResizable, setIsResizable] = useState(false)
	const [stackWidth, setStackWidth] = useState(360)

	function handleDoubleClick() {
		setStackWidth(360)
	}

	function handleMouseDown(event) {
		setIsResizable(true)
		console.log(`down --> isResizable: ${isResizable}`)
	}

	function handleMouseUp(event) {
		setIsResizable(false)
		console.log(`up   --> isResizable: ${isResizable}`)
	}

	function handleMouseMove(event) {
		if (isResizable) {
			if (event.clientX >= 360 && event.clientX < window.innerWidth/2) {
				setStackWidth(event.clientX)
				console.log(`isResizable: ${isResizable}`)
				// console.log(`X coordinate: ${event.clientX}`)
			}
		} else {
			console.log(`isResizable: ${isResizable}`)
		}
	}

	return (
		<div 
			className="App"
			onMouseMove={handleMouseMove} 
			onMouseUp={handleMouseUp} 
			draggable={false}
			style={{gridTemplateColumns: `${stackWidth >= 360 ? stackWidth : 360}px min-content auto`}}
		>
			<Region name="stack" stackWidth={stackWidth}/>
			<div 
				className="separator"
				onDoubleClick={handleDoubleClick}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				draggable={false}
			>
			</div>
			<Region name="heap" />
		</div>
	)
}

export default App