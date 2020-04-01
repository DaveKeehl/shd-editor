import React, {Component} from "react"
import Stack from "./../Stack"
import Separator from "./../Separator"
import Heap from "./../Heap"

class App extends Component {
	render() {
		return (
			<div className="App">
				<Stack />
				<Separator />
				<Heap />
			</div>
		)
	}
}

export default App