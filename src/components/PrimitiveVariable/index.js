import React, { Component } from 'react';

class PrimitiveVariable extends Component {
	render() {
		return (
			<div className="variable primitive">
				<p>Name: </p>
				<p contentEditable="true">var-name</p>
				<br/>
				<label htmlFor="type">Type: </label>
				<input type="text" name="type" id="type"/>
				<br/>
				<label htmlFor="value">Value: </label>
				<input type="text" name="value" id="value"/>
			</div>
		)
	}
}

export default PrimitiveVariable;