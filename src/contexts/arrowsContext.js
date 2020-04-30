import React, {useState} from "react"

const ArrowsContext = React.createContext()

function ArrowsContextProvider(props) {
	const [stackScrollAmount, setStackScrollAmount] = useState(0)
	const [caller, setCaller] = useState({region: "", parentId: "", id: ""})
	const [isArrowDragged, setIsArrowDragged] = useState(false)
	const [start, setStart] = useState({X: "", Y: ""})
	const [end, setEnd] = useState({X: "", Y: ""})

	const states = {
		stackScrollAmount, 
		setStackScrollAmount,
		caller,
		setCaller,
		isArrowDragged,
		setIsArrowDragged,
		start,
		setStart,
		end,
		setEnd
	}

	return (
		<ArrowsContext.Provider value={states}>
			{props.children}
		</ArrowsContext.Provider>
	)
}

export {ArrowsContextProvider, ArrowsContext}