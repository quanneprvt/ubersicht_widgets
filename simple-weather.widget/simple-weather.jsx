import { css } from "uebersicht";

var timeLoop = 5;
const commandFunc = async (dispatch) => {
  try {
    if (timeLoop > 0)
    {
      const weatherData = await getWeather();
      dispatch({ type: "FETCHED_DATA", data: weatherData });
    }
    else dispatch({ type: "FETCHED_DATA", data: null });
  } catch (err) {
    timeLoop--;
    dispatch({ type: "FETCHED_DATA", data: null });
    setTimeout(commandFunc, 5000);
  }
};
export const command = commandFunc;
export const initialState = { weatherData: null };
export const updateState = (event, previousState) => {
  switch (event.type) {
    case "FETCHED_DATA":
      return { weatherData: event.data };
    default: {
      return previousState;
    }
  }
};
export const refreshFrequency = 1800000;
export const className = css`
  @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,700);
  @import url(https://cdnjs.cloudflare.com/ajax/libs/weather-icons/1.2/css/weather-icons.min.css);
  top: 520px;
  right: 35px;
  transform-style: preserve-3d;
  // transition: all 0.25s linear;
  border: 1px solid gray;
  border-radius: 20px;
  #weather_wrapper {
    width: 345px;
  }
  .weatherCard {
    width: 345px;
    height: 180px;
    font-family: "Open Sans";
    position: relative;
  }
  .currentTemp {
    width: 180px;
    height: 180px;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  .currentWeather {
    width: 165px;
    height: 180px;
    background: rgb(237, 237, 237, 0.4);
    margin: 0;
    position: absolute;
    top: 0;
    right: 0;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  .temp {
    font-size: 60px;
    text-align: center;
    display: block;
    font-weight: 300;
    color: rgb(255, 255, 255);
    padding: 15px 0 0;
    transform: translateZ(50px);
  }
  .weatherDesc {
    color: rgb(255, 255, 255);
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 17px;
    display: block;
    transform: translateZ(35px);
  }
  .location {
    color: rgb(255, 255, 255);
    text-align: center;
    font-weight: 400;
    font-size: 20px;
    display: block;
    transform: translateZ(20px);
  }
  .conditions {
    // font-family: weathericons;
    // font-size: 80px;
    width: 150px;
    height: 150px;
    display: block;
    // padding: 20px 0 0;
    margin: auto;
    // text-align: center;
    transform: translateZ(50px);
  }
  .info {
    width: 165px;
    height: 50px;
    position: absolute;
    bottom: 0;
    right: 0;
    background: rgb(42, 178, 234);
    font-weight: 700;
    color: rgb(255, 255, 255);
    text-align: center;
    transform: translateZ(30px);
    border-bottom-right-radius: 20px;
  }
  .rain {
    width: 50%;
    position: absolute;
    left: 10px;
    word-spacing: 60px;
    top: 3px;
  }
  .rain::before {
    display: block;
    content: "\f04e";
    font-family: weathericons;
    font-size: 40px;
    left: 6px;
    top: -4px;
    position: absolute;
  }
  .wind {
    width: 50%;
    right: -10px;
    position: absolute;
    word-spacing: 60px;
    top: 3px;
  }
  .wind::before {
    display: block;
    content: "\f050";
    font-family: weathericons;
    font-size: 25px;
    left: -10px;
    position: absolute;
    top: 5px;
  }
  .errorContainer {
    width: 300px;
    padding: 15px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
  }
  .errorMessage {
    color: white;
    word-wrap: break-word;
    transform: translateZ(100px);
  }
`;
const ApiKey = "6dc5b712b10ae6ead76b6ede54e1dcad";
const staticHcmCoord = {
  lat: "10.836186",
  long: "106.718020",
};
const excludePart = "minutely,hourly,daily,alerts";

const getWeather = async () => {
  const rawData = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${staticHcmCoord.lat}&lon=${staticHcmCoord.long}&exclude=${excludePart}&appid=${ApiKey}&units=imperial`
  );
  const formatData = await rawData.json();
  return formatData;
};

let bounds;
let timeoutRemove;

const onMouseEnter = () => {
  let el = document.getElementById("simple-weather-widget-simple-weather-jsx");
  // el.style.transition = null;
  bounds = el.getBoundingClientRect();
  clearTimeout(timeoutRemove);
  el.style.transition = "all 0.2s linear";
  timeoutRemove = setTimeout(function () {
    el.style.transition = "";
  }, 200);
};

const onMouseMove = (e) => {
  let el = document.getElementById("simple-weather-widget-simple-weather-jsx");
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const leftX = mouseX - bounds.x;
  const topY = mouseY - bounds.y;
  const center = {
    x: leftX - bounds.width / 2,
    y: topY - bounds.height / 2,
  };
  const distance = Math.sqrt(center.x ** 2 + center.y ** 2);
  clearTimeout(timeoutRemove);
  timeoutRemove = setTimeout(function () {
    el.style.transition = "";
  }, 200);

  el.style.transform = `
    scale3d(1.2, 1.2, 1.2)
    rotateX(${-center.y / 5}deg)
    rotateY(${-center.x / 5}deg)
  `;
};

const onMouseLeave = (e) => {
  let el = document.getElementById("simple-weather-widget-simple-weather-jsx");
  el.style.transform = `rotateX(0deg) rotateY(0deg)`;
  clearTimeout(timeoutRemove);
  el.style.transition = "all 0.25s linear";
  timeoutRemove = setTimeout(function () {
    el.style.transition = "";
  }, 250);
};

export const render = ({ weatherData }) => {
  return (
    <div>
      {(!weatherData || !weatherData.cod) && weatherData.current ? (
        <div
          id="weather_wrapper"
          onMouseEnter={(ev) => onMouseEnter(ev)}
          onMouseMove={(ev) => onMouseMove(ev)}
          onMouseLeave={(ev) => onMouseLeave(ev)}
        >
          <div className="weatherCard">
            <div className="currentTemp">
              <span className="temp">
                {Math.floor((weatherData.current.temp - 32) * (5 / 9))}&deg;C
              </span>
              <span className="weatherDesc">
                {weatherData.current.weather[0].description}
              </span>
              <span className="location">
                {weatherData.timezone.split("/")[1].split("_").join(" ")}
              </span>
            </div>
            <div className="currentWeather">
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
                className="conditions"
              ></img>
              <div className="info">
                <span className="rain">
                  {weatherData.current.rain
                    ? weatherData.current.rain[`1h`]
                    : "0.0"}
                  <br />
                  MM
                </span>
                <span className="wind">
                  {weatherData.current.wind_speed}
                  <br />
                  MPH
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="errorContainer"
          onMouseEnter={(ev) => onMouseEnter(ev)}
          onMouseMove={(ev) => onMouseMove(ev)}
          onMouseLeave={(ev) => onMouseLeave(ev)}
        >
          {/* <div className="errorMessage">{weatherData.message}</div> */}
        </div>
      )}
    </div>
  );
};
