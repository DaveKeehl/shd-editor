import React from 'react';
import ReactDOM from 'react-dom';
import './style.sass';
import App from './components/App';
import {StateContextProvider} from "./contexts/stateContext"
import {ResizableStackContextProvider} from "./contexts/resizableStackContext"
import {ArrowsContextProvider} from "./contexts/arrowsContext"
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<StateContextProvider>
		<ResizableStackContextProvider>
			<ArrowsContextProvider>
				<App />
			</ArrowsContextProvider>
		</ResizableStackContextProvider>
	</StateContextProvider>, 
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
