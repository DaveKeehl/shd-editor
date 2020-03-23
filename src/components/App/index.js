import React, {Component} from 'react'
import Stack from '../Stack'
import Heap from '../Heap'
import Separator from '../Separator'

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