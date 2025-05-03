import React from "react";
import "./CandleStyles.css"; // Import the shared CSS file

const Candle2: React.FC = () => {
  const test = false

  return (
    <div className="wrapper -mt-48">
      <div className="" />
      <div className="candles ">
        <div style={{backgroundColor: test ? "#d4322c" : "#64bc61"}} className="candle2">
          <div className="candle2__body">
            <div className="candle2__eyes">
              <div className="candle2__eyes-one"></div>
              <div className="candle2__eyes-two"></div>
            </div>
          </div>
          <div className="candle2__stick"></div>
          <div className="candle2__fire"></div>
        </div>
        <div className="sparkles-one"></div>
        <div className="sparkles-two"></div>
        <div className="candle__smoke-one"></div>
        <div className="candle__smoke-two"></div>
      </div>
      {/* <div className="floor"></div> */}
      <div className="z-50 -mt-12 ml-64 text-green-600">That's correct!</div>
    </div>
  );
};

export default Candle2;
