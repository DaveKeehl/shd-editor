import React, { useState } from "react"

const StateContext = React.createContext()

function StateContextProvider(props) {
	const [stack, setStack] = useState([])
	const [heap, setHeap] = useState([])
	const [count, setCount] = useState(0)

	let diagram = { stack, heap }

	// ADDERS, REMOVERS

	const addStackFrame = () => {
		// console.log("Added new Stack Frame")
		const newStackFrame = {
			id: count,
			name: "",
			variables: []
		}
		setCount((prevState) => prevState + 1)
		setStack((prevState) => [newStackFrame, ...prevState])
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
		setCount((prevState) => prevState + 1)
		setHeap((prevState) => [newHeapObject, ...prevState])
	}

	const removeStackFrame = (stackFrameID) => {
		// console.log(`Removed Stack Frame with ID ${stackFrameID}`)
		setStack((prevState) =>
			prevState.filter((frame) => frame.id !== stackFrameID)
		)
	}

	const removeHeapObject = (heapObjectID) => {
		// console.log(`Removed Heap Object with ID ${heapObjectID}`)
		setHeap((prevState) =>
			prevState.filter((object) => object.id !== heapObjectID)
		)
	}

	const addStackFrameVariable = (stackFrameID, variableNature) => {
		const newVariable = {
			id: count,
			nature: variableNature,
			name: "",
			type: "",
			value: ""
		}
		setCount((prevState) => prevState + 1)
		setStack((prevState) =>
			prevState.map((frame) => {
				if (frame.id === stackFrameID) {
					frame.variables = [...frame.variables, newVariable]
				}
				return frame
			})
		)
	}

	const addHeapObjectVariable = (heapObjectID, variableNature) => {
		const newVariable = {
			id: count,
			nature: variableNature,
			name: "",
			type: "",
			value: ""
		}
		setCount((prevState) => prevState + 1)
		setHeap((prevState) =>
			prevState.map((object) => {
				if (object.id === heapObjectID) {
					object.variables = [...object.variables, newVariable]
				}
				return object
			})
		)
	}

	const removeStackFrameVariable = (stackFrameID, variableID) => {
		setStack((prevState) =>
			prevState.map((frame) => {
				if (frame.id === stackFrameID) {
					frame.variables = frame.variables.filter(
						(variable) => variable.id !== variableID
					)
				}
				return frame
			})
		)
	}

	const removeHeapObjectVariable = (heapObjectID, variableID) => {
		setHeap((prevState) =>
			prevState.map((object) => {
				if (object.id === heapObjectID) {
					object.variables = object.variables.filter(
						(variable) => variable.id !== variableID
					)
				}
				return object
			})
		)
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
		stack.forEach((frame) => {
			frame.variables.forEach((variable) => {
				if (variable.id === variableID) {
					parent = frame
				}
			})
		})
		heap.forEach((object) => {
			object.variables.forEach((variable) => {
				if (variable.id === variableID) {
					parent = object
				}
			})
		})
		return parent
	}

	const getStackFrame = (stackFrameID) => {
		return stack.find((frame) => frame.id === stackFrameID)
	}

	const getHeapObject = (heapObjectID) => {
		return heap.find((heapObject) => heapObject.id === heapObjectID)
	}

	const getStackFrameVariable = (stackFrameID, variableID) => {
		const frame = stack.find((frame) => frame.id === stackFrameID)
		return frame.variables.find((variable) => variable.id === variableID)
	}

	const getHeapObjectVariable = (heapObjectID, variableID) => {
		const object = heap.find((object) => object.id === heapObjectID)
		return object.variables.find((variable) => variable.id === variableID)
	}

	// SETTERS

	const setStackFrameName = (stackFrameID, newName) => {
		setStack((prevState) =>
			prevState.map((frame) => {
				if (frame.id === stackFrameID) {
					frame.name = newName
				}
				return frame
			})
		)
	}

	const setHeapObjectName = (heapObjectID, newName) => {
		setHeap((prevState) =>
			prevState.map((object) => {
				if (object.id === heapObjectID) {
					object.name = newName
				}
				return object
			})
		)
	}

	const setVariableData = (region, parentID, variableID, newData) => {
		if (region === "stack") {
			setStack((prevState) =>
				prevState.map((frame) => {
					if (frame.id === parentID) {
						frame.variables = frame.variables.map((variable) => {
							if (variable.id === variableID) {
								const { name, value } = newData
								variable[name] = value
							}
							return variable
						})
					}
					return frame
				})
			)
		} else if (region === "heap") {
			setHeap((prevState) =>
				prevState.map((object) => {
					if (object.id === parentID) {
						object.variables = object.variables.map((variable) => {
							if (variable.id === variableID) {
								const { name, value } = newData
								variable[name] = value
							}
							return variable
						})
					}
					return object
				})
			)
		}
	}

	const setHeapObjectPosition = (heapObjectID, newPosition) => {
		setHeap((prevState) =>
			prevState.map((object) => {
				if (object.id === heapObjectID) {
					object.position = newPosition
				}
				return object
			})
		)
	}

	const setHeapObjectDepthIndex = (heapObjectID, newDepthIndex) => {
		setHeap((prevState) =>
			prevState.map((object) => {
				if (object.id === heapObjectID) {
					object.depthIndex = newDepthIndex
				}
				return object
			})
		)
	}

	// CLEANUP

	const clearConnections = (setSelectedArrows) => {
		setStack((prevState) =>
			prevState.map((frame) => {
				frame.variables = frame.variables.map((variable) => {
					if (variable.nature === "reference") {
						variable.value = ""
					}
					return variable
				})
				return frame
			})
		)
		setHeap((prevState) =>
			prevState.map((object) => {
				object.variables = object.variables.map((variable) => {
					if (variable.nature === "reference") {
						variable.value = ""
					}
					return variable
				})
				return object
			})
		)
		if (setSelectedArrows !== undefined) {
			setSelectedArrows([])
		}
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

	const resetVariablesValueAfterArrowDeletion = (targetID) => {
		stack.forEach((frame) => {
			frame.variables.forEach((variable) => {
				if (
					variable.nature === "reference" &&
					(variable.id === targetID || variable.value === targetID)
				) {
					setVariableData("stack", frame.id, variable.id, {
						name: "value",
						value: ""
					})
				}
			})
		})
		heap.forEach((object) => {
			object.variables.forEach((variable) => {
				if (
					variable.nature === "reference" &&
					(variable.id === targetID || variable.value === targetID)
				) {
					setVariableData("heap", object.id, variable.id, {
						name: "value",
						value: ""
					})
				}
			})
		})
	}

	// UPLOAD, DOWNLOAD

	const isDiagramValid = (diagram) => {
		const { stack, heap } = diagram
		if (!Array.isArray(stack) || !Array.isArray(heap)) {
			return false
		}
		let ids = []
		const isElementUnique = (blockId) =>
			ids.find((id) => id === blockId) === undefined
		let isValid = true

		for (let i = 0; i < stack.length; i++) {
			// 1. CHECK IF FRAME HAS ALL THE EXPECTED FIELDS
			const frame = stack[i]
			if (
				frame.id !== undefined &&
				frame.name !== undefined &&
				frame.variables !== undefined
			) {
				// 2. CHECK IF FIELDS HAVE EXPECTED TYPES
				if (
					typeof frame.id === "number" &&
					typeof frame.name === "string" &&
					Array.isArray(frame.variables)
				) {
					// 3. CHECK IF ELEMENT ID IS UNIQUE
					if (isElementUnique(frame.id)) {
						// ALL GOOD, ADD ID TO ARRAY
						ids.push(frame.id)

						// CHECK EVERY VARIBLE!
						for (let j = 0; j < frame.variables.length; j++) {
							const variable = frame.variables[j]
							const {id, nature, name, type, value} = variable
							// 1. CHECK IF VARIABLE HAS ALL THE EXPECTED FIELDS
							if (
								id !== undefined &&
								nature !== undefined &&
								name !== undefined &&
								type !== undefined &&
								value !== undefined
							) {
								// 2. CHECK IF FIELDS HAVE EXPECTED TYPES
								if (
									typeof id === "number" && 
									typeof nature === "string" && 
									typeof name === "string" && 
									typeof type === "string"
								) {
									// 3. CHECK IF VARIABLE VALUES TYPES ARE LEGAL
									if (
										(nature === "reference" && typeof value === "number" && heap.find(object => object.id === id) !== undefined) || 
										(nature === "primitive" && typeof value === "string")
									) {
										// 4. CHECK IF ELEMENT ID IS UNIQUE
										if (isElementUnique(variable.id)) {
											ids.push(variable.id)
										} else {
											isValid = false
										}
									} else {
										isValid = false
									}
								} else {
									isValid = false
								}
							}
							if (!isValid) {
								break
							}
						}
					} else {
						isValid = false
					}
				} else {
					isValid = false
				}
			} else {
				isValid = false
			}
			if (!isValid) {
				break
			}
		}

		if (!isValid) {
			return false
		}

		for (let i = 0; i < heap.length; i++) {
			// 1. CHECK IF OBJECT HAS ALL THE EXPECTED FIELDS
			const object = heap[i]
			if (
				object.id !== undefined &&
				object.name !== undefined &&
				object.variables !== undefined &&
				object.position !== undefined &&
				object.depthIndex !== undefined
			) {
				// 2. CHECK IF FIELDS HAVE EXPECTED TYPES
				if (
					typeof object.id === "number" &&
					typeof object.name === "string" &&
					Array.isArray(object.variables) &&
					object.position.X !== undefined &&
					object.position.Y !== undefined &&
					typeof object.position === "object" &&
					typeof object.position.X === "number" &&
					typeof object.position.Y === "number" &&
					object.position.X >= 0 &&
					object.position.Y >= 0 &&
					typeof object.depthIndex === "number"
				) {
					// 3. CHECK IF ELEMENT ID IS UNIQUE
					if (isElementUnique(object.id)) {
						// ALL GOOD, ADD ID TO ARRAY
						ids.push(object.id)

						// CHECK EVERY VARIBLE!
						for (let j = 0; j < object.variables.length; j++) {
							const variable = object.variables[j]
							const {id, nature, name, type, value} = variable
							// 1. CHECK IF VARIABLE HAS ALL THE EXPECTED FIELDS
							if (
								id !== undefined &&
								nature !== undefined &&
								name !== undefined &&
								type !== undefined &&
								value !== undefined
							) {
								// 2. CHECK IF FIELDS HAVE EXPECTED TYPES
								if (
									typeof id === "number" && 
									typeof nature === "string" && 
									typeof name === "string" && 
									typeof type === "string"
								) {
									// 3. CHECK IF VARIABLE VALUES TYPES ARE LEGAL
									if (
										(nature === "reference" && typeof value === "number" && heap.find(object => object.id === id) !== undefined) || 
										(nature === "primitive" && typeof value === "string")
									) {
										// 4. CHECK IF ELEMENT ID IS UNIQUE
										if (isElementUnique(variable.id)) {
											ids.push(variable.id)
										} else {
											isValid = false
										}
									} else {
										isValid = false
									}
								} else {
									isValid = false
								}
							}
							if (!isValid) {
								break
							}
						}
					} else {
						isValid = false
					}
				} else {
					isValid = false
				}
			} else {
				isValid = false
			}
			if (!isValid) {
				break
			}
		}

		return isValid
	}

	const uploadJSON = (file) => {
		clearAll()
		const reader = new FileReader()
		reader.onload = (e) => {
			try {
				const json = JSON.parse(e.target.result)
				if (isDiagramValid(json)) {
					setStack(json.stack)
					setHeap(json.heap)
				} else {
					alert(
						"The diagram contained in the JSON file you have uploaded presents some errors. Check for the following things:\n\n" +
							'1. Does the diagram has an array called "stack" and an array called "heap"?\n' +
							"2. Does every stack frame and heap object have the right data in it?\n" +
							"3. Are the data types correct?\n" +
							"4. Does every stack frame, heap object and variable have a unique id?\n"+
							"5. Does every reference variable contains as value the id of an existing heap object?"
					)
				}
			} catch (ex) {
				alert("Only JSON files are supported.")
			}
		}
		// reader.onprogress = (event) => {
		// 	if (event.loaded && event.total) {
		// 		const percent = (event.loaded / event.total) * 100
		// 		console.log(`Progress: ${Math.round(percent)}`)
		// 	}
		// }
		reader.readAsText(file)
	}

	const downloadJSON = (filename = "diagram") => {
		const json = JSON.stringify(diagram, null, 4)
		const data = "data:text/json;charset=utf-8," + encodeURIComponent(json)
		var downloadable = document.createElement("a")
		downloadable.setAttribute("href", data)
		downloadable.setAttribute("download", filename + ".json")
		document.body.appendChild(downloadable) // required for firefox
		downloadable.click()
		downloadable.remove()
	}

	// APPLICATION STATE OBJECT

	const data = {
		stack,
		setStack,

		heap,
		setHeap,

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
		resetVariablesValueAfterArrowDeletion,

		uploadJSON,
		downloadJSON
	}

	return (
		<StateContext.Provider value={data}>
			{props.children}
		</StateContext.Provider>
	)
}

export { StateContextProvider, StateContext }
