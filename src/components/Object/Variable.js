import React, {Component} from "react"
import ReactDOM from "react-dom"
import removeVariable from "../../images/remove-variable.svg"
import moveUp from "../../images/move-up.svg"
import moveDown from "../../images/move-down.svg"
import variableContainer from "../../images/variable-container.svg"
import circle from "../../images/circle.svg"

class Variable extends Component {
	constructor() {
		super()
		this.state = {
			nature: "",
			name: "",
			type: "",
			value: "",
			canMoveUp: "",
			canMoveDown: ""
		}
		this.removeVariable = this.removeVariable.bind(this)
		this.moveVariableUp = this.moveVariableUp.bind(this)
		this.moveVariableDown = this.moveVariableDown.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	componentDidMount() {
		this.setState({ nature: this.props.nature })
		const variable = ReactDOM.findDOMNode(this)
		const variablesList = ReactDOM.findDOMNode(this).parentNode.childNodes
		const length = variablesList.length
		console.log(variablesList)
		// console.log(`idx: ${idx}, length: ${length}`)
	}

	removeVariable() {
		this.props.removeVariable(this.props.id)
	}

	moveVariableUp() {
		this.props.reorderVariable("up", this.props.id)
	}

	moveVariableDown() {
		this.props.reorderVariable("down", this.props.id)
	}

	handleChange(event) {
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}

	render() {
		const valueField = <input 
								nature="text" 
								name="value"
								value={this.state.value}
								autoComplete="off"
								placeholder="var-value"
								onChange={this.handleChange}
							/>
		const referenceField = <div><img src={circle} alt="Reference link" /></div>
		const visibility = this.props.variablesCount < 1 ? {display: "none"} : {display: "block"}

		return (
			<div className="object__variables__variable">
	
				<div className="object__variables__variable__actions">
					<button onClick={this.moveVariableUp} style={visibility}>
						<img src={moveUp} alt="Move variable up" />
					</button>

					<button 
						className="object__variables__variable__actions--remove" 
						onClick={this.removeVariable}
					>
						<img src={removeVariable} alt="Remove variable" />
					</button>

					<button onClick={this.moveVariableDown} style={visibility}>
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
							nature="text" 
							name="name"
							value={this.state.name}
							autoComplete="off"
							placeholder="var-name"
							onChange={this.handleChange}
						/>
					</label>
	
					<label>
						Type: 
						<input 
							nature="text" 
							name="type"
							value={this.state.type}
							autoComplete="off"
							placeholder="var-type"
							onChange={this.handleChange}
						/>
					</label>
	
					<label>
						{this.props.nature === "reference" ? "References: " : "Value: "}
						{this.props.nature === "reference" ? referenceField : valueField}
					</label>
				</form>
	
			</div>
		)
	}

}

export default Variable