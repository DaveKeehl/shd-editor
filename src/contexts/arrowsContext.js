import React, {useState} from "react"
import {utils} from "../utils"

const ArrowsContext = React.createContext()

const { getStackFrameInputWidth, 
		getBlockHeight, 
		getHeapObjectCenter,
		getStackFramePosition } = utils.functions

const arrow = {
	from: {
		region: "",
		parentId: "",
		id: ""
	},
	to: "",
	coordinates: {
		start: {
			X: "",
			Y: ""
		},
		end: {
			X: "",
			Y: ""
		}
	},
	zIndex: "",
	dragged: false
}

function ArrowsContextProvider(props) {

	const [arrows, setArrows] = useState([])

	const [newArrow, setNewArrow] = useState(arrow)
	const [stackScrollAmount, setStackScrollAmount] = useState(0)
	const [isArrowDragged, setIsArrowDragged] = useState(false)
	const [activeDragHandle, setActiveDragHandle] = useState("")

	// FROM: the refence variable that started the new arrow
	function setFrom(from) {
		const {region, parentId, id} = from
		setNewArrow(prev => ({
			...prev, 
			from: {
				region: region,
				parentId: parentId,
				id: id
			}
		}))
	}

	// TO: the heap object on which the new arrow is released
	function setTo(to) {
		setNewArrow(prev => ({...prev, to: to}))
	}

	// START: set of absolute coordinates where the new arrow starts
	function setStart(start) {
		const {X,Y} = start
		setNewArrow(prev => ({
			...prev, 
			coordinates: {
				start: {
					X: X,
					Y: Y
				},
				end: prev.coordinates.end
			}
		}))
	}

	// END: set of absolute coordinates where the new arrow ends
	function setEnd(end) {
		const {X,Y} = end
		setNewArrow(prev => ({
			...prev, 
			coordinates: {
				...prev.coordinates,
				end: {
					X: X,
					Y: Y
				}
			}
		}))
	}

	function setDragged(from, to, state) {
		const updated = arrows.map(arrow => {
			if (arrow.from.id === from && arrow.to === to) {
				arrow.dragged = state
			}
			return arrow
		})
		setArrows(updated)
	}

	// Given 2 points (arrow start and center of target object) and the
	// size (width and height) of the target object, compute and return 
	// the intersection of the line created by those 2 points and the 
	// border of the object
	function computeIntersection(A, B, width, height) {
		const {X: x1, Y: y1} = A
		const {X: x2, Y: y2} = B
		const intersection = {X: "", Y: ""}
		const slope = (y2 - y1) / (x2 - x1)
		const horizontalTest = slope * (width/2)
		const verticalTest = (height/2) / slope
		const horLimit = height / 2
		const verLimit = width / 2
		let edge = ""

		if (horizontalTest >= -horLimit && horizontalTest <= horLimit) {
			if (x1 < x2) {
				edge = "left"
			} 
			else if (x1 > x2) {
				edge = "right"
			}
		}
		else if (verticalTest >= -verLimit && verticalTest <= verLimit) {
			if (y1 < y2) {
				edge = "top"
			} 
			else if (y1 > y2) {
				edge = "bottom"
			}
		}

		if (edge === "left" || edge === "right") {
			if (edge === "left") {
				intersection.X = x2 - (width/2)
				intersection.Y = y2 - slope * (width/2)
			} else {
				intersection.X = x2 + (width/2)
				intersection.Y = y2 + slope * (width/2)
			}
		}
		else if (edge === "top" || edge === "bottom") {
			if (edge === "top") {
				intersection.X = x2 - (height/2) / slope
				intersection.Y = y2 - (height/2)
			} else {
				intersection.X = x2 + (height/2) / slope
				intersection.Y = y2 + (height/2)
			}
		}

		return intersection
	}

	// Reset newArrow object
	function resetNewArrow() {
		setNewArrow(arrow)
	}

	// Add newArrow in the arrows array
	function storeNewArrow() {
		setArrows(prev => [...prev, newArrow])
	}

	// NEW ARROW EXACT FUNCTIONS: They set exact coordinates of the new arrow based on screen computations

	function getExactStackStartPosition(stack, stackWidth, mouseX, mouseY) {
		console.log(arguments)
		const {HEADER_HEIGHT, REGION_PADDING, FRAME_MARGIN_BOTTOM} = utils.constants

		const INPUT_WIDTH = getStackFrameInputWidth(stackWidth)

		const virtualY = stackScrollAmount + mouseY - HEADER_HEIGHT
		let accumulator = REGION_PADDING

		for (const frame of stack) {

			console.log("test")

			let startY = accumulator
			let endY = startY + getBlockHeight(frame)

			console.log(`startY: ${startY}, virtualY: ${virtualY}, endY: ${endY}`)

			if (virtualY >= startY && virtualY <= endY) {

				const {BLOCK_PADDING, BLOCK_HEADER_HEIGHT, VAR_VERTICAL_MARGIN} = utils.constants

				let varAccumulator = startY + BLOCK_PADDING + BLOCK_HEADER_HEIGHT + VAR_VERTICAL_MARGIN

				// 1. Find closest variable
				for (const variable of frame.variables) {

					const {VAR_HEIGHT, VAR_HORIZONTAL_MARGIN, VAR_HORIZONTAL_PADDING, VAR_VERTICAL_PADDING, INPUT_HEIGHT, VAR_ROW_GAP} = utils.constants

					let varStartX = REGION_PADDING + BLOCK_PADDING + VAR_HORIZONTAL_MARGIN
					let varEndX = stackWidth - REGION_PADDING - BLOCK_PADDING - VAR_HORIZONTAL_MARGIN

					console.log(`varStartX: ${varStartX}, varEndX: ${varEndX}, mouseX: ${mouseX}`)

					let varStartY = varAccumulator
					let varEndY = varStartY + VAR_HEIGHT

					if (
						mouseX >= varStartX && mouseX <= varEndX
						&& 
						virtualY >= varStartY && virtualY <= varEndY
					) {

						const arrowStart = {
							region: "stack",
							variableId: variable.id,
							parentId: frame.id,
							coordinates: {
								X: stackWidth - REGION_PADDING - BLOCK_PADDING - VAR_HORIZONTAL_MARGIN - VAR_HORIZONTAL_PADDING - INPUT_WIDTH/2,
								Y: varStartY + VAR_VERTICAL_PADDING + INPUT_HEIGHT + VAR_ROW_GAP + INPUT_HEIGHT/2 - stackScrollAmount + HEADER_HEIGHT
							}
						}

						return arrowStart

					} else {
						varAccumulator = (varEndY + VAR_VERTICAL_MARGIN)
					}
				}

				break
				
			} else {
				accumulator = (endY + FRAME_MARGIN_BOTTOM)
			}
		}
	}

	// Given the stack object, the stack width and the mouse Y position,
	// update the coordinates object of the newArrow
	function setExactStackStartPosition(stack, stackWidth, mouseX, mouseY) {
		const arrowStart = getExactStackStartPosition(stack, stackWidth, mouseX, mouseY)
		setStart({
			X: arrowStart.coordinates.X, 
			Y: arrowStart.coordinates.Y
		})
		setEnd({
			X: arrowStart.coordinates.X, 
			Y: arrowStart.coordinates.Y
		})
	}

	// Given the heap object where the mouse is over, and the mouse Y position,
	// update the coordinates object of the newArrow
	function setExactHeapStartPosition(stackWidth, target, mouseY) {
		const {SEPARATOR, REGION_PADDING, HEADER_HEIGHT, OBJECT_START_FIRST_VAR} = utils.constants

		const startX = stackWidth + SEPARATOR + REGION_PADDING + target.position.X
		const startY = HEADER_HEIGHT + REGION_PADDING + target.position.Y

		let accumulator = OBJECT_START_FIRST_VAR

		for (const variable of target.variables) {

			const {VAR_HEIGHT, BLOCK_WIDTH, BLOCK_PADDING, VAR_HORIZONTAL_MARGIN, VAR_HORIZONTAL_PADDING, INPUT_MIN_WIDTH, VAR_VERTICAL_PADDING, INPUT_HEIGHT, VAR_VERTICAL_MARGIN} = utils.constants

			const varStartY = startY + accumulator
			const varEndY = varStartY + VAR_HEIGHT

			if (mouseY >= varStartY && mouseY <= varEndY) {
				const arrowStart = {
					X: startX + BLOCK_WIDTH - BLOCK_PADDING - VAR_HORIZONTAL_MARGIN - VAR_HORIZONTAL_PADDING - INPUT_MIN_WIDTH/2,
					Y: varEndY - VAR_VERTICAL_PADDING - INPUT_HEIGHT/2
				}
				setStart({
					X: arrowStart.X, 
					Y: arrowStart.Y
				})
				setEnd({
					X: arrowStart.X, 
					Y: arrowStart.Y
				})

				break

			} else {
				accumulator = accumulator + VAR_HEIGHT + VAR_VERTICAL_MARGIN
			}

		}
	}

	// It sets the coordinates of the end point of the new arrow when a loop occurs
	// (an object on the heap points to itself)
	function setExactHeapEndPositionOnLoop(stackWidth, target, mouseX, mouseY) {
		const {SEPARATOR, REGION_PADDING, HEADER_HEIGHT, OBJECT_START_FIRST_VAR} = utils.constants

		const startX = stackWidth + SEPARATOR + REGION_PADDING + target.position.X
		const startY = HEADER_HEIGHT + REGION_PADDING + target.position.Y
		let accumulator = OBJECT_START_FIRST_VAR

		for (const variable of target.variables) {
			const {VAR_HEIGHT, BLOCK_WIDTH, BLOCK_PADDING, VAR_HORIZONTAL_MARGIN, VAR_HORIZONTAL_PADDING, VAR_VERTICAL_PADDING, INPUT_HEIGHT, VAR_VERTICAL_MARGIN} = utils.constants

			const varStartY = startY + accumulator
			const varEndY = varStartY + VAR_HEIGHT

			// Find correct variable
			if (mouseY >= varStartY && mouseY <= varEndY) {
				// Check if mouse is outside input field
				if (mouseX >= startX + BLOCK_WIDTH - BLOCK_PADDING - VAR_HORIZONTAL_MARGIN - VAR_HORIZONTAL_PADDING) {
					setEnd({
						X: startX + BLOCK_WIDTH, 
						Y: varEndY - VAR_VERTICAL_PADDING - INPUT_HEIGHT/2
					})
					setTo(target.id)
					break
				}
			} else {
				accumulator = accumulator + VAR_HEIGHT + VAR_VERTICAL_MARGIN
			}
		}
	}

	// It sets the coordinates of the intersection between the line 
	// created by connecting the start and end point of the arrow, 
	// and the target heap object
	function setExactHeapEndPositionOnIntersection(stackWidth, target) {
		const start = newArrow.coordinates.start
		const center = getHeapObjectCenter(stackWidth, target)
		const height = getBlockHeight(target)
		const intersection = computeIntersection(start, center, utils.constants.BLOCK_WIDTH, height)
		setEnd({
			X: intersection.X,
			Y: intersection.Y
		})
		setTo(target.id)
	}

	function recomputeIntersection(start, to, heap, stackWidth) {
		const heapObject = heap.find(object => object.id === to)
		const center = getHeapObjectCenter(stackWidth, heapObject)
		const height = getBlockHeight(heapObject)
		return computeIntersection(start, center, utils.constants.BLOCK_WIDTH, height)
	}

	function updateArrowsOnStackScroll(newScrollAmount, heap, stackWidth) {
		const oldScrollAmount = stackScrollAmount
		const scrollOffset = oldScrollAmount - newScrollAmount
		setStackScrollAmount(newScrollAmount)

		const updatedArrows = arrows.map(arrow => {
			if (arrow.from.region === "stack") {
				let start = arrow.coordinates.start
				let end = arrow.coordinates.end
				
				start.Y = start.Y + scrollOffset
				const intersection = recomputeIntersection(start, arrow.to, heap, stackWidth)
				end.X = intersection.X
				end.Y = intersection.Y
			}
			return arrow
		})
		setArrows(updatedArrows)
	}

	function updateArrowsOnStackResize(clientX, stackWidth, stackInputWidth, INPUT_WIDTH) {
		const resizeOffset = clientX - stackWidth
		const inputOffset = INPUT_WIDTH - stackInputWidth

		const updatedArrows = arrows.map(arrow => {
			if (arrow.from.region === "stack") {
				arrow.coordinates.start.X = arrow.coordinates.start.X + resizeOffset - (inputOffset/2)
			} else {
				arrow.coordinates.start.X = arrow.coordinates.start.X + resizeOffset
			}
			arrow.coordinates.end.X = arrow.coordinates.end.X + resizeOffset
			return arrow
		})
		setArrows(updatedArrows)
	}

	function updateArrowsOnStackWidthReset(stackWidth, INPUT_WIDTH) {
		const resizeOffset = stackWidth - utils.constants.STACK_MIN
		const inputOffset = INPUT_WIDTH - utils.constants.INPUT_MIN_WIDTH
		
		const updatedArrows = arrows.map(arrow => {
			if (arrow.from.region === "stack") {
				arrow.coordinates.start.X = arrow.coordinates.start.X - resizeOffset + inputOffset/2
			} else {
				arrow.coordinates.start.X = arrow.coordinates.start.X - resizeOffset
			}
			arrow.coordinates.end.X = arrow.coordinates.end.X - resizeOffset
			return arrow
		})
		setArrows(updatedArrows)
	}

	function startDraggingArrow(diagram, stackWidth, event, from) {
		resetNewArrow()
		setIsArrowDragged(true)
		setFrom({
			region: from.region, 
			parentId: from.parentId, 
			id: from.id
		})
		// SET START COORDINATES OF NEW ARROW
		const {clientX, clientY} = event
		if (from.region === "heap") {
			// HEAP
			const target = utils.functions.getHoveredHeapObject(diagram.heap, clientX, clientY, stackWidth)
			setExactHeapStartPosition(stackWidth, target, clientY)
		} else {
			// STACK
			setExactStackStartPosition(diagram.stack, stackWidth, clientX, clientY)
		}
	}

	function stopDraggingArrow(heap, stackWidth, event, setVariableData) {
		setIsArrowDragged(false)
		const target = utils.functions.getHoveredHeapObject(heap, event.clientX, event.clientY, stackWidth)
		if (target !== undefined) {
			// CASE 1: HANDLES BOTH TARGET IS SAME OBJECT (LOOP) AND A DIFFERENT ONE
			const {region, parentId, id} = newArrow.from
			setVariableData(region, parentId, id, { name: "value", value: target.id })
			setTo(target.id)
		}
		// CASE 2: ARROW-END POSITION IS NOT VALID (IT SNAPS BACK TO ARROW-START POSITION)
		else {
			const {X,Y} = newArrow.coordinates.start
			setEnd({
				X: X, 
				Y: Y
			})
		}
	}

	function rebaseNewArrow(arrowData, activeDragHandle) {
		setIsArrowDragged(true)
		setDragged(arrowData.from.id, arrowData.to, true)
		setNewArrow({
			from: {
				region: arrowData.from.region,
				parentId: arrowData.from.parentId,
				id: arrowData.from.id
			},
			to: arrowData.to,
			coordinates: {
				start: {
					X: arrowData.coordinates.start.X,
					Y: arrowData.coordinates.start.Y
				},
				end: {
					X: arrowData.coordinates.end.X,
					Y: arrowData.coordinates.end.Y
				}
			}
		})
		setActiveDragHandle(`${activeDragHandle}`)
	}

	// GLOBAL ARROW REBUILD
	// Usage: This function can be used to recreate the array of arrows
	//        based on the state of the diagram and the reference variables values
	// Target: Any event that modifies the arrows positions
	function rebuildArrows(diagram, stackWidth) {

		const {
			REGION_PADDING, 
			BLOCK_PADDING, 
			VAR_HORIZONTAL_MARGIN, 
			VAR_HORIZONTAL_PADDING, 
			BLOCK_HEADER_HEIGHT, 
			VAR_VERTICAL_MARGIN, 
			VAR_HEIGHT, 
			VAR_VERTICAL_PADDING, 
			INPUT_HEIGHT,
			SEPARATOR,
			BLOCK_WIDTH,
			HEADER_HEIGHT,
			OBJECT_HANDLE_FULL_HEIGHT,
			INPUT_MIN_WIDTH
		} = utils.constants

		const {stack, heap} = diagram
		
		setArrows([])

		stack.forEach(frame => {
			frame.variables.forEach((variable,idx) => {

				if (variable.nature === "reference" && variable.value !== "") {
					if (heap.find(obj => obj.id === variable.value) !== undefined) {

						const start = {
							X: stackWidth - REGION_PADDING - BLOCK_PADDING - VAR_HORIZONTAL_MARGIN - VAR_HORIZONTAL_PADDING - getStackFrameInputWidth(stackWidth)/2,
							Y: getStackFramePosition(stack, frame, stackScrollAmount).Y.virtual + BLOCK_PADDING + BLOCK_HEADER_HEIGHT + (VAR_VERTICAL_MARGIN + VAR_HEIGHT) * (idx+1) - VAR_VERTICAL_PADDING - INPUT_HEIGHT/2
						}

						const end = {
							X: recomputeIntersection(start, variable.value, heap, stackWidth).X,
							Y: recomputeIntersection(start, variable.value, heap, stackWidth).Y
						}

						const newArrow = {
							from: {
								id: variable.id,
								parentId: frame.id,
								region: "stack"
							},
							to: variable.value,
							coordinates: {
								start,
								end
							},
							zIndex: heap.find(object => object.id === variable.value).depthIndex,
							dragged: false
						}
						setArrows(prev => ([...prev, newArrow]))
					}
				}
			})
		})

		heap.forEach(object => {
			object.variables.forEach((variable,idx) => {
				
				if (variable.nature === "reference" && variable.value !== "") {
					if (heap.find(obj => obj.id === variable.value) !== undefined) {

						if (variable.value === object.id) {

							//LOOP

							console.log(utils.constants)

							const start = {
								X: stackWidth + SEPARATOR + REGION_PADDING + object.position.X + BLOCK_WIDTH - BLOCK_PADDING - VAR_HORIZONTAL_MARGIN - VAR_HORIZONTAL_PADDING - INPUT_MIN_WIDTH/2,
								Y: HEADER_HEIGHT + REGION_PADDING + object.position.Y + BLOCK_PADDING + OBJECT_HANDLE_FULL_HEIGHT + BLOCK_HEADER_HEIGHT + (VAR_VERTICAL_MARGIN + VAR_HEIGHT) * (idx+1) - VAR_VERTICAL_PADDING - INPUT_HEIGHT/2
							}
	
							const end = {
								X: start.X + INPUT_MIN_WIDTH/2 + VAR_HORIZONTAL_PADDING + VAR_HORIZONTAL_MARGIN + BLOCK_PADDING,
								Y: start.Y
							}
	
							const newArrow = {
								from: {
									id: variable.id,
									parentId: object.id,
									region: "heap"
								},
								to: variable.value,
								coordinates: {
									start,
									end
								},
								zIndex: object.depthIndex+1,
								dragged: false
							}
							setArrows(prev => ([...prev, newArrow]))
						}
						else {
							
							// INTERSECTION
	
							const start = {
								X: stackWidth + SEPARATOR + REGION_PADDING + object.position.X + BLOCK_WIDTH - BLOCK_PADDING - VAR_HORIZONTAL_MARGIN - VAR_HORIZONTAL_PADDING - INPUT_MIN_WIDTH/2,
								Y: HEADER_HEIGHT + REGION_PADDING + object.position.Y + BLOCK_PADDING + OBJECT_HANDLE_FULL_HEIGHT + BLOCK_HEADER_HEIGHT + (VAR_VERTICAL_MARGIN + VAR_HEIGHT) * (idx+1) - VAR_VERTICAL_PADDING - INPUT_HEIGHT/2
							}
	
							const end = {
								X: recomputeIntersection(start, variable.value, heap, stackWidth).X,
								Y: recomputeIntersection(start, variable.value, heap, stackWidth).Y
							}
	
							const newArrow = {
								from: {
									id: variable.id,
									parentId: object.id,
									region: "heap"
								},
								to: variable.value,
								coordinates: {
									start,
									end
								},
								zIndex: object.depthIndex+1,
								dragged: false
							}
							setArrows(prev => ([...prev, newArrow]))
						}
					}
				}
			})
		})
	}

	const states = {
		arrows, setArrows,
		newArrow, setNewArrow,
		setFrom,
		setTo,
		setStart,
		setEnd,
		setDragged,
		stackScrollAmount, setStackScrollAmount,
		isArrowDragged, setIsArrowDragged,
		activeDragHandle, setActiveDragHandle,
		computeIntersection,
		storeNewArrow,
		resetNewArrow,
		getExactStackStartPosition,
		setExactStackStartPosition,
		setExactHeapStartPosition,
		setExactHeapEndPositionOnLoop,
		setExactHeapEndPositionOnIntersection,
		updateArrowsOnStackScroll,
		updateArrowsOnStackResize,
		updateArrowsOnStackWidthReset,
		recomputeIntersection,
		startDraggingArrow,
		stopDraggingArrow,
		rebaseNewArrow,
		rebuildArrows
	}

	return (
		<ArrowsContext.Provider value={states}>
			{props.children}
		</ArrowsContext.Provider>
	)
}

export {ArrowsContextProvider, ArrowsContext}