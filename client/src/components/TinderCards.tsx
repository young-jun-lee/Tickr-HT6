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

interface CompanyNewsStory {
	datetime: number; // 1661013000,
	category: string; // "company",
	headline: string; // "Things Just Got Tougher for Peloton",
	id: number; // 115338334,
	image: string; // "https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo-1200x1200.png",
	related: string; // "AAPL",
	source: string; // "Yahoo",
	summary: string; // "How challenging Peloton Interactive's balance sheet is right now.  Why Peloton will almost certainly have to raise money.  Why Costco Wholesale is his favorite retail stock, followed closely by Home Depot.",
	url: string; // "https://finnhub.io/api/news?id=d45e940e9209715a2fcff8d49df8596f9ad5bee27cf9d2b3ea2a83ff18c21aaf"
}

function TinderCards() {
	const [stocks, setStocks] = useState<Stock[]>([]);
	const [windowSize, setWindowSize] = useState(getWindowSize());
	const [stockIndex, setStockIndex] = useState<number>(0);
	const [companyNews, setCompanyNews] = useState<CompanyNewsStory[]>([]);
	const [cardView, setCardView] = useState<number>(1);
	const MAX_CARD_VIEW = 4;
	const MIN_CARD_VIEW = 1;
	const [nextStack, fetchMore] = useState(<></>);

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
		getCompanyNews('AAPL') // HARD CODED!!
			.then(
				(response: any) => {
					setCompanyNews(response.data);
					console.log(companyNews);
				},
				(error: any) => {}
			);
	}, []);

	const swiped = (direction: string, nameToDelete: string) => {
		console.log("removing:" + nameToDelete);
	};

	const outOfFrame = (name: string) => {
		console.log(name + " left the screen!");
		setCardView(1);
		setStockIndex(stockIndex + 1);
	};

	function getWindowSize() {
		const { innerWidth, innerHeight } = window;
		return { innerWidth, innerHeight };
	}

	const changeCardView = (event: any) => {
		setWindowSize(getWindowSize());
		if (event.pageX > windowSize.innerWidth / 2) {
			if (cardView < MAX_CARD_VIEW) setCardView(cardView + 1);
		} else {
			if (cardView > MIN_CARD_VIEW) setCardView(cardView - 1);
		}
		console.log(companyNews);
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
						{cardView === 1 && (
							<div
								className='tinderCards__card'
								onClick={(event) => changeCardView(event)}
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
						)}
						{cardView === 2 && (
							<div
								className='tinderCards__card'
								onClick={(event) => changeCardView(event)}
							>
								<p>view 2</p>
							</div>
						)}
						{cardView === 3 && (
							<div
								className='tinderCards__card'
								onClick={(event) => changeCardView(event)}
							>
								<p>view 3</p>
							</div>
						)}
						{cardView === 4 && (
							<div
								className='tinderCards__card company_news'
								onClick={(event) => changeCardView(event)}
							>
								{companyNews.map((story) => {
									return (
										<div
											key={story.id}
											className='story company_news'
										>
											<img
												alt={`${story.headling} image`}
												src={story.image}
											></img>
											<a
												href={story.url}
												className='company_news'
											>
												<p>{story.headline}</p>
											</a>
											<p>{story.source}</p>
											<p>{story.summary}</p>
											<p>{story.datetime}</p>
										</div>
									);
									<a>text to display!</a>;
								})}
							</div>
						)}
					</TinderCard>
				))}
				{nextStack}
			</div>
		</div>
	);
}

export default TinderCards;
