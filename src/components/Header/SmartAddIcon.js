import React, {useContext} from "react"
<<<<<<< HEAD
import {HeapAddModeContext} from "../../contexts/heapAddModeContext"

function SmartAddIcon() {
	const {isAddModeActive, toggleAddMode} = useContext(HeapAddModeContext)

=======
import {HeapSmartAddContext} from "../../contexts/heapSmartAddContext"

function SmartAddIcon() {
	const {isSmartAddActive, toggleSmartAdd} = useContext(HeapSmartAddContext)
>>>>>>> 5eeaac09990507aad9db1c498ed1fd8c13fdd162
	return (
		<svg 
			width="22" 
			height="22" 
			viewBox="0 0 22 22" 
			fill="none" 
			xmlns="http://www.w3.org/2000/svg"
<<<<<<< HEAD
			onClick={() => toggleAddMode()}
		>
			<path 
				d="M19.5556 0H2.44444C1.79614 0 1.17438 0.257539 0.715961 0.715961C0.257539 1.17438 0 1.79614 0 2.44444V19.5556C0 20.2039 0.257539 20.8256 0.715961 21.284C1.17438 21.7425 1.79614 22 2.44444 22H19.5556C20.9 22 22 20.9 22 19.5556V2.44444C22 1.1 20.9 0 19.5556 0ZM17.1111 12.2222H12.2222V17.1111H9.77778V12.2222H4.88889V9.77778H9.77778V4.88889H12.2222V9.77778H17.1111V12.2222Z" 
				fill={isAddModeActive ? "yellow" : "white"}
=======
			onClick={() => toggleSmartAdd()}
		>
			<path 
				d="M19.5556 0H2.44444C1.79614 0 1.17438 0.257539 0.715961 0.715961C0.257539 1.17438 0 1.79614 0 2.44444V19.5556C0 20.2039 0.257539 20.8256 0.715961 21.284C1.17438 21.7425 1.79614 22 2.44444 22H19.5556C20.9 22 22 20.9 22 19.5556V2.44444C22 1.1 20.9 0 19.5556 0ZM17.1111 12.2222H12.2222V17.1111H9.77778V12.2222H4.88889V9.77778H9.77778V4.88889H12.2222V9.77778H17.1111V12.2222Z" 
				fill={isSmartAddActive ? "yellow" : "white"}
>>>>>>> 5eeaac09990507aad9db1c498ed1fd8c13fdd162
			/>
		</svg>
	)
}

export default SmartAddIcon