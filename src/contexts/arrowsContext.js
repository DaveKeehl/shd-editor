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
		console.log(B)
		const {X: x1, Y: y1} = A
		const {X: x2, Y: y2} = B
		const intersection = {X: "", Y: ""}
		const slope = (y2 - y1) / (x2 - x1)
		const horizontalTest = slope * (width/2)
		const verticalTest = (height/2) / slope
		const leftLimit = -(height/2)
		const rightLimit =  height/2
		const topLimit = -(width/2)
		const bottomLimit = (width/2)
		let edge = ""
		// console.log(`leftLimit: ${leftLimit}, horizontalTest: ${horizontalTest}, rightLimit: ${rightLimit}`)
		// console.log(`topLimit: ${topLimit}, horizontalTest: ${verticalTest}, rightLimit: ${bottomLimit}`)
		if (horizontalTest >= leftLimit && horizontalTest <= rightLimit) {
			if (x1 > x2) {
				edge = "right"
			} 
			else if (x1 < x2) {
				edge = "left"
			}
		}
		else if (verticalTest >= topLimit && verticalTest <= bottomLimit) {
			if (y1 > y2) {
				edge = "top"
			} 
			else if (y1 < y2) {
				edge = "bottom"
			}
		}
		console.log(edge)
		if (edge === "left" || edge === "right") {
			if (edge === "left") {
				intersection.X = x2 - (width/2)
			} else {
				intersection.X = x2 + (width/2)
			}
			// CAUTION WITH THE SLOPE SIGN
			intersection.Y = y2 - slope * (width/2)
		}
		else if (edge === "top" || edge === "bottom") {
			if (edge === "top") {
				intersection.Y = y2 - (width/2)
			} else {
				intersection.Y = y2 + (width/2)
			}
			// CAUTION WITH THE SLOPE SIGN
			intersection.X = x2 + (width/2) / slope
		}
		// console.log(intersection)
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