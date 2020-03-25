import React, {Component} from "react"
import removeVariable from "../../images/remove-variable.svg"
import moveUp from "../../images/move-up.svg"
import moveDown from "../../images/move-down.svg"
import variableContainer from "../../images/variable-container.svg"
import circle from "../../images/circle.svg"

class Variable extends Component {
	constructor() {
		super()
		this.state = {
			type: ""
		}
		this.removeVariable = this.removeVariable.bind(this)
		this.moveVariableUp = this.moveVariableUp.bind(this)
		this.moveVariableDown = this.moveVariableDown.bind(this)
	}

	componentDidMount() {
		this.setState({type: this.props.type})
	}

	removeVariable() {
		this.props.removeVariable(this.props.id)
	}

	moveVariableUp() {
		this.props.moveVariableUp("move up")
	}

	moveVariableDown() {
		this.props.moveVariableUp("move down")
	}

	render() {

		const valueField = <input 
								type="text" 
								name="value"
								autoComplete="off"
								placeholder="var-value"
							/>
		const referenceField = <div><img src={circle} alt="Reference link" /></div>

		return (
			<div className="object__variables__variable">
	
				<div className="object__variables__variable__actions">
					<button onClick={this.moveVariableUp}>
						<img src={moveUp} alt="Move variable up" />
					</button>
					<button className="object__variables__variable__actions--remove" onClick={this.removeVariable}>
						<img src={removeVariable} alt="Remove variable" />
					</button>
					<button onClick={this.moveVariableDown}>
						<img src={moveDown} alt="Move variable down" />
					</button>
				</div>

	
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
							autoComplete="off"
							placeholder="var-name"
						/>
					</label>
	
					<label>
						Type: 
						<input 
							type="text" 
							name="type"
							autoComplete="off"
							placeholder="var-type"
						/>
					</label>
	
					<label>
						{this.props.type === "reference" ? "References: " : "Value: "}
						{this.props.type === "reference" ? referenceField : valueField}
					</label>
				</form>
	
			</div>
		)
	}

}

export default Variable