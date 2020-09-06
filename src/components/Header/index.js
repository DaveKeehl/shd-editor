import React, { useEffect, useRef, useContext } from 'react'
import { StateContext } from '../../contexts/stateContext'
import { utils } from '../../utils'
import { StyledHeader, StyledH1, StyledButton } from './Header.style'

import SmartAddIcon from './SmartAddIcon'
import addBlock from '../../images/add-block.svg'

function Header(props) {
	const app = useContext(StateContext)

	const headerRef = useRef(null)

	useEffect(() => {
		setTimeout(() => {
			const height = parseInt(
				window
					.getComputedStyle(headerRef.current)
					.getPropertyValue('height')
			)
			utils.functions.updateConstantValue('HEADER_HEIGHT', height)
		}, 100)
	}, [])

	return (
		<StyledHeader ref={headerRef}>
			<StyledH1>
				{props.region.toUpperCase()} ({props.objectsCount})
			</StyledH1>
			{props.region === 'stack' ? (
				<StyledButton
					onClick={() => app.addStackFrame()}
					aria-label="Create new stack frame"
				>
					<img src={addBlock} alt="Add a Stack Frame" />
				</StyledButton>
			) : (
				<StyledButton aria-label="Create new heap object">
					<SmartAddIcon />
				</StyledButton>
			)}
		</StyledHeader>
	)
}

export default Header
