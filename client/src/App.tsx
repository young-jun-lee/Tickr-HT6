import 'styles/App.css';
import React from 'react';
import SignUp from 'components/SignUp';
import SignIn from 'components/SignIn';
import Chats from 'components/Chats';
import Header from 'components/Header';
import ChatScreen from 'components/ChatScreen';
import TinderCards from 'components/TinderCards';
import SwipeButtons from 'components/SwipeButtons';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<div className='app'>
			<Router>
				<Switch>
					<Route path='/signUp'>
						<SignUp />
					</Route>

					<Route path='/signIn'>
						<Header backButton='/' />
						<SignIn />
					</Route>

					{/* chat screen path */}
					<Route path='/chat/:person'>
						<Header backButton='/chat' />
						<ChatScreen />
					</Route>

					{/* chat path */}
					<Route path='/chat'>
						<Header backButton='/' />
						<Chats />
					</Route>

					{/* home path */}
					<Route path='/'>
						<Header backButton='/signUp' />
						<TinderCards />
						<SwipeButtons />
					</Route>
				</Switch>

				{/* Chats screen */}
				{/* Individual Chat Screen */}
			</Router>
		</div>
	);
}

export default App;
