import React, { Component } from 'react'
import ObjectHeader from './ObjectHeader'
import Variables from './Variables'
import NewVariableForm from './NewVariableForm'

class Object extends Component {
	render() {
		return (
			<div className="object">
				<ObjectHeader removeBlock={this.props.removeBlock}/>
				<Variables />
				<NewVariableForm />
			</div>
		)
	}
}

export default Object