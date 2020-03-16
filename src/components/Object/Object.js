import React, { Component } from 'react';
import PrimitiveVariable from './../PrimitiveVariable/PrimitiveVariable.js'
import ReferenceVariable from './../ReferenceVariable/ReferenceVariable.js';

class Object extends Component {
	render() {
		return (
			<div className="object">
				<h1 className="object__class" contentEditable="true">Class</h1>
				<div className="object__container">
					<PrimitiveVariable name="myVariable" type="myType" value="myValue"/>
					<PrimitiveVariable name="myVar2" type="myType2" value="305588438292"/>
				</div>
			</div>
		)
	}
}

export default Object;