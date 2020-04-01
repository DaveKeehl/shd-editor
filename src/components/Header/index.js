import React from "react"
import addBlockButton from "../../images/add-block.svg"

function Header(props) {
	return (
		<header>
			<h1>{props.region.toUpperCase()} (0)</h1>
			<button>
				<img src={addBlockButton} alt="Add a block" />
			</button>
		</header>
	)
}

export default Header