import React, { Component } from 'react'
import Header from '../Header'
import Object from '../Object'

class Stack extends Component {
	render() {
		return (
			<div className="stack">
				<Header region="STACK" />
				<div className="stack__objects">
					<Object/>
				</div>
			</div>
		)
	}
}

export default Stack