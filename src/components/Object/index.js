import React, { Component } from 'react'
import ObjectHeader from './ObjectHeader'
import Variable from './Variable'
import NewVariableForm from './NewVariableForm'

class Object extends Component {
	constructor() {
		super()
		this.state = {
			totalVariablesCreated: 0,
			variables: []
		}
		this.addVariable = this.addVariable.bind(this)
		this.removeVariable = this.removeVariable.bind(this)
	}

	addVariable(type) {
		const newVariablesCount = this.state.totalVariablesCreated+1
		const newVariable = [
			<Variable 
				key={newVariablesCount} 
				id={newVariablesCount} 
				type={type}
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
		console.log(id)
		this.setState(prevState => {
			return {
				variables: prevState.variables.filter(variable => id !== variable.props.id)
			}
		})
	}

	moveVariableUp(message) {
		console.log(message)
	}
	
	moveVariableDown(message) {
		console.log(message)
	}

	render() {
		// console.log(this.state)
		return (
			<div className="object">
				<ObjectHeader id={this.props.id} removeBlock={this.props.removeBlock}/>
				<div className="object__variables">{this.state.variables}</div>
				<NewVariableForm addVariable={this.addVariable} />
			</div>
		)
	}
}

export default Object