import React from "react"
import Button from "./Button"
import logo from "../../images/logo.svg"

function Toolbar() {
	return (
		<div className="toolbar">
			<img className="toolbar__logo" src={logo} alt="Logo" />
			{/* <Button action="new-diagram" /> */}
			<Button action="delete-arrows" />
			<Button action="download-json" />
			{/* <Button action="upload-json" /> */}
			{/* <Button action="scale-up" /> */}
			{/* <Button action="scale-down" /> */}
			{/* <Button action="toggle-fullscreen" /> */}
		</div>
	)
}

export default Toolbar
