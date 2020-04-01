import React, { useState } from "react"
import removeVariable from "../../images/remove-variable.svg"
import circle from "../../images/circle.svg"

function Variable(props) {
	const [nature, setNature] = useState("")
	const [name, setName] = useState("")
	const [type, setType] = useState("")
	const [value, setValue] = useState("")

	const removeVariable = () => {
		props.removeVariable(props.id)
	}

	const handleChange = (event) => {
		const {name, value} = event.target
		// this.setState({
		// 	[name]: value
		// })
	}

	const valueField = <input 
							nature="text" 
							name="value"
							value={value}
							autoComplete="off"
							placeholder="var-value"
							onChange={handleChange}
						/>
	const referenceField = <div><img src={circle} alt="Reference link" /></div>

	return (
		<div className="object__variables__variable">
			this is a variable
			{/* <form>
				<label>
					Name: 
					<input 
						nature="text" 
						name="name"
						value={name}
						autoComplete="off"
						placeholder="var-name"
						onChange={handleChange}
					/>
				</label>

				<label>
					Type: 
					<input 
						nature="text" 
						name="type"
						value={type}
						autoComplete="off"
						placeholder="var-type"
						onChange={handleChange}
					/>
				</label>

				<label>
					{props.nature === "reference" ? "References: " : "Value: "}
					{props.nature === "reference" ? referenceField : valueField}
				</label>
			</form> */}

		</div>
	)
}

export default Variable