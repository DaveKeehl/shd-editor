import React, {useState, useEffect, useContext} from "react"
import {StateContext} from "../../contexts/stateContext"
import {ArrowsContext} from "../../contexts/arrowsContext"
import {ResizableStackContext} from "../../contexts/resizableStackContext"

function Arrow(props) {
	const [width, setWidth] = useState(window.innerWidth)
	const [height, setHeight] = useState(window.innerHeight)
	const [coordinates, setCoordinates] = useState({
		start: {
			X: props.data.coordinates.start.X,
			Y: props.data.coordinates.start.Y
		},
		end: {
			X: props.data.coordinates.end.X,
			Y: props.data.coordinates.end.Y
		}
	})

	const app = useContext(StateContext)
	const arrows = useContext(ArrowsContext)
	const {stackWidth} = useContext(ResizableStackContext)

	useEffect(() => {
			console.log("re-rendered")
			const currentArrow = arrows.arrows.find(arrow => arrow.from.id === props.data.from.id && arrow.to === props.data.to)
			console.log(currentArrow)
			setCoordinates({
				start: {
					X: currentArrow.coordinates.start.X,
					Y: currentArrow.coordinates.start.Y
				},
				end: {
					X: currentArrow.coordinates.end.X,
					Y: currentArrow.coordinates.end.Y
				}
			})
	}, [arrows.arrows.find(arrow => arrow.from.id === props.data.from.id && arrow.to === props.data.to)])

	// function getDrawableArrows(arrows) {
	// 	arrows.filter(arrow => arrow.from.id === props.data.from.id && arrow.to === props.data.to)
	// }

	function handleMouseOver() {
		// console.log("Mouseover")
	}

	return (
		<svg 
			width={width} 
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			fill="none" 
			xmlns="http://www.w3.org/2000/svg"
			onMouseOver={handleMouseOver}
		>
			<path 
				d={`
					M ${coordinates.start.X} ${coordinates.start.Y}
					L ${coordinates.end.X} ${coordinates.end.Y}
				`} 
				stroke="black" 
				strokeWidth="2" 
				pointerEvents="visible"
			/>
		</svg>
	)
}

export default Arrow