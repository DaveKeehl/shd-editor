import React from "react"
import Stack from "../Stack"
import Heap from "../Heap"
import {HeapAddModeContextProvider} from "../../contexts/heapAddModeContext"

function App() {
	return (
		<div className="App">
			<Stack />
			<div className="separator"></div>
			<HeapAddModeContextProvider>
				<Heap />
			</HeapAddModeContextProvider>
		</div>
	)
}

export default App