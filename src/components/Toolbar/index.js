import React from 'react'

import { StyledLogo, StyledToolbar } from './Toolbar.style'
import ToolbarButton from './ToolbarButton'
import logo from '../../images/logo.svg'

function Toolbar() {
	return (
		<StyledToolbar>
			<StyledLogo src={logo} alt="Logo" />
			<ToolbarButton action="new-diagram" />
			<ToolbarButton action="delete-arrows" />
			<ToolbarButton action="download-json" />
			<ToolbarButton action="upload-json" />
			{/* <ToolbarButton action="scale-up" />
			<ToolbarButton action="scale-down" /> */}
			<ToolbarButton action="toggle-fullscreen" />
		</StyledToolbar>
	)
}

export default Toolbar
