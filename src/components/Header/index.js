import React from "react"
import addBlock from "../../images/add-block.svg"
import SmartAddIcon from "./SmartAddIcon"

function Header(props) {
	return (
		<header>
			<h1>{props.region.toUpperCase()} ({props.objectsCount})</h1>
			{props.region === "stack" ?
				<button onClick={props.addBlock}>
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