import React, {useState, useContext} from "react"
import {StateContext} from "../../contexts/stateContext"
import {ArrowsContext} from "../../contexts/arrowsContext"
import removeBlock from "../../images/delete-icon.svg"

function ObjectHeader(props) {
	const [className, setClassName] = useState("")

	const app = useContext(StateContext)
	const arrows = useContext(ArrowsContext)

	function handleClick() {
		props.removeBlock(props.id)

		if (props.region === "heap") {
			// console.log(`object with id ${props.id} is now being deleted`)
			updateVariableValues(app.diagram, props.id)
		}

		// console.log(app.diagram.stack.find(frame => frame.id === props.id))
		
		// console.log(props.id)
		// console.log(arrows.arrows)

		// ARROWS TO BE DELETED
		// const updatedArrows = arrows.arrows.filter(arrow => arrow.from.parentId === props.id)
		
		// console.log(updatedArrows)
		// arrows.setArrows(updatedArrows)

	}

	function updateVariableValues(diagram, objectID) {
		const {stack, heap} = diagram

		stack.forEach(frame => {
			frame.variables.forEach(variable => {
				// console.log(variable)
				if (variable.nature === "reference" && variable.value === objectID) {
					app.setVariableData("stack", frame.id, variable.id, {name: "value", value: ""})
				}
			})
		})
		heap.forEach(object => {
			object.variables.forEach(variable => {
				if (variable.nature === "reference" && variable.value === objectID) {
					app.setVariableData("heap", object.id, variable.id, {name: "value", value: ""})
				}
			})
		})
		// console.log("end update value")
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
		<div className="object__header">
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