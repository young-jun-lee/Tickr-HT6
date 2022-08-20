import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import database from "./firebase";
import "./TinderCards.css";

function TinderCards() {
	const [people, setPeople] = useState([]);

	useEffect(() => {
		database
			.collection("people")
			.onSnapshot((snapshot) =>
				setPeople(snapshot.docs.map((doc) => doc.data()))
			);
	}, []);

	const swiped = (direction, nameToDelete) => {
		console.log("removing:" + nameToDelete);
	};

	const outOfFrame = (name) => {
		console.log(name + " left the screen!");
	};

	return (
		<div className='tinderCards'>
			<div className='tinderCards__cardContainer'>
				{people.map((person) => (
					<TinderCard
						className='tinderCards__swipe'
						key={person.name}
						preventSwipe={["up", "down"]}
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
