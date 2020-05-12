import React, {useState, useEffect, useRef, useContext} from "react"
import {ArrowsContext} from "../../contexts/arrowsContext"

function Arrow(props) {
	const [width, setWidth] = useState(window.innerWidth)
	const [height, setHeight] = useState(window.innerHeight)

	const arrows = useContext(ArrowsContext)

	const arrowRef = useRef(null)

	useEffect(() => {
		// const {start, from} = props.data.coordinates
		// setWidth(end.X - start.X)
		// setHeight(end.Y)
		// setWidth(window.clientWidth)
		// setHeight(arrowRef.current.clientHeight)
	}, [arrows.arrows.filter(arrow => arrow.from.id === props.data.from.id && arrow.to === props.data.to)])

	function handleMouseOver() {
		console.log("Mouseover")
	}

	return (
		<svg 
			ref={arrowRef}
			width={width} 
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			fill="none" 
			xmlns="http://www.w3.org/2000/svg"
			onMouseOver={handleMouseOver}
		>
			<path 
				d={`
					M ${props.data.coordinates.start.X} ${props.data.coordinates.start.Y}
					L ${props.data.coordinates.end.X} ${props.data.coordinates.end.Y}
				`} 
				stroke="black" 
				strokeWidth="2" 
				pointerEvents="visible"
			/>
		</svg>
	)
}

export default Arrow