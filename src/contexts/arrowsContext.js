import React, {useState, useEffect} from "react"
import {utils} from "../utils"

const ArrowsContext = React.createContext()

const { HEADER_HEIGHT, 

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

const {getStackFrameVariableWidth, getStackFrameInputWidth} = utils.functions

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

	// EXACT FUNCTIONS: They set exact coordinates based on screen computations

	// Given the stack object, the stack width and the mouse Y position,
	// update the coordinates object of the newArrow
	function setExactStackStartPosition(stack, stackWidth, mouseY) {
		const VAR_WIDTH = getStackFrameVariableWidth(stackWidth)
		const INPUT_WIDTH = getStackFrameInputWidth(VAR_WIDTH)

		const virtualY = stackScrollAmount + mouseY - HEADER_HEIGHT
		let accumulator = REGION_PADDING

		for (const frame of stack) {

			let startY = accumulator
			let endY = (
				startY + 
				FRAME_MIN_HEIGHT + 
				frame.variables.length * VAR_HEIGHT + 
				(frame.variables.length > 0 ? VAR_VERTICAL_MARGIN*2 + 1 : 0) + 
				(frame.variables.length > 1 ? VAR_VERTICAL_MARGIN * (frame.variables.length-1) : 0)
			)

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

			const position = target.position
			const variables = target.variables

			const height = (
				OBJECT_MIN_HEIGHT +
				variables.length * VAR_HEIGHT +
				(variables.length > 0 ? VAR_VERTICAL_MARGIN*2 + 1 : 0) +
				(variables.length > 1 ? VAR_VERTICAL_MARGIN * (variables.length-1) : 0)
			)
			const start = newArrow.coordinates.start
			const center = {
				X: stackWidth + SEPARATOR + REGION_PADDING + position.X + BLOCK_WIDTH/2, 
				Y: HEADER_HEIGHT + REGION_PADDING + position.Y + height/2
			}
			const intersection = computeIntersection(start, center, BLOCK_WIDTH, height)
			setEnd({
				X: intersection.X,
				Y: intersection.Y
			})
		}
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
		setExactHeapEndPosition
	}

	return (
		<ArrowsContext.Provider value={states}>
			{props.children}
		</ArrowsContext.Provider>
	)
}

export {ArrowsContextProvider, ArrowsContext}