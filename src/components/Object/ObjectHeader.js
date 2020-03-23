import React, {Component} from "react"
import renameClass from "../../images/rename-class.svg"
import removeBlock from "../../images/remove-block.svg"

class ObjectHeader extends Component {
	constructor() {
		super()
		this.state = {
			className: ""
		}
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		const {name,value} = event.target
		this.setState({
			[name]: value
		})
	}

	handleKeyPress(event) {
		console.log(event.keyCode)
		if (event.keyCode === 13) {
			event.target.blur()
		}
	}

	render() {
		return (
			<div className="object__header">
				<label>
					<img 
						src={renameClass}
						alt="Rename the class"
					/>
					<input 
						type="text"
						name="className"
						value={this.state.className}
						placeholder="Class"
						onChange={this.handleChange}
						onKeyUp={this.handleKeyPress}
					/>
				</label>
				<img src={removeBlock} alt="Remove block" />
			</div>
		)
	}

}

export default ObjectHeader