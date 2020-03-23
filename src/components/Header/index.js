import React from "react"
import addBlock from "../../images/add-block.svg"

function Header(props) {

	function handleClick() {
		console.log("click")
	}

	return (
		<header>
			<h1>{props.region}</h1>
			<button onClick={handleClick}>
				<img src={addBlock} alt="Add a block" />
			</button>
		</header>
	)
}

export default Header