import React, { Component } from 'react';

class PrimitiveVariable extends Component {
	render() {
		return (
			<div className="variable primitive">
				<p className="variable__type" contentEditable="true">Type</p>
				<p className="variable__name" contentEditable="true">Name</p>
				<p className="variable__value" contentEditable="true">Value</p>
			</div>
		)
	}
}

export default PrimitiveVariable;