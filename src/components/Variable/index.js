import React, { Component } from "react"
import removeVariable from "../../images/remove-variable.svg"
import variableContainer from "../../images/variable-container.svg"

class Variable extends Component {
	render() {
		return (
			<div className="object__variables__variable">

				<button className="object__variables__variable--remove">
					<img src={removeVariable} alt="Remove variable" />
				</button>

				<img 
					className="object__variables__variable__container"
					src={variableContainer} 
					alt="Variable container" 
				/>

				<form>
					<label>
						Name: 
						<input 
							type="text" 
							name="name"
						/>
					</label>

					<label>
						Type: 
						<input 
							type="text" 
							name="type"
						/>
					</label>

					<label>
						Value: 
						<input 
							type="text" 
							name="value"
						/>
					</label>
				</form>

			</div>
		)
	}
}

export default Variable