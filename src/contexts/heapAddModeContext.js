import React, { Component } from "react"

const {Provider, Consumer} = React.createContext()

class HeapAddModeProvider extends Component {
	state = {
		isAddModeActive: false
	}

	toggleAddMode = () => {
		this.setState(prevState => ({isAddModeActive: !prevState.isAddModeActive}))
	}

	render() {
		return (
			<Provider value={{isAddModeActive: this.state.isAddModeActive, toggleAddMode: this.toggleAddMode}}>
				{this.props.children}
			</Provider>
		)
	}
}

export {HeapAddModeProvider, Consumer as HeapAddModeConsumer}