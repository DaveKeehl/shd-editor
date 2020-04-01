import React, { useState } from "react"
import removeBlock from "../../images/delete-icon.svg"

function ObjectHeader(props) {
	const [className, setClassName] = useState("")

	function handleClick() {
		props.removeBlock(props.id)
	}

	function handleChange(event) {
		const {value} = event.target
		setClassName(value)
		props.updateName(value)
	}

	function handleKeyPress(event) {
		if (event.keyCode === 13) {
			event.target.blur()
		}
	}

	return (
		<div className="object__header">
			<input 
				type="text"
				name="className"
				value={className}
				placeholder="Class.method()"
				onChange={handleChange}
				onKeyUp={handleKeyPress}
				autoComplete="off"
			/>
			<button 
				className="object__header--remove" 
				onClick={handleClick}
			>
				<img src={removeBlock} alt="Remove block"/>
			</button>

		</div>
	)
}

export default ObjectHeader