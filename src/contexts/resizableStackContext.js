import React, {useState} from "react"

const ResizableStackContext = React.createContext()

function ResizableStackContextProvider(props) {
	const [stackWidth, setStackWidth] = useState(360)
	const [isResizable, setIsResizable] = useState(false)

	return (
		<ResizableStackContext.Provider value={{stackWidth, setStackWidth, isResizable, setIsResizable}}>
			{props.children}
		</ResizableStackContext.Provider>
	)
}

export {ResizableStackContextProvider, ResizableStackContext}