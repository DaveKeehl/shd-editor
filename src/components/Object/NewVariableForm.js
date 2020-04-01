import React, { useState } from "react"

function NewVariableForm(props) {
	const [nature, setNature] = useState("primitive")

	const handleChange = (event) => {
		const {value} = event.target
		setNature(value)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		props.addVariable(nature)
	}

	return (
		<form className="object__form" onSubmit={handleSubmit}>
			<div>
				<label>
					<input 
						type="radio" 
						name="nature"
						value="primitive"
						checked={nature === "primitive"}
						onChange={handleChange}
					/>
					Primitive
				</label>

				<label>
					<input 
						type="radio" 
						name="nature"
						value="reference"
						checked={nature === "reference"}
						onChange={handleChange}
					/>
					Reference
				</label>

			</div>
			<button>Add a variable</button>
		</form>
	)
}

export default NewVariableForm