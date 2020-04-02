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

	const valueField = (
		<input 
			className="object__variable__value"
			name="value"
			value={value}
			autoComplete="off"
			placeholder="value"
			onChange={handleChange}
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
				/>

				<input 
					className="object__variable__type"
					name="type"
					value={type}
					autoComplete="off"
					placeholder="Type"
					onChange={handleChange}
				/>

				{props.nature === "reference" ? referenceField : valueField}
			</form>

		</div>
	)
}

export default Variable