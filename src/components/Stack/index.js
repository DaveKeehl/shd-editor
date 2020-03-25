import React, { Component } from 'react'
import Header from '../Header'
import Object from '../Object'

class Stack extends Component {
	constructor() {
		super()
		this.state = {
			totalObjectsCount: 0,
			objects: []
		}
		this.addBlock = this.addBlock.bind(this)
		this.removeBlock = this.removeBlock.bind(this)
	}

	addBlock() {
		const newObjectsCount = this.state.totalObjectsCount+1
		this.setState(prevState => {
			return {
				totalObjectsCount: newObjectsCount
			}
		})
		const newBlock = [
			<Object 
				key={newObjectsCount}  
				id={newObjectsCount}  
				removeBlock={this.removeBlock} 
			/>
		]
		const newObjects = newBlock.concat(this.state.objects)
		this.setState({objects: newObjects})
	}

	removeBlock(id) {
		const newObjectsList = []
		for (let i = 0; i < this.state.objects.length; i++) {
			if (id !== this.state.objects[i].props.id) {
				newObjectsList.push(this.state.objects[i])
			}
		}
		this.setState({
			objects: newObjectsList
		})
	}

	render() {
		console.log(this.state)
		return (
			<div className="stack">
				<Header region="STACK" addBlock={this.addBlock} />
				<div className="stack__objects">
					{this.state.objects}
				</div>
			</div>
		)
	}
}

export default Stack