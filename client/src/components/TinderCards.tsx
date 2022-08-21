import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import 'styles/TinderCards.css';

interface Stock {
	logo: string;
	ticker: string;
	index: string;
	sector: string;
	marketCap: string;
}

function TinderCards() {
	const [stocks, setStocks] = useState<Stock[]>([]);

	useEffect(() => {
		// make axios call to back end
		// call should return a list of 50 stocks in the following format!
		setStocks([
			{
				logo: 'https://www.freepnglogos.com/uploads/flour-png/flour-flower-png-transparent-png-images-pluspng-2.png',
				ticker: 'fake ticker',
				index: 'fake index',
				sector: 'fake sector',
				marketCap: 'fake market cap'
			},
			{
				logo: 'https://www.freepnglogos.com/uploads/flour-png/flour-flower-png-transparent-png-images-pluspng-2.png',
				ticker: 'fake ticker 2',
				index: 'fake index 2',
				sector: 'fake sector 2',
				marketCap: 'fake market cap 2'
			}
		]);
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
				{stocks.map((stock) => (
					<TinderCard
						className='tinderCards__swipe'
						key={stock.ticker}
						preventSwipe={['up', 'down']}
						onSwipe={(dir) => swiped(dir, stock.ticker)}
						onCardLeftScreen={() => outOfFrame(stock.ticker)}
					>
						<div
							className='tinderCards__card'
							// style={{ backgroundImage: `url(${stock.logo})` }}
						>
							<img
								className='stock__logo'
								src={stock.logo}
								alt={`${stock.ticker} logo`}
							/>
							<h3>{stock.ticker}</h3>
							<p>{`${stock.index} | ${stock.sector}`}</p>
							<p>{stock.marketCap}</p>
						</div>
					</TinderCard>
				))}
			</div>
		</div>
	);
}

export default TinderCards;
