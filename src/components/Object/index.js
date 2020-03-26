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
			variables: []
		}
		this.updateName = this.updateName.bind(this)
		this.addVariable = this.addVariable.bind(this)
		this.removeVariable = this.removeVariable.bind(this)
		this.moveVariableUp = this.moveVariableUp.bind(this)
		this.moveVariableDown = this.moveVariableDown.bind(this)
	}

	updateName(name) {
		console.log(name)
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
				moveVariableUp={this.moveVariableUp}
				moveVariableDown={this.moveVariableDown}
			/>
		]
		const newVariables = this.state.variables.concat(newVariable)
		this.setState({
			totalVariablesCreated: newVariablesCount,
			variables: newVariables
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

	moveVariableUp(id) {
		let idx
		for (let i = 0; i < this.state.variables.length; i++) {
			if (this.state.variables[i].props.id === id) {
				idx = i
			}
		}
		if (this.state.variables.length > 1 && idx > 0) {
			console.log("can move up")
			let reorderedVariables = this.state.variables
			const temp = reorderedVariables[idx-1]
			reorderedVariables[idx-1] = reorderedVariables[idx]
			reorderedVariables[idx] = temp
			this.setState({ variables: reorderedVariables })
		}
	}
	
	moveVariableDown(id) {
		console.log(id)
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