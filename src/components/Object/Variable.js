import React, {useState, useContext, useEffect, useRef} from "react"
import removeVariableImg from "../../images/delete-icon.svg"
import ArrowStart from "./ArrowStart"
import {StateContext} from "../../contexts/stateContext"
import {utils} from "../../utils"

function Variable(props) {
	const [{name, type, value}, setData] = useState({name: "", type: "", value: ""})

	const app = useContext(StateContext)

	const varRef = useRef(null)

	const parent = app.diagram[props.region].find(obj => obj.id === props.parentID)
	const thisVar = parent.variables.find(variable => variable.id === props.id)

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
	},[])

	useEffect(() => {
		setData(prevData => ({...prevData, value: thisVar.value}))
	}, [thisVar.value])

	function removeVariable() {
		props.removeVariable(props.id)
	}

	function handleChange(event) {
		const {name, value} = event.target
		setData(prevData => ({...prevData, [name]: value}))
		app.setVariableData(props.region, props.parentID, props.id, {name,value})
	}

	function handleKeyUp(event) {
		if (event.keyCode === 13) {
			event.target.blur()
		}
	}

	const valueField = (
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
	)

	const referenceField = (
		<div className="object__variable__value">
			<ArrowStart 
				region={props.region} 
				parentID={props.parentID} 
				variableID={props.id} 
			/>
		</div>
	)

	return (
		<div 
			className="object__variable"
			ref={varRef}
		>
			<button onClick={removeVariable}>
				<img src={removeVariableImg} alt="Remove variable"/>
			</button>
			<form>
				<input 
					className="object__variable__name"
					name="name"
					value={name}
					autoComplete="off"
					placeholder="Name"
					onChange={handleChange}
					onKeyUp={handleKeyUp}
					spellCheck={false}
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
				{props.nature === "reference" ? referenceField : valueField}
			</form>
		</div>
	)
}

export default Variable