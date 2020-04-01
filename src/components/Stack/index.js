import React, { useState } from "react"
import Header from "../Header"
// import Object from "../Object"

function Stack() {
	// const {totalObjectsCreated, setTotalObjectsCreated} = useState(0)
	const {objects, setObjects} = useState([])

	// addBlock = () => {
	// 	const newBlock = <Object 
	// 						key={newObjectsCount}  
	// 						id={newObjectsCount}  
	// 						region="stack"
	// 						removeBlock={this.removeBlock} 
	// 					/>
	// 	setTotalObjectsCreated(oldCount => oldCount+1)
	// 	setObjects(existingBlocks => [newBlock, ...existingBlocks])
	// }

	// removeBlock = (id) => {
		// setObjects(objects => objects.filter(object => id !== object.props.id))
	// }

	
	return (
		<div className="stack">
			<Header 
				region="stack" 
				 
			/>
			{/* <div className="stack__objects">
				{this.state.objects}
			</div> */}
		</div>
	)
}

export default Stack