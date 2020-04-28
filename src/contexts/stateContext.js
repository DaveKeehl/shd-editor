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
			// isDragged: false,
			depthIndex: 0
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
		return stack.find(frame => frame.id === stackFrameID)
	}

	const getHeapObject = (heapObjectID) => {
		return heap.find(heapObject => heapObject.id === heapObjectID)
	}

	const getStackFrameVariable = (stackFrameID, variableID) => {
		const frame = stack.find(frame => frame.id === stackFrameID)
		return frame.variables.find(variable => variable.id === variableID)
	}

	const getHeapObjectVariable = (heapObjectID, variableID) => {
		const object = heap.find(object => object.id === heapObjectID)
		return object.variables.find(variable => variable.id === variableID)
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

	const setVariableData = (region, parentID, variableID, newData) => {
		if (region === "stack") {
			setStack(prevState => prevState.map(frame => {
				if (frame.id === parentID) {
					frame.variables = frame.variables.map(variable => {
						if (variable.id === variableID) {
							const {name,value} = newData
							variable[name] = value
						}
						return variable
					})
				}
				return frame
			}))
		}
		else if (region === "heap") {
			setHeap(prevState => prevState.map(object => {
				if (object.id === parentID) {
					object.variables = object.variables.map(variable => {
						if (variable.id === variableID) {
							const {name,value} = newData
							variable[name] = value
						}
						return variable
					})
				}
				return object
			}))
		}
	}

	const setHeapObjectPosition = (heapObjectID, newPosition) => {
		setHeap(prevState => prevState.map(object => {
			if (object.id === heapObjectID) {
				object.position = newPosition
			}
			return object
		}))
	}

	const setHeapObjectDepthIndex = (heapObjectID, newDepthIndex) => {
		setHeap(prevState => prevState.map(object => {
			if (object.id === heapObjectID) {
				object.depthIndex = newDepthIndex
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
		
		// clearAll()
		// updateStack(file.stack)
		// updateHeap(file.heap)
		// convertStackToJSX()
		// convertHeapToJSX()
		
		
		// const JSON = file.parse()

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

	// FUNCTIONS RELATED TO ARROWS
	
	const isMouseOnHeapObject = (mouseX, mouseY, stackWidth) => {

		let leftLimit = stackWidth + 20
		let topLimit = 55 + 20

		const foundObject = heap.find(object => {

			const {X,Y} = object.position
			const height = 153 + object.variables.length * 103 + (object.variables.length > 0 ? 31 : 0) + (object.variables.length > 1 ? 15 * (object.variables.length-1) : 0)
			const width = 320

			if (mouseX >= leftLimit+X && mouseX <= leftLimit+X+width && mouseY >= topLimit+Y && mouseY <= topLimit+Y+height) {
				console.log("Mouse is inside current analyzed object")
				leftLimit = leftLimit + X
				topLimit = topLimit + Y

				const foundVariable = object.variables.find(variable => {

					const idx = object.variables.indexOf(variable)
					const start = topLimit + 20 + 27 + 39 + 15 + (103 + 15) * idx
					const end = start + 103
					console.log(`start (X): ${start}, end (Y): ${end}`)
					console.log(`mouseX: ${mouseX}, mouseY: ${mouseY}`)


					// Check if mouse is inside the current analyzed variable
					if (object.variables.length > 0 && mouseX >= leftLimit+30 && mouseX <= leftLimit+width-30 && mouseY >= start && mouseY <= end) {
						console.log("Mouse is inside current analyzed variable")
						console.log(idx)
						return true
					} else {
						console.log("Mouse is outside current analyzed variable")
						return false
					}

				})
			} else {
				console.log("Mouse is outside current analyzed object")
				return false
			}
		})

		if (foundObject !== undefined) {
			console.log(foundObject)
			return true
		} else {
			return false
		}
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

		setVariableData,

		setHeapObjectPosition,
		setHeapObjectDepthIndex,

		clearConnections,
		clearStack,
		clearHeap,
		clearAll,

		uploadJSON,
		downloadJSON,

		isMouseOnHeapObject
	}

	return (
		<StateContext.Provider value={data}>
			{props.children}
		</StateContext.Provider>
	)
}

export {StateContextProvider, StateContext}