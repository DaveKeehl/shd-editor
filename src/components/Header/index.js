import React, {useContext, useEffect, useRef} from "react"
import addBlock from "../../images/add-block.svg"
import SmartAddIcon from "./SmartAddIcon"
import {StateContext} from "../../contexts/stateContext"
import {utils} from "../../utils"

function Header(props) {
	const app = useContext(StateContext)
	const headerRef = useRef(null)

	useEffect(() => {
		utils.constants.HEADER_HEIGHT = parseInt(window.getComputedStyle(headerRef.current).getPropertyValue("height"))
	}, [])

	return (
		<header ref={headerRef}>
			<h1 onClick={() => app.downloadJSON()}>{props.region.toUpperCase()} ({props.objectsCount})</h1>
			{props.region === "stack" ?
				<button onClick={props.addBlock} aria-label="Create new object">
					<img src={addBlock} alt="Add a Stack Frame"/>
				</button>
				:
				<button>
					<SmartAddIcon />
				</button>
			}

		</header>
	)
}

export default Header