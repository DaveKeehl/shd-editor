import React, {useState} from "react"
import ObjectHeader from "../Object/ObjectHeader"
import Variable from "../Object/Variable"

class HeapObject extends React.Component {
	state = {
		name: "",
		count: 0,
		variables: [],
		position: {
			X: this.props.initialPosition.X,
			Y: this.props.initialPosition.Y
		},
		isDragged: false
	}


	updateName = (newName) => {
		this.setState({name: newName})
	}

	addVariable = (nature) => {
		const newVariable = (
			<Variable 
				key={this.state.count} 
				id={this.state.count} 
				nature={nature}
				removeVariable={this.removeVariable}
			/>
		)
		this.setState(prevState => ({count: prevState.count+1}))
		this.setState(prevState => ({variables: [...prevState.variables, newVariable]}))
	}

	removeVariable = (id) => {
		this.setState(prevState => ({variables: prevState.variables.filter(variable => id !== variable.props.id)}))
	}

	handleMouseMove = (event) => {
		const {clientX, clientY} = event
		if (this.state.isDragged) {
			console.log(`X: ${clientX}, Y: ${clientY}`)
			this.setState({position: {X: clientX-360-10-20-160, Y: clientY-20-55-23}})
		}
	}

	render() {
		return (
			<div 
				className="object" 
				draggable={false}
				onMouseMove={this.handleMouseMove}
				style={{transform: `translate(${this.state.position.X}px, ${this.state.position.Y}px)`}}
			>
				<div 
					className="object__drag-handle"
					onMouseDown={() => this.setState({isDragged: true})}
					onMouseUp={() => this.setState({isDragged: false})}
				>
				</div>
				<ObjectHeader 
					id={this.props.id} 
					region="heap"
					updateName={this.updateName}
					removeBlock={this.props.removeBlock}
				/>
				<div>{this.state.variables}</div>
				<div 
					className="object__separator" 
					style={this.state.variables.length > 0 ? {display: "block"} : {display: "none"}}
				></div>
				<div className="object__buttons">
					<button onClick={() => {this.addVariable("primitive")}}>Add Prim.</button>
					<button onClick={() => {this.addVariable("reference")}}>Add Ref.</button>
				</div>
			</div>
		)
	}

}

export default HeapObject