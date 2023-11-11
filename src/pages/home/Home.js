import { Card, Image, Input, Progress } from "antd";
import React, { useEffect, useState } from "react";
import { apiRequest } from "../../config";
import { apiPaths } from "../../config/apiPath";
import CoinCard from "../../components/CoinCard";
import { ALL_COINS } from "../../common/constants";
import moment from "moment";

function Home() {
  const [searchValue, setSearchValue] = useState();
  const [allCoins, setAllCoins] = useState(ALL_COINS);
  const [coinDetails, setCoinDetails] = useState({});
  useEffect(() => {
    async function fetchData() {
      const res = await apiRequest({
        path: apiPaths.coinsLists,
      });
      console.log(res);
      setAllCoins(res);
    }
    fetchData();
  }, []);

  const handleClick = async (id) => {
    const res = await apiRequest({
      path: `${apiPaths.details}/${id}`,
    });
    console.log(res);
    setCoinDetails(res);
  };
  return (
    <div
      style={{
        backgroundColor: "#eee",
        padding: "10px 20px",
      }}
    >
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        bordered={false}
        style={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          padding: "20px",
        }}
      />
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {allCoins.map((item, index) => {
            return (
              <CoinCard
                item={item}
                key={index}
                onClick={() => handleClick(item.id)}
              />
            );
          })}
        </div>
        {/* details */}
        {Object.keys(coinDetails).length > 0 ? (
          <div style={{ flex: 0.25 }}>
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                position: "sticky",
                top: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "baseline",
                }}
              >
                <Image src={coinDetails.image.large} width={100} height={100} />
                <div>
                  <Progress
                    type="circle"
                    percent={coinDetails.coingecko_score.toFixed(2)}
                    size="small"
                  />
                  <div style={{ fontSize: 12 }}>Public Intrest Score</div>
                </div>
              </div>
              <div style={{ marginTop: "20px" }}>
                <div>
                  Name:{" "}
                  <span style={{ fontWeight: "600" }}> {coinDetails.name}</span>
                </div>
                <div>
                  Symbol:{" "}
                  <span style={{ fontWeight: "600" }}>
                    {" "}
                    {coinDetails.symbol}
                  </span>
                </div>
                {coinDetails.country_origin && (
                  <div>
                    Country:{" "}
                    <span style={{ fontWeight: "600" }}>
                      {" "}
                      {coinDetails.country_origin}
                    </span>
                  </div>
                )}
                <div>
                  Rank:{" "}
                  <span style={{ fontWeight: "600" }}>
                    {" "}
                    {coinDetails.coingecko_rank}
                  </span>
                </div>
                <div>
                  WatchList Portfolio Users :{" "}
                  <span style={{ fontWeight: "600" }}>
                    {" "}
                    {coinDetails.watchlist_portfolio_users}
                  </span>
                </div>
                <div>
                  Last Updated:{" "}
                  <span style={{ fontWeight: "600" }}>
                    {" "}
                    {moment(coinDetails.last_updated).fromNow()}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
