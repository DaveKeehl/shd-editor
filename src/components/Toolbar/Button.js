import React, {useContext, useRef} from "react"
import {ArrowsContext} from "../../contexts/arrowsContext"
import {StateContext} from "../../contexts/stateContext"

function Button(props) {
	const app = useContext(StateContext)
	const {setSelectedArrows} = useContext(ArrowsContext)

	const test = useRef(null)
	const inputRef = useRef(null)

	function handleClick() {
		if (props.action === "new-diagram") {
			app.clearAll()
			// app.setStack([])
			// app.setHeap([])
			// test.current.requestFullscreen()
		}
		else if (props.action === "delete-arrows") {
			app.clearConnections(setSelectedArrows)
		}
		else if (props.action === "download-json") {
			app.downloadJSON()
		}
		else if (props.action === "scale-up") {
			//
		}
		else if (props.action === "scale-down") {
			//
		}
	}

	function handleChange(event) {
		console.log("change")
		const file = event.target.files[0]
		app.uploadJSON(file)
		event.target.value = ''
	}

	return (
		props.action === "upload-json" ?
		<label onClick={handleClick} data-tooltip={props.action.toUpperCase().replace("-", " ")}>
			{/* <img src={`../../images/${props.action}.svg`} alt={props.action} /> */}
			{/* <p>{props.action}</p> */}
			<input type="file" accept=".json" onChange={handleChange} ref={inputRef} />
		</label>
		:
		<button ref={test} onClick={handleClick} data-tooltip={props.action.toUpperCase().replace("-", " ")}>
			{/* <img src={`../../images/${props.action}.svg`} alt={props.action} /> */}
			{/* <p>{props.action}</p> */}
		</button>
	)
}

export default Button