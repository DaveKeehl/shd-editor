import React, {useState, useContext, useEffect, useRef} from "react"
import {StateContext} from "../../contexts/stateContext"
import removeBlock from "../../images/delete-icon.svg"
import {utils} from "../../utils"

function ObjectHeader(props) {
	const [className, setClassName] = useState("")

	const app = useContext(StateContext)

	const headerRef = useRef(null)

	// LOAD COMPUTED CSS VALUE WHEN COMPONENT MOUNTS
	useEffect(() => {
		// BLOCK_HEADER_HEIGHT
		const height = parseInt(window.getComputedStyle(headerRef.current).getPropertyValue("height"))
		utils.functions.updateConstantValue("BLOCK_HEADER_HEIGHT", height)
	}, [])

	function handleClick() {
		props.removeBlock(props.id)
		if (props.region === "heap") {
			app.resetVariablesValueAfterArrowDeletion(props.id)
		}
	}

	function handleChange(event) {
		const {value} = event.target
		setClassName(value)
		props.updateName(value)
	}

	function handleKeyUp(event) {
		if (event.keyCode === 13) {
			event.target.blur()
		}
	}

	return (
		<div 
			className="object__header"
			ref={headerRef}
		>
			<input 
				type="text"
				name="className"
				value={className}
				placeholder={props.region === "stack" ? "Class.method()" : "Class"}
				onChange={handleChange}
				onKeyUp={handleKeyUp}
				autoComplete="off"
				spellCheck={false}
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