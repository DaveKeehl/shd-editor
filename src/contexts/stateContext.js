import React, {useState} from "react"

const StateContext = React.createContext()

function StateContextProvider(props) {
	const [stack, setStack] = useState([])
	const [heap, setHeap] = useState([])
	const [count, setCount] = useState(0)

	let diagram = {stack, heap}

	// ADDERS, REMOVERS

	const addStackFrame = () => {
		console.log("Added new Stack Frame")
		const newStackFrame = {
			id: count,
			name: "",
			variables: []
		}
		setCount(prevState => prevState+1)
		setStack(prevState => [newStackFrame, ...prevState])
	}

	const addHeapObject = (initialPosition) => {
		console.log("Added new Heap Object")
		const newHeapObject = {
			id: count,
			name: "",
			variables: [],
			position: {
				X: initialPosition.X,
				Y: initialPosition.Y
			},
			isDragged: false,
			localDepthIndex: 0
		}
		setCount(prevState => prevState+1)
		setHeap(prevState => [newHeapObject, ...prevState])
	}

	const removeStackFrame = (stackFrameID) => {
		console.log(`Removed Stack Frame with ID ${stackFrameID}`)
		setStack(prevState => prevState.filter(frame => frame.id !== stackFrameID))
	}

	const removeHeapObject = (heapObjectID) => {
		console.log(`Removed Heap Object with ID ${heapObjectID}`)
		setHeap(prevState => prevState.filter(object => object.id !== heapObjectID))
	}

	const addStackFrameVariable = (stackFrameID, variableNature) => {
		const newVariable = {
			id: count,
			nature: variableNature,
			name: "",
			type: "",
			value: ""
		}
		setCount(prevState => prevState+1)
		setStack(prevState => prevState.map(frame => {
			if (frame.id === stackFrameID) {
				frame.variables = [...frame.variables, newVariable]
			}
			return frame
		}))
	}

	const addHeapObjectVariable = (heapObjectID, variableNature) => {
		const newVariable = {
			id: count,
			nature: variableNature,
			name: "",
			type: "",
			value: ""
		}
		setCount(prevState => prevState+1)
		setHeap(prevState => prevState.map(object => {
			if (object.id === heapObjectID) {
				object.variables = [...object.variables, newVariable]
			}
			return object
		}))
	}

	const removeStackFrameVariable = (stackFrameID, variableID) => {
		setStack(prevState => prevState.map(frame => {
			if (frame.id === stackFrameID) {
				frame.variables = frame.variables.filter(variable => variable.id !== variableID)
			}
			return frame
		}))
	}

	const removeHeapObjectVariable = (heapObjectID, variableID) => {
		setHeap(prevState => prevState.map(object => {
			if (object.id === heapObjectID) {
				object.variables = object.variables.filter(variable => variable.id !== variableID)
			}
			return object
		}))
	}

	// GETTERS

	const getStackFrames = () => {
		return stack
	}

	const getHeapObjects = () => {
		return heap
	}

	const getStackFrame = (stackFrameID) => {
		return stack.filter(frame => frame.id === stackFrameID)[0]
	}

	const getHeapObject = (heapObjectID) => {
		return this.state.heap.filter(heapObject => heapObject.id === heapObjectID)[0]
	}

	const getStackFrameVariable = (stackFrameID, variableID) => {
		const frame = stack.filter(frame => frame.id === stackFrameID)[0]
		return frame.variables.filter(variable => variable.id === variableID)[0]
	}

	const getHeapObjectVariable = (heapObjectID, variableID) => {
		const object = heap.filter(object => object.id === heapObjectID)[0]
		return object.variables.filter(variable => variable.id === variableID)[0]
	}

	// SETTERS

	const setStackFrameName = (stackFrameID, newName) => {
		setStack(prevState => prevState.map(frame => {
			if (frame.id === stackFrameID) {
				frame.name = newName
			}
			return frame	
		}))
	}

	const setHeapObjectName = (heapObjectID, newName) => {
		setHeap(prevState => prevState.map(object => {
			if (object.id === heapObjectID) {
				object.name = newName
			}
			return object	
		}))
	}

	const setStackFrameVariableName = (stackFrameID, variableID, newName) => {
		setStack(prevState => prevState.map(frame => {
			if (frame.id === stackFrameID) {
				frame.variables = frame.variables.map(variable => {
					if (variable.id === variableID) {
						variable.name = newName
					}
					return variable
				})
			}
			return frame
		}))
	}

	const setHeapObjectVariableName = (heapObjectID, variableID, newName) => {
		setHeap(prevState => prevState.map(object => {
			if (object.id === heapObjectID) {
				object.variables = object.variables.map(variable => {
					if (variable.id === variableID) {
						variable.name = newName
					}
					return variable
				})
			}
			return object
		}))
	}

	const setStackFrameVariableType = (stackFrameID, variableID, newType) => {
		setStack(prevState => prevState.map(frame => {
			if (frame.id === stackFrameID) {
				frame.variables = frame.variables.map(variable => {
					if (variable.id === variableID) {
						variable.type = newType
					}
					return variable
				})
			}
			return frame
		}))
	}

	const setHeapObjectVariableType = (heapObjectID, variableID, newType) => {
		setHeap(prevState => prevState.map(object => {
			if (object.id === heapObjectID) {
				object.variables = object.variables.map(variable => {
					if (variable.id === variableID) {
						variable.type = newType
					}
					return variable
				})
			}
			return object
		}))
	}

	const setStackFrameVariablePrimitiveValue = (stackFrameID, variableID, newPrimVal) => {
		setStack(prevState => prevState.map(frame => {
			if (frame.id === stackFrameID) {
				frame.variables = frame.variables.map(variable => {
					if (variable.id === variableID && variable.nature === "primitive") {
						variable.value = newPrimVal
					}
					return variable
				})
			}
			return frame
		}))
	}

	const setStackFrameVariableReferenceValue = (stackFrameID, variableID, newRefVal) => {
		setStack(prevState => prevState.map(frame => {
			if (frame.id === stackFrameID) {
				frame.variables = frame.variables.map(variable => {
					if (variable.id === variableID && variable.nature === "reference") {
						variable.value = newRefVal
					}
					return variable
				})
			}
			return frame
		}))
	}

	const setHeapObjectVariablePrimitiveValue = (heapObjectID, variableID, newPrimVal) => {
		setHeap(prevState => prevState.map(object => {
			if (object.id === heapObjectID) {
				object.variables = object.variables.map(variable => {
					if (variable.id === variableID && variable.nature === "primitive") {
						variable.value = newPrimVal
					}
					return variable
				})
			}
			return object
		}))
	}

	const setHeapObjectVariableReferenceValue = (heapObjectID, variableID, newRefVal) => {
		setHeap(prevState => prevState.map(object => {
			if (object.id === heapObjectID) {
				object.variables = object.variables.map(variable => {
					if (variable.id === variableID && variable.nature === "reference") {
						variable.value = newRefVal
					}
					return variable
				})
			}
			return object
		}))
	}

	// CLEANUP

	const clearConnections = () => {
		setStack(prevState => prevState.map(frame => {
			frame.variables = frame.variables.map(variable => {
				if (variable.nature === "reference") {
					variable.value = ""
				}
				return variable
			})
			return frame
		}))
		setHeap(prevState => prevState.map(object => {
			object.variables = object.variables.map(variable => {
				if (variable.nature === "reference") {
					variable.value = ""
				}
				return variable
			})
			return object
		}))
	}

	const clearStack = () => {
		console.log("Removed all Stack Frames")
		setStack([])
	}

	const clearHeap = () => {
		console.log("Removed all Heap Objects")
		setHeap([])
	}

	const clearAll = () => {
		clearStack()
		clearHeap()
	}

	// UPLOAD, DOWNLOAD

	const uploadJSON = (file) => {
		const JSON = file.parse()
	}

	const downloadJSON = (filename = "diagram") => {
		const json = JSON.stringify(diagram, null, 4)
		const data = "data:text/json;charset=utf-8," + encodeURIComponent(json)
		var downloadable = document.createElement('a')
		downloadable.setAttribute("href", data)
		downloadable.setAttribute("download", filename + ".json")
		document.body.appendChild(downloadable) // required for firefox
		downloadable.click()
		downloadable.remove()
	}

	// APPLICATION STATE OBJECT
	
	const data = {
		diagram,

		count,

		addStackFrame,
		addHeapObject,

		removeStackFrame,
		removeHeapObject,

		addStackFrameVariable,
		addHeapObjectVariable,

		removeStackFrameVariable,
		removeHeapObjectVariable,

		getStackFrames,
		getHeapObjects,

		getStackFrame,
		getHeapObject,

		getStackFrameVariable,
		getHeapObjectVariable,

		setStackFrameName,
		setHeapObjectName,

		setStackFrameVariableName,
		setHeapObjectVariableName,

		setStackFrameVariableType,
		setHeapObjectVariableType,

		setStackFrameVariablePrimitiveValue,
		setHeapObjectVariablePrimitiveValue,

		setStackFrameVariableReferenceValue,
		setHeapObjectVariableReferenceValue,

		clearConnections,
		clearStack,
		clearHeap,
		clearAll,

		uploadJSON,
		downloadJSON
	}

	return (
		<StateContext.Provider value={data}>
			{props.children}
		</StateContext.Provider>
	)
}

export {StateContextProvider, StateContext}