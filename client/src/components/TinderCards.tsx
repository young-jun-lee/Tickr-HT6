import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import 'styles/TinderCards.css';
import TickrLogo from 'media/tickr_logo.png';

interface Stock {
	name: string;
	url: string;
}

function TinderCards() {
	const [people, setPeople] = useState([]);

	useEffect(() => {
		setPeople([
			{
				name: 'person1',
				url: 'some url'
			}
		]);
		// database
		// 	.collection('people')
		// 	.onSnapshot((snapshot) =>
		// 		setPeople(snapshot.docs.map((doc) => doc.data()))
		// 	);
	}, []);

	const swiped = (direction: string, nameToDelete: string) => {
		console.log('removing:' + nameToDelete);
	};

	const outOfFrame = (name: string) => {
		console.log(name + ' left the screen!');
	};

	return (
		<div className='tinderCards'>
			<div className='tinderCards__cardContainer'>
				{people.map((person) => (
					<TinderCard
						className='tinderCards__swipe'
						key={person.name}
						preventSwipe={['up', 'down']}
						onSwipe={(dir) => swiped(dir, person.name)}
						onCardLeftScreen={() => outOfFrame(person.name)}
					>
						<div
							className='tinderCards__card'
							style={{ backgroundImage: `url(${person.url})` }}
						>
							<h3>{person.name}</h3>
						</div>
					</TinderCard>
				))}
			</div>
		</div>
	);
}

export default TinderCards;
