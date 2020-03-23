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

	addBlock(event) {
		const newBlock = 
			<Object 
				key={this.state.objects.length}  
				id={this.state.objects.length}  
				removeBlock={this.removeBlock} 
			/>
		this.setState(prevState => {
				return {
					objects: prevState.objects.concat(newBlock)
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
		console.log(this.state.objects)
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