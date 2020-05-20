import React, {useState, useEffect, useContext} from "react"
import NewArrow from "./newArrow"
import Arrow from "./Arrow"
import {StateContext} from "../../contexts/stateContext"
import {ArrowsContext} from "../../contexts/arrowsContext"

function Arrows() {
	const [arrows, setArrows] = useState([])

	const {arrows: arrowsData} = useContext(ArrowsContext)
	
	useEffect(() => {
		const newArrows = arrowsData.map(arrow => {
			return (
				<Arrow 
					key={[arrow.from.id, arrow.to]}
					data={arrow}
				/>
			)
		})
		setArrows(newArrows)
	}, [arrowsData])

	// useEffect(() => {
	// 	const idx = arrowsData.length-1
	// 	if (idx >= 0) {
	// 		const arrow = (
	// 			<Arrow 
	// 				key={[arrowsData[idx].from.id, arrowsData[idx].to]} 
	// 				data={arrowsData[idx]} 
	// 			/>
	// 		)
	// 		setArrows(prev => ([...prev, arrow]))
	// 	}
	// }, [arrowsData.length])

	return (
		<div className="arrows">
			<NewArrow />
			{arrows}
		</div>
	)
}

export default Arrows