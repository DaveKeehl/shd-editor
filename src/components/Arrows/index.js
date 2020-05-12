import React, {useState, useEffect, useContext} from "react"
import Arrow from "./Arrow"
import {ArrowsContext} from "../../contexts/arrowsContext"

function Arrows() {
	const [arrows, setArrows] = useState([])

	const {arrows: arrowsData} = useContext(ArrowsContext)

	useEffect(() => {
		const idx = arrowsData.length-1
		if (idx >= 0) {
			const arrow = (
				<Arrow 
					key={[arrowsData[idx].from.id, arrowsData[idx].to]} 
					data={arrowsData[idx]} 
				/>
			)
			setArrows(prev => ([...prev, arrow]))
		}
	}, [arrowsData.length])

	return (
		<div className="arrows">
			{arrows}
		</div>
	)
}

export default Arrows