import React, {Component} from "react"
import renameClass from "../../images/rename-class.svg"
import removeBlock from "../../images/remove-block.svg"

class ObjectHeader extends Component {
	constructor() {
		super()
		this.state = {
			className: ""
		}
		this.removeBlock = this.removeBlock.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	removeBlock() {
		this.props.removeBlock(this.props.id)
	}

	handleChange(event) {
		const {name,value} = event.target
		this.setState({
			[name]: value
		})
	}

	handleKeyPress(event) {
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
						placeholder="Class name"
						onChange={this.handleChange}
						onKeyUp={this.handleKeyPress}
					/>
				</label>
				<img 
					className="object__header--remove"
					src={removeBlock} 
					alt="Remove block" 
					
				/>
			</div>
		)
	}

}

export default ObjectHeader