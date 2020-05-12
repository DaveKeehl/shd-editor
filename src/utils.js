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
	BLOCK_VERTICAL_VAR_MARGIN: 31,

	FRAME_MIN_HEIGHT: 126,

	OBJECT_HANDLE_WIDTH: 40,
	OBJECT_HANDLE_HEIGHT: 7,
	OBJECT_HANDLE_BOTTOM_PADDING: 20,
	OBJECT_HANDLE_FULL_HEIGHT: 27,
	OBJECT_MIN_HEIGHT: 153,
	OBJECT_START_FIRST_VAR: 101,

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

constants.OBJECT_HANDLE_FULL_HEIGHT = constants.OBJECT_HANDLE_HEIGHT + constants.OBJECT_HANDLE_BOTTOM_PADDING

constants.OBJECT_START_FIRST_VAR = constants.BLOCK_PADDING + constants.OBJECT_HANDLE_FULL_HEIGHT + constants.BLOCK_HEADER_HEIGHT + constants.VAR_VERTICAL_MARGIN

constants.BLOCK_VERTICAL_VAR_MARGIN = constants.VAR_VERTICAL_MARGIN * 2 + 1

function getStackFrameVariableWidth(STACK_WIDTH) {
	const {REGION_PADDING, BLOCK_PADDING, VAR_HORIZONTAL_MARGIN} = constants
	return STACK_WIDTH - REGION_PADDING*2 - BLOCK_PADDING*2 - VAR_HORIZONTAL_MARGIN*2
}

function getStackFrameInputWidth(VAR_WIDTH) {
	const {VAR_HORIZONTAL_PADDING, VAR_COLUMN_GAP} = constants
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

const utils = {
	constants,
	functions: {
		getStackFrameVariableWidth,
		getStackFrameInputWidth,
		getBlockHeight
	}
}

export {utils}