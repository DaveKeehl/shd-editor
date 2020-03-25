import React, { Component } from 'react'
import Header from '../Header'
import Object from '../Object'

class Stack extends Component {
	constructor() {
		super()
		this.state = {
			objects: []
		}
		this.addBlock = this.addBlock.bind(this)
		this.removeBlock = this.removeBlock.bind(this)
	}

	addBlock() {
		const newBlock = [
			<Object 
				key={this.state.objects.length}
				id={this.state.objects.length}
			/>
		]
		this.setState(prevState => {
				return {
					objects: newBlock.concat(prevState.objects)
				}
			}
		)
	}

	removeBlock(id) {
		console.log(id)
		const newObjectsList = []
		for (let i = 0; i < this.state.objects.length; i++) {
			if (i !== id) {
				newObjectsList.push(this.state.objects[i])
			}
		}
		this.setState({
			objects: newObjectsList
		})
	}

	render() {
		const objects = this.state.objects
		return (
			<div className="stack">
				<Header region="STACK" addBlock={this.addBlock} />
				<div className="stack__objects">
					{objects}
				</div>
			</div>
		)
	}
}

export default Stack