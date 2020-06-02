import React, {useContext} from "react"
import {StateContext} from "../../contexts/stateContext"

function Button(props) {
	const app = useContext(StateContext)

	function handleClick() {
		if (props.action === "new-diagram") {
			// app.clearAll()
			app.clearConnections()
		}
		else if (props.action === "download-json") {
			app.downloadJSON()
		}
		else if (props.action === "upload-json") {

		}
	}

	return (
		<button onClick={handleClick}>
			{/* <img src={`../../images/${props.action}.svg`} alt={props.action} /> */}
			<p>{props.action}</p>
		</button>
	)
}

export default Button