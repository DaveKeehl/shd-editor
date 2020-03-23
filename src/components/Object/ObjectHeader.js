import React from "react"
import renameClass from "../../images/rename-class.svg"
import removeBlock from "../../images/remove-block.svg"

function ObjectHeader(props) {
	return (
		<div className="object__header">
			<div>
				<img src={renameClass} alt="Rename the class" />
				<h2>{props.Class}</h2>
			</div>
			<img src={removeBlock} alt="Remove block" />
		</div>
	)
}

export default ObjectHeader