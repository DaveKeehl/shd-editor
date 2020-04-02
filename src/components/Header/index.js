import React from "react"
import SmartAddIcon from "./SmartAddIcon"

function Header(props) {
	return (
		<header>
			<h1>{props.region.toUpperCase()} ({props.objectsCount})</h1>
			<button>
				<SmartAddIcon />
			</button>
		</header>
	)
}

export default Header