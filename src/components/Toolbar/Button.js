import React, {useContext} from "react"
import {ArrowsContext} from "../../contexts/arrowsContext"
import {StateContext} from "../../contexts/stateContext"

function Button(props) {
	const app = useContext(StateContext)
	const {setSelectedArrows} = useContext(ArrowsContext)

	function handleClick() {
		if (props.action === "new-diagram") {
			app.clearAll()
			// app.setStack([])
			// app.setHeap([])
		}
		else if (props.action === "delete-arrows") {
			app.clearConnections(setSelectedArrows)
		}
		else if (props.action === "download-json") {
			app.downloadJSON()
		}
		else if (props.action === "upload-json") {
			app.uploadJSON()
		}
		else if (props.action === "scale-up") {
			//
		}
		else if (props.action === "scale-down") {
			//
		}
	}

	return (
		props.action === "upload-json" ?
		<label onClick={handleClick} data-tooltip={props.action.toUpperCase().replace("-", " ")}>
			{/* <img src={`../../images/${props.action}.svg`} alt={props.action} /> */}
			{/* <p>{props.action}</p> */}
			<input type="file" />
		</label>
		:
		<button onClick={handleClick} data-tooltip={props.action.toUpperCase().replace("-", " ")}>
			{/* <img src={`../../images/${props.action}.svg`} alt={props.action} /> */}
			{/* <p>{props.action}</p> */}
		</button>
	)
}

export default Button