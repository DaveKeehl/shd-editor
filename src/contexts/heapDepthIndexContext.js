import React, {useState} from "react"

const HeapDepthIndexContext = React.createContext()

function HeapDepthIndexContextProvider(props) {
	const [depthIndex, setDepthIndex] = useState(0)

	return (
		<HeapDepthIndexContext.Provider value={{depthIndex, setDepthIndex}}>
			{props.children}
		</HeapDepthIndexContext.Provider>
	)
}

export {HeapDepthIndexContextProvider, HeapDepthIndexContext}