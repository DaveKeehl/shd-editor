import React, {useContext} from "react"
import addBlock from "../../images/add-block.svg"
import SmartAddIcon from "./SmartAddIcon"
import {StateContext} from "../../contexts/stateContext"

function Header(props) {
	const app = useContext(StateContext)
	return (
		<header>
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