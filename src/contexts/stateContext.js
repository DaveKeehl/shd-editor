import React, {Component} from "react"

const StateContext = React.createContext()

class StateContextProvider extends Component {
	state = {
		stack: [],
		heap: []
	}

	addStackFrame = () => {
		const newStackFrame = {
			id: this.state.stack.length,
			name: "",
			count: 0,
			variables: []
		}
		
		this.setState(prevState => {
			return {

				stack: prevState
			}
		})
	}

	addHeapObject = (initialPosition) => {
		const newHeapObject = {
			id: this.state.heap.length,
			name: "",
			count: 0,
			variables: [],
			position: {
				X: initialPosition.X,
				Y: initialPosition.Y
			},
			isDragged: false,
			localDepthIndex: 0
		}
	}

	removeStackFrame = () => {
	}

	removeHeapObject = () => {
	}

	renameStackFrame = () => {
	}

	renameHeapObject = () => {
	}

	addStackFramePrimitiveVariable = () => {
	}

	addStackFrameReferenceVariable = () => {
	}

	addHeapObjectPrimitiveVariable = () => {
	}

	addHeapObjectReferenceVariable = () => {
	}

	removeStackFramePrimitiveVariable = () => {
	}

	removeStackFrameReferenceVariable = () => {
	}

	removeHeapObjectPrimitiveVariable = () => {
	}

	removeHeapObjectReferenceVariable = () => {
	}

	modifyVariableName = () => {
	}

	modifyVariableType = () => {
	}

	modifyVariableValue = () => {
	}

	addConnection = () => {
	}

	removeConnection = () => {
	}

	clearConnections = () => {
	}

	getStackFrame = (stackFrameID) => {
		return this.state.stack.filter(stackFrame => stackFrame.id === stackFrameID)
	}

	getHeapObject = (heapObjectID) => {
		return this.state.heap.filter(heapObject => heapObject.id === heapObjectID)
	}

	getStackFrames = () => {
	}

	getHeapObjects = () => {
	}

	clearStack = () => {
		this.setState({stack: []})
	}

	clearHeap = () => {
		this.setState({heaps: []})
	}

	clearApp = () => {
		this.clearStack()
		this.clearHeap()
	}

	uploadJSON = (file) => {
	}

	downloadJSON = () => {
	}
	
	render() {
		const data = {}
		return (
			<StateContext.Provider value={data}>
				{this.props.children}
			</StateContext.Provider>
		)
	}
}

export {StateContextProvider, StateContext}