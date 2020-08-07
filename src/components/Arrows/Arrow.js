import React, { useState, useEffect, useContext } from 'react'
import { ArrowsContext } from '../../contexts/arrowsContext'

function Arrow(props) {
	const arrows = useContext(ArrowsContext)

	const [width, setWidth] = useState(window.screen.width)
	const [height, setHeight] = useState(window.screen.height)
	const [isSelected, setIsSelected] = useState(() =>
		checkIsArrowSelected() === undefined ? false : true
	)

	const start = {
		X: props.coordinates.start.X,
		Y: props.coordinates.start.Y
	}

	const end = {
		X: props.coordinates.end.X,
		Y: props.coordinates.end.Y
	}

	const drawableArrow = getDrawableArrow(arrows.arrows)

	useEffect(() => {}, [drawableArrow])

	useEffect(() => {
		setIsSelected(checkIsArrowSelected() === undefined ? false : true)
	}, [arrows.selectedArrows])

	function checkIsArrowSelected() {
		const match = arrows.selectedArrows.find(
			(arrow) => arrow.from.id === props.from.id && arrow.to === props.to
		)
		return match
	}

	function getDrawableArrow(arrows) {
		arrows.find(
			(arrow) => arrow.from.id === props.from.id && arrow.to === props.to
		)
	}

	function handleClick() {
		arrows.toggleSelectedArrow(props)
	}

	function handleMouseDownOnStartHandle() {
		arrows.rebaseNewArrow(props, 'start')
	}

	function handleMouseDownOnEndHandle() {
		arrows.rebaseNewArrow(props, 'end')
	}

	return (
		<svg
			viewBox={`0 0 ${width} ${height}`}
			className={`arrow ${
				props.from.region === 'stack' ? 'arrow__stack' : 'arrow__heap'
			}`}
			style={{
				display: `${props.isDragged ? 'none' : 'block'}`,
				zIndex: `${props.zIndex + 1}`
			}}
			width={width}
			height={height}
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<marker
					id={`arrow${props.from.id}${props.to}`}
					viewBox="0 0 10 10"
					refX="8"
					refY="5"
					markerWidth="6"
					markerHeight="6"
					orient="auto-start-reverse"
				>
					<path
						d="M 0 0 L 10 5 L 0 10 z"
						className={`arrow__head ${
							isSelected ? 'arrow--selected' : ''
						}`}
					/>
				</marker>
			</defs>
			<path
				d={`
					M ${start.X} ${start.Y}
					L ${end.X} ${end.Y}
				`}
				className={`${isSelected ? 'arrow--selected' : ''}`}
				pointerEvents="visible"
				onClick={handleClick}
				markerEnd={`url(#arrow${props.from.id}${props.to})`}
			/>
			<circle
				cx={start.X}
				cy={start.Y}
				pointerEvents="visible"
				onMouseDown={handleMouseDownOnStartHandle}
			/>
			<circle
				cx={end.X}
				cy={end.Y}
				pointerEvents="visible"
				onMouseDown={handleMouseDownOnEndHandle}
			/>
		</svg>
	)
}

export default Arrow
