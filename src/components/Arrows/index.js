import React, {useState, useEffect, useContext} from "react"
import NewArrow from "./newArrow"
import Arrow from "./Arrow"
import {ArrowsContext} from "../../contexts/arrowsContext"

function Arrows() {
	const [arrows, setArrows] = useState([])

	const {arrows: arrowsData} = useContext(ArrowsContext)
	
	useEffect(() => {
		const newArrows = arrowsData.map(arrow => {
			return (
				<Arrow 
					key={[arrow.from.id, arrow.to]}
					from={arrow.from}
					to={arrow.to}
					coordinates={arrow.coordinates}
					zIndex={arrow.zIndex}
					isDragged={arrow.isDragged}
				/>
			)
		})
		setArrows(newArrows)
	}, [arrowsData])

	return (
		<div className="arrows">
			<NewArrow />
			{arrows}
		</div>
	)
}

export default React.memo(Arrows)