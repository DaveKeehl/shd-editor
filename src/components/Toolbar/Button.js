import React, {useState, useContext, useRef, useEffect} from "react"
import {ArrowsContext} from "../../contexts/arrowsContext"
import {StateContext} from "../../contexts/stateContext"

function Button(props) {
	const [isFullscreen, setIsFullscreen] = useState(false)

	const app = useContext(StateContext)
	const {setSelectedArrows} = useContext(ArrowsContext)

	const inputRef = useRef(null)

	document.onfullscreenchange = () => {
		setIsFullscreen(prev => !prev)
	}

	function getFullscreenElement() {
		return document.fullscreenElement
			|| document.webkitFullscreenElement
			|| document.mozFullscreenElement
			|| document.msFullscreenElement
	}

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
			if (isFullscreen) {
				document.exitFullscreen()
			} else {
				document.documentElement.requestFullscreen().catch(console.log)
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
				<button 
					onClick={handleClick} 
				>
					<img src={require(`../../images/${props.action}${isFullscreen ? '-selected' : ''}.svg`)} alt={props.action} />
				</button>
			}
		</div>
	)
}

export default Button