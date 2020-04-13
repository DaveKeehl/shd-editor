import React, {useState} from "react"

const HeapSmartAddContext = React.createContext()

function HeapSmartAddProvider(props) {
	const [isSmartAddActive, setIsSmartAddActive] = useState(false)

	const toggleSmartAdd = () => {
		setIsSmartAddActive(prevState => !prevState)
	}

	return (
		<HeapSmartAddContext.Provider value={{isSmartAddActive, toggleSmartAdd}}>
			{props.children}
		</HeapSmartAddContext.Provider>
	)
}

export {HeapSmartAddProvider, HeapSmartAddContext}