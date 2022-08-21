import axios from "axios";
import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment";
import TinderCard from "react-tinder-card";
import "styles/TinderCards.css";

interface Stock {
	logoUrl: string;
	ipo: string;
	ticker: string;
	index: string;
	name: string;
	sector: string;
	marketCap: string;
	dateFetched: string;
}

interface MarketNewsStory {
	category: string;
	datetime: EpochTimeStamp;
	headline: string;
	id: number;
	image: string;
	related: string;
	source: string;
	summary: string;
	url: string;
}

interface CompanyNewsStory {
	datetime: EpochTimeStamp; // 1661013000,
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
	function getWindowSize() {
		const { innerWidth, innerHeight } = window;
		return { innerWidth, innerHeight };
	}

	const [nextStack, fetchMore] = useState(<></>);
	const [priceChanges, setPriceChanges] = useState({});
	const [stocks, setStocks] = useState<Stock[]>([]);
	const [marketNews, setMarketNews] = useState<MarketNewsStory[]>([]);
	const [windowSize, setWindowSize] = useState(getWindowSize());
	const [stockIndex, setStockIndex] = useState<number>(0);
	const [companyNews, setCompanyNews] = useState<CompanyNewsStory[]>([]);
	const [cardView, setCardView] = useState<number>(1);
	const [analytics, setAnalytics] = useState({});
	const MAX_CARD_VIEW = 4;
	const MIN_CARD_VIEW = 1;

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_SERVER_URL}tickers`).then((res) => {
			console.log(res.data);
			setStocks(res.data.companyProfilesArray);
		});
		getMarketNews().then(
			(response: any) => {
				console.log(response);
				setMarketNews(response.data);
				console.log("market news:", companyNews);
			},
			(error: any) => {}
		);
		getCompanyNews("AAPL") // HARD CODED!!
			.then(
				(response: any) => {
					setCompanyNews(response.data);
					console.log("company news:", companyNews);
				},
				(error: any) => {}
			);
	}, []);

	useEffect(() => {
		if (stocks.length === 0) {
			fetchMore(
				<button
					onClick={() => {
						axios
							.get(`${process.env.REACT_APP_SERVER_URL}tickers`)
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

	const getMarketNews = async () => {
		return axios.get(process.env.REACT_APP_SERVER_URL + "getMarketNews");
	};

	const getCompanyNews = async (symbol: string) => {
		return axios.get(process.env.REACT_APP_SERVER_URL + "getCompanyNews", {
			params: {
				symbol: symbol,
			},
		});
	};

	const getRecTrends = async (symbol: string) => {
		const recommendations = await axios.get(
			process.env.REACT_APP_SERVER_URL + "getRecs",
			{
				params: {
					symbol: symbol,
				},
			}
		);
		setAnalytics(recommendations.data);
	};

	const getHistoricalData = async (symbol: string) => {
		const historicalData = await axios.get(
			process.env.REACT_APP_SERVER_URL + "getHistoricalData",
			{
				params: {
					symbol: symbol,
				},
			}
		);
		const firstClosed = historicalData.data.closed[90];
		const oneWeek =
			Math.round(
				((firstClosed - historicalData.data.closed[83]) /
					historicalData.data.closed[83]) *
					100 *
					100
			) / 100;
		const oneMonth =
			Math.round(
				((firstClosed - historicalData.data.closed[60]) /
					historicalData.data.closed[60]) *
					100 *
					100
			) / 100;
		const threeMonths =
			Math.round(
				((firstClosed - historicalData.data.closed[0]) /
					historicalData.data.closed[0]) *
					100 *
					100
			) / 100;
		// setAnalytics(recommendations.data);
		setPriceChanges({ oneWeek, oneMonth, threeMonths });
	};

	const swiped = (direction: string, nameToDelete: string) => {
		console.log("removing:" + nameToDelete);
	};

	const outOfFrame = (name: string) => {
		console.log(name + " left the screen!");
		setCardView(1);
		setStockIndex(stockIndex + 1);
	};

	const changeCardView = (event: any) => {
		setWindowSize(getWindowSize());
		if (event.pageX > windowSize.innerWidth / 2) {
			if (cardView < MAX_CARD_VIEW) setCardView(cardView + 1);
		} else {
			if (cardView > MIN_CARD_VIEW) setCardView(cardView - 1);
		}
		console.log("market news: ", marketNews);
	};

	const getFormattedDate = (epoch: EpochTimeStamp) => {
		var date = new Date(epoch * 1000);
		return date.toLocaleString();
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
								className='tinderCards__card card1'
								onClick={(event) => {
									changeCardView(event);
									getRecTrends(stock.ticker);
									getHistoricalData(stock.ticker);
								}}
							>
								<img
									className='stock__logo'
									src={stock.logoUrl}
									alt={`${stock.ticker} logo`}
								/>
								<div className='companyProfile'>
									<h3 style={{ fontSize: "40px" }}>
										{stock.ticker}
									</h3>
									<p>{`${stock.name} | ${stock.sector}`}</p>
									<p>${stock.marketCap}B</p>
								</div>
							</div>
						)}
						{cardView === 2 && (
							<div
								className='tinderCards__card card1'
								onClick={(event) => changeCardView(event)}
							>
								<div className='analyticsTitle'>{`${stock.ticker} | ${stock.sector}`}</div>
								<div className='grid-container'>
									<div
										className='grid-item'
										style={{
											color: "#8A1C1C",
										}}
									>
										{analytics.sell}
									</div>
									<div className='grid-item'>
										{analytics.hold}
									</div>
									<div
										className='grid-item'
										style={{
											color: "#458D2C",
										}}
									>
										{analytics.buy}
									</div>
									<div className='grid-item title'>sell</div>
									<div className='grid-item title'>hold</div>
									<div className='grid-item title'>buy</div>
									<div
										className='grid-item'
										style={{
											color:
												priceChanges.oneWeek > 0
													? "#458D2C"
													: "#8A1C1C",
										}}
									>
										{priceChanges.oneWeek}%
									</div>
									<div
										className='grid-item'
										style={{
											color:
												priceChanges.oneWeek > 0
													? "#458D2C"
													: "#8A1C1C",
										}}
									>
										{priceChanges.oneMonth}%
									</div>
									<div
										className='grid-item'
										style={{
											color:
												priceChanges.oneWeek > 0
													? "#458D2C"
													: "#8A1C1C",
										}}
									>
										{priceChanges.threeMonths}%
									</div>
									<div className='grid-item title'>
										1 week
									</div>
									<div className='grid-item title'>
										1 month
									</div>
									<div className='grid-item title'>
										3 month
									</div>
								</div>
							</div>
						)}
						{cardView === 3 && (
							<div
								className='tinderCards__card news'
								onClick={(event) => changeCardView(event)}
							>
								<h2>Company News</h2>
								{companyNews.map((story) => {
									return (
										<div
											key={story.id}
											className='story news'
										>
											<div classname='story title'>
												<img
													alt={`story`}
													src={story.image}
													className='story'
												/>
												<a
													href={story.url}
													className='news'
												>
													<p>{story.headline}</p>
												</a>
												<p className='story source'>
													{story.source}
												</p>
											</div>
											<p className='story summary'>
												{story.summary}
											</p>
											<p className='story date'>
												{getFormattedDate(
													story.datetime
												)}
											</p>
										</div>
									);
								})}
							</div>
						)}
						{cardView === 4 && (
							<div
								className='tinderCards__card news'
								onClick={(event) => changeCardView(event)}
							>
								<h2>Market News</h2>
								{marketNews.map((story) => {
									return (
										<div
											key={story.id}
											className='story news'
										>
											<div classname='story title'>
												<img
													alt={`story`}
													src={story.image}
													className='story'
												/>
												<a
													href={story.url}
													className='news'
												>
													<p>{story.headline}</p>
												</a>
												<p>{story.source}</p>
											</div>
											<p className='story summary'>
												{story.summary}
											</p>
											<p className='story date'>
												{getFormattedDate(
													story.datetime
												)}
											</p>
										</div>
									);
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
