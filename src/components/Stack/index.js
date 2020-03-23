import React, { Component } from 'react'
import ReactDOM from "react-dom"
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
		const newBlock = <Object key={this.state.objects.length} removeBlock={this.removeBlock} />
		this.setState(prevState => {
				return {
					objects: prevState.objects.concat(newBlock)
				}
			}
		)
		console.log(this.state.objects)
	}

	removeBlock(event) {
		const toRemove = event.target.parentNode.parentNode
		console.log(toRemove)
		ReactDOM.unmountComponentAtNode(toRemove)
	}

	render() {
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