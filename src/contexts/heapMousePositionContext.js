import React, {useState} from "react"

const HeapMousePositionContext = React.createContext()

function HeapMousePositionContextProvider(props) {
	const [mousePosition, setMousePosition] = useState({X: "", Y: ""})

	return (
		<HeapMousePositionContext.Provider value={{mousePosition, setMousePosition}}>
			{props.children}
		</HeapMousePositionContext.Provider>
	)
}

export {HeapMousePositionContextProvider, HeapMousePositionContext}