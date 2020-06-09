import React, {useEffect, useRef, useContext} from "react"
import {StateContext} from "../../contexts/stateContext"
import {utils} from "../../utils"

import addBlock from "../../images/add-block.svg"
import SmartAddIcon from "./SmartAddIcon"

function Header(props) {
	const app = useContext(StateContext)
	
	const headerRef = useRef(null)
	
	useEffect(() => {
		setTimeout(() => {
			const height = parseInt(window.getComputedStyle(headerRef.current).getPropertyValue("height"))
			utils.functions.updateConstantValue("HEADER_HEIGHT", height)
		}, 100)
	}, [])

	return (
		<header ref={headerRef}>
			<h1>{props.region.toUpperCase()} ({props.objectsCount})</h1>
			{
				props.region === "stack" ?
					<button 
						onClick={() => app.addStackFrame()}
						aria-label="Create new object"
					>
						<img src={addBlock} alt="Add a Stack Frame"/>
					</button>
				:
					<button aria-label="Create new object">
						<SmartAddIcon />
					</button>
			}

		</header>
	)
}

export default Header