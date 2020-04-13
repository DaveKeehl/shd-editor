import React, {useState} from "react"

const HeapAddModeContext = React.createContext()

function HeapAddModeContextProvider(props) {
	const [isAddModeActive, setIsAddModeActive] = useState(false)

	function toggleAddMode() {
		setIsAddModeActive(prevState => !prevState)
	}

	return (
		<HeapAddModeContext.Provider value={{isAddModeActive, toggleAddMode}}>
			{props.children}
		</HeapAddModeContext.Provider>
	)
}

export {HeapAddModeContextProvider, HeapAddModeContext}