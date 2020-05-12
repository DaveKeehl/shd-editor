import React, {useState} from "react"
import {utils} from "../utils"

const ResizableStackContext = React.createContext()

function ResizableStackContextProvider(props) {
	const [stackWidth, setStackWidth] = useState(utils.constants.STACK_MIN)
	const [stackInputWidth, setStackInputWidth] = useState(utils.constants.INPUT_MIN_WIDTH)
	const [isResizable, setIsResizable] = useState(false)

	const data = {
		stackWidth, 
		setStackWidth, 
		stackInputWidth,
		setStackInputWidth,
		isResizable, 
		setIsResizable
	}

	return (
		<ResizableStackContext.Provider value={data}>
			{props.children}
		</ResizableStackContext.Provider>
	)
}

export {ResizableStackContextProvider, ResizableStackContext}