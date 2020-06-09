import React, {useState, useContext, useEffect, useRef} from "react"
import removeVariableImg from "../../images/delete-icon.svg"
import ArrowStart from "./ArrowStart"
import {StateContext} from "../../contexts/stateContext"
import {utils} from "../../utils"

function Variable(props) {
	const [{name, type, value}, setData] = useState({name: "", type: "", value: ""})

	const app = useContext(StateContext)

	const varRef = useRef(null)
	const formRef = useRef(null)
	const inputRef = useRef(null)

	// LOAD COMPUTED CSS VALUE WHEN COMPONENT MOUNTS
	useEffect(() => {
		// VAR_HEIGHT
		const height = parseInt(window.getComputedStyle(varRef.current).getPropertyValue("height"))
		utils.functions.updateConstantValue("VAR_HEIGHT", height)
		// VAR_VERTICAL_PADDING
		const verticalPadding = parseInt(window.getComputedStyle(varRef.current).getPropertyValue("padding-top"))
		utils.functions.updateConstantValue("VAR_VERTICAL_PADDING", verticalPadding)
		// VAR_HORIZONTAL_PADDING
		const horizontalPadding = parseInt(window.getComputedStyle(varRef.current).getPropertyValue("padding-left"))
		utils.functions.updateConstantValue("VAR_HORIZONTAL_PADDING", horizontalPadding)
		// VAR_VERTICAL_MARGIN
		const verticalMargin = parseInt(window.getComputedStyle(varRef.current).getPropertyValue("margin-bottom"))
		utils.functions.updateConstantValue("VAR_VERTICAL_MARGIN", verticalMargin)
		// VAR_HORIZONTAL_MARGIN
		const horizontalMargin = parseInt(window.getComputedStyle(varRef.current).getPropertyValue("margin-left"))
		utils.functions.updateConstantValue("VAR_HORIZONTAL_MARGIN", horizontalMargin)
		// VAR_ROW_GAP
		const varRowGap = parseInt(window.getComputedStyle(formRef.current).getPropertyValue("row-gap"))
		utils.functions.updateConstantValue("VAR_ROW_GAP", varRowGap)
		// VAR_COLUMN_GAP
		const varColumnGap = parseInt(window.getComputedStyle(formRef.current).getPropertyValue("column-gap"))
		utils.functions.updateConstantValue("VAR_COLUMN_GAP", varColumnGap)
		// INPUT_HEIGHT
		const inputHeight = parseInt(window.getComputedStyle(inputRef.current).getPropertyValue("height"))
		utils.functions.updateConstantValue("INPUT_HEIGHT", inputHeight)
		// INPUT_MIN_WIDTH
		if (props.region === "heap") {
			const inputMinWidth = parseInt(window.getComputedStyle(inputRef.current).getPropertyValue("width"))
			utils.functions.updateConstantValue("INPUT_MIN_WIDTH", inputMinWidth)
		}
	},[])

	// const parent = app.diagram[props.region].find(obj => obj.id === props.parentID)
	// const thisVar = parent.variables.find(variable => variable.id === props.id)

	// useEffect(() => {
	// 	setData(prevData => ({...prevData, value: thisVar.value}))
	// }, [thisVar.value])

	function handleChange(event) {
		const {name, value} = event.target
		setData(prevData => ({...prevData, [name]: value}))
		app.setVariableData(props.region, props.parentID, props.id, {name,value})
	}

	function removeVariable() {
		props.removeVariable(props.id)
	}

	function handleKeyUp(event) {
		if (event.keyCode === 13) {
			event.target.blur()
		}
	}

	return (
		<div 
			className="object__variable"
			ref={varRef}
		>
			<button onClick={removeVariable}>
				<img src={removeVariableImg} alt="Remove variable"/>
			</button>
			<form ref={formRef}>
				<input 
					className="object__variable__name"
					name="name"
					value={name}
					autoComplete="off"
					placeholder="Name"
					onChange={handleChange}
					onKeyUp={handleKeyUp}
					spellCheck={false}
					ref={inputRef}
				/>
				<input 
					className="object__variable__type"
					name="type"
					value={type}
					autoComplete="off"
					placeholder="Type"
					onChange={handleChange}
					onKeyUp={handleKeyUp}
					spellCheck={false}
				/>
				{
					props.nature === "reference" ? 
						<div className="object__variable__value">
							<ArrowStart 
								region={props.region} 
								parentID={props.parentID} 
								variableID={props.id} 
							/>
						</div> 
					: 
						<input 
							className="object__variable__value"
							name="value"
							value={value}
							autoComplete="off"
							placeholder="value"
							spellCheck={false}
							onChange={handleChange}
							onKeyUp={handleKeyUp}
						/>
				}
			</form>
		</div>
	)
}

export default Variable