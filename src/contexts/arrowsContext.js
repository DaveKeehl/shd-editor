import React, {useState, useEffect} from "react"
import {utils} from "../utils"

const ArrowsContext = React.createContext()

const { HEADER_HEIGHT, 

		STACK_MIN,

		SEPARATOR,
	
		REGION_PADDING,

		BLOCK_WIDTH,
		BLOCK_PADDING,
		BLOCK_HEADER_HEIGHT,
		BLOCK_MARGIN_BOTTOM,

		OBJECT_START_FIRST_VAR,
		OBJECT_MIN_HEIGHT,

		FRAME_MIN_HEIGHT,
		
		VAR_HEIGHT,
		VAR_VERTICAL_MARGIN,
		VAR_VERTICAL_PADDING,
		VAR_HORIZONTAL_MARGIN,
		VAR_HORIZONTAL_PADDING,
		VAR_ROW_GAP,

		INPUT_HEIGHT,
		INPUT_MIN_WIDTH } = utils.constants

const { getStackFrameVariableWidth, 
		getStackFrameInputWidth, 
		getBlockHeight, 
		getHeapObjectCenter } = utils.functions

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
	}
}

function ArrowsContextProvider(props) {

	const [arrows, setArrows] = useState([])

	const [newArrow, setNewArrow] = useState(arrow)
	const [stackScrollAmount, setStackScrollAmount] = useState(0)
	const [isArrowDragged, setIsArrowDragged] = useState(false)

	// USE EFFECT: Populate arrows array when new one is created
	useEffect(() => {
		if (!isArrowDragged && newArrow.to !== "") {
			// console.log("new arrow is released")
			if (arrows.length === 0) {
				// console.log("first arrow")
				storeNewArrow()
				resetNewArrow()
			} 
			else {
				const updated = [...arrows, newArrow]
				// console.log(updated)
				let found = false
				for (const arrow of arrows) {
					const last = updated.length-1
					if (arrow.from.id === updated[last].from.id && arrow.to === updated[last].to) {
						found = true
						// console.log(`there's already an arrow starting from key=${newArrow.from.id} and ending in key=${newArrow.to}`)
						break
					}
				}
				if (!found) {
					// console.log("new arrow here")
					storeNewArrow()
					resetNewArrow()
				}
			}
		}
	}, [newArrow])

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

	// Given the stack object, the stack width and the mouse Y position,
	// update the coordinates object of the newArrow
	function setExactStackStartPosition(stack, stackWidth, mouseY) {
		const VAR_WIDTH = getStackFrameVariableWidth(stackWidth)
		const INPUT_WIDTH = getStackFrameInputWidth(VAR_WIDTH)

		const virtualY = stackScrollAmount + mouseY - HEADER_HEIGHT
		let accumulator = REGION_PADDING

		for (const frame of stack) {

			let startY = accumulator
			let endY = startY + getBlockHeight(frame)

			if (virtualY >= startY && virtualY <= endY) {

				let varAccumulator = startY + BLOCK_PADDING + BLOCK_HEADER_HEIGHT + VAR_VERTICAL_MARGIN

				// 1. Find closest variable
				for (const variable of frame.variables) {

					let varStartY = varAccumulator
					let varEndY = varStartY + VAR_HEIGHT

					if (virtualY >= varStartY && virtualY <= varEndY) {

						const arrowStart = {
							X: stackWidth - REGION_PADDING - BLOCK_PADDING - VAR_HORIZONTAL_MARGIN - VAR_HORIZONTAL_PADDING - INPUT_WIDTH/2,
							Y: varStartY + VAR_VERTICAL_PADDING + INPUT_HEIGHT + VAR_ROW_GAP + INPUT_HEIGHT/2 - stackScrollAmount + HEADER_HEIGHT
						}

						// 2. Set start arrow position
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
						varAccumulator = (varEndY + VAR_VERTICAL_MARGIN)
					}
				}

				break
				
			} else {
				accumulator = (endY + BLOCK_MARGIN_BOTTOM)
			}
		}
	}

	// Given the heap object where the mouse is over, and the mouse Y position,
	// update the coordinates object of the newArrow
	function setExactHeapStartPosition(stackWidth, target, mouseY) {
		const startX = stackWidth + SEPARATOR + REGION_PADDING + target.position.X
		const startY = HEADER_HEIGHT + REGION_PADDING + target.position.Y

		let accumulator = OBJECT_START_FIRST_VAR

		for (const variable of target.variables) {

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

	// It sets the coordinates of the intersection between the line 
	// created by connecting the start and end point of the arrow, 
	// and the target heap object
	// --> IT HANDLES BOTH THE LOOP AND NON-LOOP CASE
	function setExactHeapEndPosition(mode, stackWidth, target, mouseY = undefined) {

		setTo(target.id)

		if (mode === "loop") {
			const startX = stackWidth + SEPARATOR + REGION_PADDING + target.position.X
			const startY = HEADER_HEIGHT + REGION_PADDING + target.position.Y
			let accumulator = OBJECT_START_FIRST_VAR

			for (const variable of target.variables) {
				const varStartY = startY + accumulator
				const varEndY = varStartY + VAR_HEIGHT
	
				if (mouseY >= varStartY && mouseY <= varEndY) {
					setEnd({
						X: startX + BLOCK_WIDTH, 
						Y: varEndY - VAR_VERTICAL_PADDING - INPUT_HEIGHT/2
					})
					break
				} else {
					accumulator = accumulator + VAR_HEIGHT + VAR_VERTICAL_MARGIN
				}
			}
		}
		else if (mode === "intersection") {
			const start = newArrow.coordinates.start
			const center = getHeapObjectCenter(stackWidth, target)
			const height = getBlockHeight(target)
			const intersection = computeIntersection(start, center, BLOCK_WIDTH, height)

			setEnd({
				X: intersection.X,
				Y: intersection.Y
			})
		}
	}

	function recomputeIntersection(start, to, heap, stackWidth) {
		const heapObject = heap.find(object => object.id === to)
		const center = getHeapObjectCenter(stackWidth, heapObject)
		const height = getBlockHeight(heapObject)
		return computeIntersection(start, center, BLOCK_WIDTH, height)
	}

	function updateArrows(mode, configuration = undefined) {
		if (mode === "stackScroll") {
			const oldScrollAmount = stackScrollAmount
			const newScrollAmount = configuration.newScrollAmount
			const scrollOffset = oldScrollAmount - newScrollAmount
			setStackScrollAmount(newScrollAmount)

			const updatedArrows = arrows.map(arrow => {
				if (arrow.from.region === "stack") {
					let start = arrow.coordinates.start
					let end = arrow.coordinates.end
					
					const {heap, stackWidth} = configuration
					start.Y = start.Y + scrollOffset
					const intersection = recomputeIntersection(start, arrow.to, heap, stackWidth)
					end.X = intersection.X
					end.Y = intersection.Y
				}
				return arrow
			})
			setArrows(updatedArrows)
		}
		else if (mode === "resizeStackWidth") {
			const {clientX, stackWidth, stackInputWidth, INPUT_WIDTH} = configuration
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
		else if (mode === "resetStackWidth") {	
			const {stackWidth, INPUT_WIDTH} = configuration

			const resizeOffset = stackWidth - STACK_MIN
			const inputOffset = INPUT_WIDTH - INPUT_MIN_WIDTH
			
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
		else if (mode === "addStackFrame") {
			const updatedArrows = arrows.map(arrow => {
				if (arrow.from.region === "stack") {
					let start = arrow.coordinates.start
					let end = arrow.coordinates.end

					const {heap, stackWidth} = configuration
					start.Y = start.Y + FRAME_MIN_HEIGHT + BLOCK_MARGIN_BOTTOM
					const intersection = recomputeIntersection(start, arrow.to, heap, stackWidth)
					end.X = intersection.X
					end.Y = intersection.Y
				}
				return arrow
			})
			setArrows(updatedArrows)
		}
		else if (mode === "addStackFrameVariable") {
			const {stack, heap, stackWidth, frameID} = configuration
			const currentFrameVariablesCount = stack.find(frame => frame.id === frameID).variables.length

			let lowestArrowStartY = 0
			const frameArrows = arrows.filter(arrow => arrow.from.parentId === frameID)
			frameArrows.forEach(arrow => {
				if (arrow.coordinates.start.Y > lowestArrowStartY) {
					lowestArrowStartY = arrow.coordinates.start.Y
				}
				return arrow
			})
	
			const updatedArrows = arrows.map(arrow => {
				let region = arrow.from.region
				let start = arrow.coordinates.start
				let end = arrow.coordinates.end

				if (region === "stack" && start.Y > lowestArrowStartY) {
					if (currentFrameVariablesCount === 0) {
						start.Y = start.Y + VAR_HEIGHT + VAR_VERTICAL_MARGIN*2 + 1
					}
					else if (currentFrameVariablesCount > 0) {
						start.Y = start.Y + VAR_HEIGHT + VAR_VERTICAL_MARGIN
					}
					const intersection = recomputeIntersection(start, arrow.to, heap, stackWidth)
					end.X = intersection.X
					end.Y = intersection.Y
				}
				return arrow
			})
			setArrows(updatedArrows)
		}
		else if (mode === "addHeapObjectVariable") {
			const {objectID, heap, stackWidth} = configuration
			const updatedArrows = arrows.map(arrow => {
				const start = arrow.coordinates.start
				const end = arrow.coordinates.end
				if (arrow.to === objectID) {
					const intersection = recomputeIntersection(start, objectID, heap, stackWidth)
					end.X = intersection.X
					end.Y = intersection.Y
				}
				return arrow
			})
			setArrows(updatedArrows)
		}
		// else if (mode === "removeStackFrame") {

		// }
		// else if (mode === "removeStackFrameVariable") {

		// }
	}

	const states = {
		arrows, setArrows,
		newArrow,
		setFrom,
		setTo,
		setStart,
		setEnd,
		stackScrollAmount, setStackScrollAmount,
		isArrowDragged, setIsArrowDragged,
		computeIntersection,
		storeNewArrow,
		resetNewArrow,
		setExactStackStartPosition,
		setExactHeapStartPosition,
		setExactHeapEndPosition,
		updateArrows,
		recomputeIntersection
	}

	return (
		<ArrowsContext.Provider value={states}>
			{props.children}
		</ArrowsContext.Provider>
	)
}

export {ArrowsContextProvider, ArrowsContext}