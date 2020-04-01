import React, {Component} from "react"
import Region from "../Region"

class App extends Component {
	render() {
		return (
			<div className="App">
				<Region name="stack" />
				<div className="separator"></div>
				<Region name="heap" />
			</div>
		)
	}
}

export default App