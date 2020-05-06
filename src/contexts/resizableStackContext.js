import React, {useState} from "react"
import {utils} from "../utils"

const ResizableStackContext = React.createContext()

function ResizableStackContextProvider(props) {
	const [stackWidth, setStackWidth] = useState(utils.constants.STACK_MIN)
	const [isResizable, setIsResizable] = useState(false)

	return (
		<ResizableStackContext.Provider value={{stackWidth, setStackWidth, isResizable, setIsResizable}}>
			{props.children}
		</ResizableStackContext.Provider>
	)
}

export {ResizableStackContextProvider, ResizableStackContext}