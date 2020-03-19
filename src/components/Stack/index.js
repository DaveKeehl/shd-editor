import React, { Component } from 'react';
import Object from '../Object';

class Stack extends Component {
	render() {
		return (
			<div className="stack">
				<h1>STACK</h1>
				<div className="objects">
					<button>Create a new object</button>
					<Object/>
				</div>
			</div>
		)
	}
}

export default Stack;