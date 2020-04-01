import React, { Component } from 'react'
import ObjectHeader from './ObjectHeader'
import Variable from './Variable'
import NewVariableForm from './NewVariableForm'

class Object extends Component {
	constructor() {
		super()
		this.state = {
			name: "",
			totalVariablesCreated: 0,
			variables: [],
			topVariableKey: "",
			bottomVariableKey: ""
		}
		this.updateName = this.updateName.bind(this)
		this.addVariable = this.addVariable.bind(this)
		this.removeVariable = this.removeVariable.bind(this)
		this.reorderVariable = this.reorderVariable.bind(this)
	}

	updateName(name) {
		// console.log(name)
		this.setState({ name: name })
	}

	addVariable(nature) {
		const newVariablesCount = this.state.totalVariablesCreated+1
		const newVariable = [
			<Variable 
				key={newVariablesCount} 
				id={newVariablesCount} 
				nature={nature}
				removeVariable={this.removeVariable}
				reorderVariable={this.reorderVariable}
			/>
		]
		const newVariables = this.state.variables.concat(newVariable)
		this.setState({
			totalVariablesCreated: newVariablesCount,
			variables: newVariables,
			topVariableKey: newVariables[0].props.id
		})
	}

	removeVariable(id) {
		// console.log(id)
		this.setState(prevState => {
			return {
				variables: prevState.variables.filter(variable => id !== variable.props.id)
			}
		})
	}

	reorderVariable(direction, id) {
		let idx
		let reorderedVariables = this.state.variables
		for (let i = 0; i < this.state.variables.length; i++) {
			if (this.state.variables[i].props.id === id) {
				idx = i
			}
		}
		if (direction === "up") {
			if (reorderedVariables.length > 1 && idx > 0) {
				// console.log("can move up")
				const temp = reorderedVariables[idx-1]
				reorderedVariables[idx-1] = reorderedVariables[idx]
				reorderedVariables[idx] = temp
			}
		} else {
			if (reorderedVariables.length > 1 && idx >= 0 && idx < reorderedVariables.length-1) {
				// console.log("can move down")
				const temp = reorderedVariables[idx+1]
				reorderedVariables[idx+1] = reorderedVariables[idx]
				reorderedVariables[idx] = temp
			}
		}
		this.setState({ variables: reorderedVariables })
	}

	render() {
		const background = {
			background: "linear-gradient(180deg, #4A59A7 0%, #16298A 100%)"
		}
		
		return (
			<div 
				className="object" 
				style={this.props.region === "heap" ? background : null}
			>
				<ObjectHeader 
					id={this.props.id} 
					updateName={this.updateName}
					removeBlock={this.props.removeBlock}
				/>
				<div className="object__variables">{this.state.variables}</div>
				<NewVariableForm addVariable={this.addVariable} />
			</div>
		)
	}
}

export default Object