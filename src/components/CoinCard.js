import { Card } from "antd";
import React from "react";

function CoinCard({ item = {}, onClick = () => {} }) {
  // id":"01coin","symbol":"zoc","name":"01coin"}
  return (
    <Card hoverable style={{ width: 200 }} onClick={onClick}>
      <div style={{ color: "#343a40" }}>{item.name}</div>
    </Card>
  );
}

export default CoinCard;
