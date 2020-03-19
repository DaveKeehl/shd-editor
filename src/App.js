import React, {Component} from 'react';
import Stack from './components/Stack';
import Heap from './components/Heap';

class App extends Component {

	render() {
		return (
			<div className="App">
				<Stack/>
				<div className="separator"></div>
				<Heap/>
			</div>
		)
	};
}

export default App;
