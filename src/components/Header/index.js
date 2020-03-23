import React from "react"
import addBlock from "../../images/add-block.svg"

function Header(props) {

	return (
		<header>
			<h1>{props.region}</h1>
			<button onClick={props.addBlock}>
				<img src={addBlock} alt="Add a block" />
			</button>
		</header>
	)
}

export default Header