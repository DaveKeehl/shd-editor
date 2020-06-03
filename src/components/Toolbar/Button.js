import React, {useContext, useRef} from "react"
import {ArrowsContext} from "../../contexts/arrowsContext"
import {StateContext} from "../../contexts/stateContext"

function Button(props) {
	const app = useContext(StateContext)
	const {setSelectedArrows} = useContext(ArrowsContext)

	const inputRef = useRef(null)

	function handleClick() {
		if (props.action === "new-diagram") {
			// app.clearAll()
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
		else if (props.action === "toggle-fullscreen") {
			const getFullscreenElement = () => {
				return document.fullscreenElement
					|| document.webkitFullscreenElement
					|| document.mozFullscreenElement
					|| document.msFullscreenElement
			}
			if (getFullscreenElement()) {
				document.exitFullscreen()
			} else {
				document.documentElement.requestFullscreen().catch((e) => { console.log(e) })
			}
		}
	}

	function handleChange(event) {
		const file = event.target.files[0]
		app.uploadJSON(file)
		event.target.value = ''
	}

	return (
		<div className="toolbar__button">
			<span>
				{props.action.toUpperCase().replace("-", " ")}
			</span>
			{
				props.action === "upload-json" ?
				<label onClick={handleClick}>
					<img src={require(`../../images/${props.action}.svg`)} alt={props.action} />
					<input type="file" accept=".json" onChange={handleChange} ref={inputRef} />
				</label>
				:
				<button onClick={handleClick}>
					<img src={require(`../../images/${props.action}.svg`)} alt={props.action} />
				</button>
			}
		</div>
	)
}

export default Button