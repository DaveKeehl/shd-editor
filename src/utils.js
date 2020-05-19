const constants = {
	HEADER_HEIGHT: 55,

	STACK_MIN: 360,
	STACK_MAX: 500,

	SEPARATOR: 10,

	REGION_PADDING: 20,

	BLOCK_WIDTH: 320,
	BLOCK_PADDING: 20,
	BLOCK_HEADER_HEIGHT: 39,
	BLOCK_MARGIN_BOTTOM: 10,
	get BLOCK_VERTICAL_VAR_MARGIN() {
		return this.VAR_VERTICAL_MARGIN * 2 + 1
	}, // 31

	FRAME_MIN_HEIGHT: 126,

	OBJECT_HANDLE_WIDTH: 40,
	OBJECT_HANDLE_HEIGHT: 7,
	OBJECT_HANDLE_BOTTOM_PADDING: 20,
	get OBJECT_HANDLE_FULL_HEIGHT() {
		return this.OBJECT_HANDLE_HEIGHT + this.OBJECT_HANDLE_BOTTOM_PADDING
	}, // 27
	OBJECT_MIN_HEIGHT: 153,
	get OBJECT_START_FIRST_VAR() {
		return this.BLOCK_PADDING + this.OBJECT_HANDLE_FULL_HEIGHT + this.BLOCK_HEADER_HEIGHT + this.VAR_VERTICAL_MARGIN
	} , // 101

	VAR_HEIGHT: 103,
	VAR_VERTICAL_PADDING: 18,
	VAR_HORIZONTAL_PADDING: 20,
	VAR_VERTICAL_MARGIN: 15,
	VAR_HORIZONTAL_MARGIN: 10,
	VAR_ROW_GAP: 5,
	VAR_COLUMN_GAP: 10,

	INPUT_HEIGHT: 31,
	INPUT_MIN_WIDTH: 105,
}

function getStackFrameWidth(stackWidth) {
	return stackWidth - constants.REGION_PADDING * 2
}

function getStackFrameVariableWidth(STACK_WIDTH) {
	const {REGION_PADDING, BLOCK_PADDING, VAR_HORIZONTAL_MARGIN} = constants
	return STACK_WIDTH - REGION_PADDING*2 - BLOCK_PADDING*2 - VAR_HORIZONTAL_MARGIN*2
}

function getStackFrameInputWidth(STACK_WIDTH) {
	const {VAR_HORIZONTAL_PADDING, VAR_COLUMN_GAP} = constants
	const VAR_WIDTH = getStackFrameVariableWidth(STACK_WIDTH)
	return (VAR_WIDTH - VAR_HORIZONTAL_PADDING*2 - VAR_COLUMN_GAP) / 2
}

function getBlockHeight(blockObject) {
	const {FRAME_MIN_HEIGHT, OBJECT_MIN_HEIGHT,BLOCK_VERTICAL_VAR_MARGIN, VAR_HEIGHT, VAR_VERTICAL_MARGIN} = constants
	const region = blockObject.position === undefined ? "Stack" : "Heap"
	const variablesCount = blockObject.variables.length
	let result = 0
	if (region === "Stack") {
		result += FRAME_MIN_HEIGHT
	} else {
		result += OBJECT_MIN_HEIGHT
	}
	result += variablesCount*VAR_HEIGHT + (variablesCount > 0 ? BLOCK_VERTICAL_VAR_MARGIN : 0) + (variablesCount > 1 ? VAR_VERTICAL_MARGIN * (variablesCount-1) : 0)
	return result
}

function getHeapObjectCenter(stackWidth, heapObject) {
	const {SEPARATOR, REGION_PADDING, BLOCK_WIDTH, HEADER_HEIGHT} = constants
	const position = heapObject.position

	const height = getBlockHeight(heapObject)
	const center = {
		X: stackWidth + SEPARATOR + REGION_PADDING + position.X + BLOCK_WIDTH/2, 
		Y: HEADER_HEIGHT + REGION_PADDING + position.Y + height/2
	}

	return center
}

