import React, { Component } from 'react'
import Header from '../Header'
import Object from '../Object'

class Stack extends Component {
	constructor() {
		super()
		this.state = {
			totalObjectsCreated: 0,
			objects: []
		}
		this.addBlock = this.addBlock.bind(this)
		this.removeBlock = this.removeBlock.bind(this)
	}

	addBlock() {
		const newObjectsCount = this.state.totalObjectsCreated+1
		const newBlock = [
			<Object 
				key={newObjectsCount}  
				id={newObjectsCount}  
				region="stack"
				removeBlock={this.removeBlock} 
			/>
		]
		const newObjects = newBlock.concat(this.state.objects)
		this.setState({
			totalObjectsCreated: newObjectsCount,
			objects: newObjects
		})
	}

	removeBlock(id) {
		this.setState(prevState => {
			return {
				objects: prevState.objects.filter(object => id !== object.props.id)
			}
		})
	}

	render() {
		// console.log(this.state)
		return (
			<div className="stack">
				<Header 
					region="stack" 
					numberOfObjects={this.state.objects.length} 
					addBlock={this.addBlock} 
				/>
				<div className="stack__objects">
					{this.state.objects}
				</div>
			</div>
		)
	}
}

export default Stack