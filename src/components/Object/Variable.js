import React, {useState, useContext, useEffect} from "react"
import removeVariableImg from "../../images/delete-icon.svg"
import ArrowStart from "./ArrowStart"
import {StateContext} from "../../contexts/stateContext"

function Variable(props) {
	const [{name, type, value}, setData] = useState({name: "", type: "", value: ""})
	const app = useContext(StateContext)

	const parent = app.diagram[props.region].find(obj => obj.id === props.parentID)
	const thisVar = parent.variables.find(variable => variable.id === props.id)

	useEffect(() => {
		console.log("update")
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
			<ArrowStart region={props.region} parentID={props.parentID} variableID={props.id} />
		</div>
	)

	return (
		<div className="object__variable">
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