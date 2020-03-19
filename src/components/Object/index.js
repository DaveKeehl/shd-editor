import React, { Component } from 'react';
import PrimitiveVariable from '../PrimitiveVariable'
// import ReferenceVariable from '../ReferenceVariable'

class Object extends Component {
	render() {
		return (
			<div className="object">
				<div className="top">
					<h2>Class</h2>
				</div>
				<div className="variables">
					<PrimitiveVariable/>
					<PrimitiveVariable/>
					<PrimitiveVariable/>
				</div>
				<div className="bottom">
					<div>
						<input type="radio" id="primitive" name="variable-type" value="primitive" checked/>
						<label htmlFor="primitive">Primitive</label>
						<input type="radio" id="reference" name="variable-type" value="reference"/>
						<label htmlFor="reference">Reference</label>
					</div>
					<button>Add a variable</button>
				</div>
			</div>
		)
	}
}

export default Object;