function getStackFrameVirtualData(stack, stackWidth, stackScrollAmount, mouseY) {

	const virtualMouseY = stackScrollAmount + mouseY - constants.HEADER_HEIGHT
	let accumulator = constants.REGION_PADDING

	for (const frame of stack) {

		console.log(frame)

		let startY = accumulator
		let endY = startY + getBlockHeight(frame)

		if (virtualMouseY >= startY && virtualMouseY <= endY) {

			const stackFrameVirtualData = {
				stackFrame: frame,
				coordinates: {
					startX: constants.REGION_PADDING,
					startY: startY,
					get endX() { return this.startX + getStackFrameWidth(stackWidth) },
					endY: endY
				}
			}

			return stackFrameVirtualData
			
		} else {
			accumulator = (endY + constants.BLOCK_MARGIN_BOTTOM)
		}
	}

}

function getHoveredStackData(stack, stackWidth, stackScrollAmount, mouseY) {

	const {HEADER_HEIGHT, BLOCK_PADDING, BLOCK_HEADER_HEIGHT, VAR_VERTICAL_MARGIN, VAR_HEIGHT} = constants

	const virtualMouseY = stackScrollAmount + mouseY - HEADER_HEIGHT

	const stackFrameVirtualData = getStackFrameVirtualData(stack, stackWidth, stackScrollAmount, mouseY)
	const startY = stackFrameVirtualData.coordinates.startY

	let varAccumulator = startY + BLOCK_PADDING + BLOCK_HEADER_HEIGHT + VAR_VERTICAL_MARGIN

	for (const variable of stackFrameVirtualData.stackFrame.variables) {

		let varStartY = varAccumulator
		let varEndY = varStartY + VAR_HEIGHT

		if (virtualMouseY >= varStartY && virtualMouseY <= varEndY) {

			const result = {
				variable: variable,
				parent: stackFrameVirtualData.stackFrame,
			}
			// console.log(result)
			return result

		} else {
			varAccumulator = (varEndY + VAR_VERTICAL_MARGIN)
		}
	}

}

function getStackFramePosition(stack, stackFrame, stackScrollAmount) {

	let accumulator = constants.HEADER_HEIGHT + constants.REGION_PADDING

	for (const frame of stack) {

		let startY = accumulator
		let endY = startY + getBlockHeight(frame)

		if (frame.id === stackFrame.id) {

			const stackFramePosition = {
				X: constants.REGION_PADDING,
				Y: {
					virtual: startY - stackScrollAmount,
					absolute: startY
				}
			}

			// console.log(stackFramePosition)

			return stackFramePosition
			
		} else {
			accumulator = (endY + constants.BLOCK_MARGIN_BOTTOM)
		}
	}
}

function getHoveredHeapObject(heap, mouseX, mouseY, stackWidth) {

	const {REGION_PADDING, HEADER_HEIGHT, BLOCK_WIDTH} = constants

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
	// console.log(foundObject)
	return foundObject
}

function convertFromAbsoluteToRelative(stackWidth, absoluteCoordinates) {
	const {HEADER_HEIGHT, SEPARATOR, REGION_PADDING, BLOCK_WIDTH, BLOCK_PADDING, OBJECT_HANDLE_HEIGHT} = constants
	const {X,Y} = absoluteCoordinates
	const newPosition = {
		X: X - stackWidth - SEPARATOR - REGION_PADDING - BLOCK_WIDTH/2, 
		Y: Y - REGION_PADDING - HEADER_HEIGHT - BLOCK_PADDING - OBJECT_HANDLE_HEIGHT/2
	}
	return newPosition
}

function convertFromRelativeToAbsolute(stackWidth, relativeCoordinates) {
	const {HEADER_HEIGHT, SEPARATOR, REGION_PADDING, BLOCK_WIDTH, BLOCK_PADDING, OBJECT_HANDLE_HEIGHT} = constants
	const {X,Y} = relativeCoordinates
	const newPosition = {
		X: stackWidth + SEPARATOR + REGION_PADDING + X + BLOCK_WIDTH/2,
		Y: HEADER_HEIGHT + REGION_PADDING + Y + BLOCK_PADDING + OBJECT_HANDLE_HEIGHT/2
	}
	return newPosition
}

const utils = {
	constants,
	functions: {
		getStackFrameVariableWidth,
		getStackFrameInputWidth,
		getBlockHeight,
		getHeapObjectCenter,
		getStackFramePosition,
		getStackFrameVirtualData,
		convertFromAbsoluteToRelative,
		convertFromRelativeToAbsolute,
	}
}

export {utils}