import React, {useState} from "react"

const ArrowsContext = React.createContext()

function ArrowsContextProvider(props) {
	const [arrows, setArrows] = useState([])
	const [newArrow, setNewArrow] = useState({
		from: {
			region: "",
			parentId: "",
			id: ""
		},
		to: "",
		coordinates: {
			start: {
				X: "",
				Y: ""
			},
			end: {
				X: "",
				Y: ""
			}
		}
	})
	const [stackScrollAmount, setStackScrollAmount] = useState(0)
	const [isArrowDragged, setIsArrowDragged] = useState(false)

	// FROM: the refence variable that started the new arrow
	function setFrom(from) {
		const {region, parentId, id} = from
		setNewArrow(prev => ({...prev, from: {
			region: region,
			parentId: parentId,
			id: id
		}}))
	}

	// TO: the heap object on which the new arrow is released
	function setTo(to) {
		setNewArrow(prev => ({...prev, to: to}))
	}

	// START: set of absolute coordinates where the new arrow starts
	function setStart(start) {
		const {X,Y} = start
		setNewArrow(prev => ({
			...prev, 
			coordinates: {
				start: {
					X: X,
					Y: Y
				},
				end: prev.coordinates.end
			}
		}))
	}

	// END: set of absolute coordinates where the new arrow ends
	function setEnd(end) {
		const {X,Y} = end
		setNewArrow(prev => ({
			...prev, 
			coordinates: {
				...prev.coordinates,
				end: {
					X: X,
					Y: Y
				}
			}
		}))
	}

	function computeIntersection(A, B, width, height) {
		console.log(`width: ${width}, height: ${height}`)
		console.log(`A: {${A.X}, ${A.Y}}, B: {${B.X}, ${B.Y}}`)
		const {X: x1, Y: y1} = A
		const {X: x2, Y: y2} = B
		const intersection = {X: "", Y: ""}
		const slope = (y2 - y1) / (x2 - x1)
		const horizontalTest = slope * (width/2)
		const verticalTest = (height/2) / slope
		const horLimit = height / 2
		const verLimit = width / 2
		let edge = ""
		console.log(`slope: ${slope}`)
		console.log(`leftLimit: ${-horLimit}, horizontalTest: ${horizontalTest}, rightLimit: ${horLimit}`)
		console.log(`topLimit: ${-verLimit}, verticalTest: ${verticalTest}, rightLimit: ${verLimit}`)
		if (horizontalTest >= -horLimit && horizontalTest <= horLimit) {
			if (x1 < x2) {
				edge = "left"
			} 
			else if (x1 > x2) {
				edge = "right"
			}
		}
		else if (verticalTest >= -verLimit && verticalTest <= verLimit) {
			if (y1 < y2) {
				edge = "top"
			} 
			else if (y1 > y2) {
				edge = "bottom"
			}
		}
		console.log(edge)
		if (edge === "left" || edge === "right") {
			if (edge === "left") {
				intersection.X = x2 - (width/2)
				intersection.Y = y2 - slope * (width/2)
			} else {
				intersection.X = x2 + (width/2)
				intersection.Y = y2 + slope * (width/2)
			}
		}
		else if (edge === "top" || edge === "bottom") {
			if (edge === "top") {
				intersection.X = x2 - (height/2) / slope
				intersection.Y = y2 - (height/2)
			} else {
				intersection.X = x2 + (height/2) / slope
				intersection.Y = y2 + (height/2)
			}
		}
		console.log(`Intersection at: {${intersection.X}, ${intersection.Y}}`)
		return intersection
	}

	const states = {
		arrows, setArrows,
		newArrow,
		setFrom,
		setTo,
		setStart,
		setEnd,
		stackScrollAmount, setStackScrollAmount,
		isArrowDragged, setIsArrowDragged,
		computeIntersection
	}

	return (
		<ArrowsContext.Provider value={states}>
			{props.children}
		</ArrowsContext.Provider>
	)
}

export {ArrowsContextProvider, ArrowsContext}