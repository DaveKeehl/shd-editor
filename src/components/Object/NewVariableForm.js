import React, {Component} from "react"

class NewVariableForm extends Component {
	constructor() {
		super()
		this.state = {
			newVariableType: "primitive"
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		const {name, value, type, checked} = event.target
		if (type === "checkbox") {
			this.setState({
				[name]: checked
			})
		}  else {
			this.setState({
				[name]: value
			}) 
		}
	}

	handleSubmit(event) {
		event.preventDefault()
		this.props.addVariable(this.state.newVariableType)
	}

	render() {
		return (
			<form className="object__form" onSubmit={this.handleSubmit}>
				<div>
					<label>
						<input 
							type="radio" 
							name="newVariableType"
							value="primitive"
							checked={this.state.newVariableType === "primitive"}
							onChange={this.handleChange}
						/>
						Primitive
					</label>

					<label>
						<input 
							type="radio" 
							name="newVariableType"
							value="reference"
							checked={this.state.newVariableType === "reference"}
							onChange={this.handleChange}
						/>
						Reference
					</label>

				</div>
				<button>Add a variable</button>
			</form>
		)
	}
}

export default NewVariableForm