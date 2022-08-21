import axios from "axios";
import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import "styles/TinderCards.css";

interface Stock {
	logoUrl: string;
	ipo: string;
	ticker: string;
	index: string;
	name: string;
	sector: string;
	marketCap: number;
	dateFetched: string;
}

function TinderCards() {
	const [stocks, setStocks] = useState<Stock[]>([]);
	const [nextStack, fetchMore] = useState(<></>);

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_SERVER_URL}/tickers`).then((res) => {
			console.log(res.data);
			setStocks(res.data.companyProfilesArray);
		});
	}, []);

	useEffect(() => {
		if (stocks.length === 0) {
			fetchMore(
				<button
					onClick={() => {
						axios
							.get(`${process.env.REACT_APP_SERVER_URL}/tickers`)
							.then((res) => {
								console.log(res.data);
								setStocks(res.data.companyProfilesArray);
							});
						console.log(stocks);
					}}
				>
					see more?
				</button>
			);
		}
	}, [stocks, stocks.length]);

	const swiped = (direction: string, nameToDelete: string) => {};

	const outOfFrame = (name: string) => {
		console.log(name + " left the screen!");
	};

	return (
		<div className='tinderCards'>
			<div className='tinderCards__cardContainer'>
				{stocks.map((stock) => (
					<TinderCard
						className='tinderCards__swipe'
						key={stock.ticker}
						preventSwipe={["up", "down"]}
						onSwipe={(dir) => swiped(dir, stock.ticker)}
						onCardLeftScreen={() => outOfFrame(stock.ticker)}
					>
						<div className='tinderCards__card'>
							<img
								className='stock__logo'
								src={stock.logoUrl}
								alt={`${stock.ticker} logo`}
							/>
							<div className='companyProfile'>
								<h3>{stock.ticker}</h3>
								<p>{`${stock.name} | ${stock.sector}`}</p>
								<p>Market Cap: {stock.marketCap}</p>
							</div>
						</div>
					</TinderCard>
				))}
				{nextStack}
			</div>
		</div>
	);
}

export default TinderCards;
