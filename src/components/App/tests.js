import {useContext, useEffect} from "react"
import {StateContext} from "../../contexts/stateContext"

function Tests(props) {

	const app = useContext(StateContext)

	useEffect(() => {
		app.addStackFrame()
		app.addHeapObject({X:10,Y:20})
		app.addStackFrameVariable(0, "primitive")
		app.setStackFrameVariableName(0,0,"money")
		app.setStackFrameVariableType(0,0,"Int")
		app.setStackFrameVariablePrimitiveValue(0,0,5)
		app.addStackFrameVariable(0, "reference")
		app.setStackFrameName(0,"Person.call()")
	}, [])
	
	return null
}

export default Tests