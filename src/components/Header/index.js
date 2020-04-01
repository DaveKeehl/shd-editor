import React from "react"
import addBlockButton from "../../images/add-block.svg"

function Header(props) {
	return (
		<header>
			<h1>{props.region.toUpperCase()} ({props.objectsCount})</h1>
			<button onClick={props.addBlock}>
				<img src={addBlockButton} alt="Add a block" />
			</button>
		</header>
	)
}

export default Header