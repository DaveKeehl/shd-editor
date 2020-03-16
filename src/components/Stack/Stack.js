import React, { Component } from 'react';
import StackFrame from '../StackFrame/StackFrame.js';

class Stack extends Component {
	render() {
		return (
			<div className="stack">
				<StackFrame/>
				<StackFrame/>
			</div>
		)
	}
}

export default Stack;