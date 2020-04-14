import React, { useState } from "react"
import removeVariableImg from "../../images/delete-icon.svg"
import ArrowStart from "./ArrowStart"

function Variable(props) {
	const [{name, type, value}, setData] = useState({name: "", type: "", value: ""})

	function removeVariable() {
		props.removeVariable(props.id)
	}

	function handleChange(event) {
		const {name, value} = event.target
		setData(prevData => ({...prevData, [name]: value }))
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

	const referenceField = <div className="object__variable__value"><ArrowStart /></div>

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