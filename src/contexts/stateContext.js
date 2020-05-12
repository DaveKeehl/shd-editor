import React, {useState} from "react"
import {utils} from "../utils"

const StateContext = React.createContext()

const { HEADER_HEIGHT, 
		REGION_PADDING, 
		BLOCK_WIDTH, 
		BLOCK_PADDING,
		BLOCK_HEADER_HEIGHT,
		BLOCK_MARGIN_BOTTOM,
		FRAME_MIN_HEIGHT,
		OBJECT_MIN_HEIGHT, 
		VAR_HEIGHT, 
		VAR_VERTICAL_MARGIN } = utils.constants

const {getBlockHeight} = utils.functions

function StateContextProvider(props) {
	const [stack, setStack] = useState([])
	const [heap, setHeap] = useState([])
	const [count, setCount] = useState(0)

	let diagram = {stack, heap}

	// ADDERS, REMOVERS

	const addStackFrame = () => {
		// console.log("Added new Stack Frame")
		const newStackFrame = {
			id: count,
			name: "",
			variables: []
		}
		setCount(prevState => prevState+1)
		setStack(prevState => [newStackFrame, ...prevState])
	}

	const addHeapObject = (initialPosition) => {
		// console.log("Added new Heap Object")
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
		// console.log(`Removed Stack Frame with ID ${stackFrameID}`)
		setStack(prevState => prevState.filter(frame => frame.id !== stackFrameID))
	}

	const removeHeapObject = (heapObjectID) => {
		// console.log(`Removed Heap Object with ID ${heapObjectID}`)
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

	const getParent = (variableID) => {
		let parent = ""
		stack.forEach(frame => {
			frame.variables.forEach(variable => {
				if (variable.id === variableID) {
					parent = frame
				}
			})
		})
		heap.forEach(object => {
			object.variables.forEach(variable => {
				if (variable.id === variableID) {
					parent = object
				}
			})
		})
		return parent
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

	function getHoveredStackData(stackScrollAmount, mouseY) {
		const virtualY = stackScrollAmount + mouseY - HEADER_HEIGHT
		let accumulator = REGION_PADDING

		for (const frame of stack) {

			let startY = accumulator
			let endY = startY + getBlockHeight(frame)

			if (virtualY >= startY && virtualY <= endY) {

				let varAccumulator = startY + BLOCK_PADDING + BLOCK_HEADER_HEIGHT + VAR_VERTICAL_MARGIN

				for (const variable of frame.variables) {

					let varStartY = varAccumulator
					let varEndY = varStartY + VAR_HEIGHT

					if (virtualY >= varStartY && virtualY <= varEndY) {

						const result = {
							variable: variable,
							parent: frame
						}
						console.log(result)
						return result

						break

					} else {
						varAccumulator = (varEndY + VAR_VERTICAL_MARGIN)
					}
				}

				break
				
			} else {
				accumulator = (endY + BLOCK_MARGIN_BOTTOM)
			}
		}
	}

	const getHoveredHeapObject = (mouseX, mouseY, stackWidth) => {

		let leftLimit = stackWidth + REGION_PADDING
		let topLimit = HEADER_HEIGHT + REGION_PADDING

		// Returns the object on which the mouse is over
		const foundObject = heap.find(object => {
			const {X,Y} = object.position
			const height = getBlockHeight(object)

			// Check if mouse is inside current analyzed object
			if (
				(mouseX >= leftLimit + X) && 
				(mouseX <= leftLimit + X + BLOCK_WIDTH) && 
				(mouseY >= topLimit + Y) && 
				(mouseY <= topLimit + Y + height)
			) {
				return true
			}
			return false
		})

		return foundObject
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

		getParent,

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

		getHoveredStackData,
		getHoveredHeapObject
	}

	return (
		<StateContext.Provider value={data}>
			{props.children}
		</StateContext.Provider>
	)
}

export {StateContextProvider, StateContext}