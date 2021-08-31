import { css } from "uebersicht";

const sundayFirstCalendar = 'cal -h && date "+|%-d"';
export const command = sundayFirstCalendar;
export const refreshFrequency = 3600000; // ms
export const className = css`
  font-family: Source Han Code JP, Helvetica Neue;
  font-size: 16px;
  color: #fff;
  top: 50px;
  right: 35px;
  padding: 15px 30px;
  border: 1px solid #585858;
  border-radius: 30px;
  // transition: all 0.25s linear;
  transform-style: preserve-3d;
`;
const rect = "30px";
const margin = "8px";

const parse = output => {
  if (!output) {
    return null;
  }

  const separated = output.split("|");
  const rows = separated[0].trim().split("\n");
  const today = separated[1].trim();
  return {
    headers: rows[0].split(" ").slice(0, 2),
    tableHeaderRow: rows[1].trim().split(" "),
    tableBodyRows: rows.slice(2).map(s => s.match(/.{3}|.{2}$/g)),
    today
  };
};

//////////////// header ////////////////
const headerCss = css`
  padding-left: 5px;
  font-size: 2rem;
  margin-bottom: 10px;
  transform: translateZ(50px);
`;
const header = (month, year) => (
  <h1 className={headerCss}>
    {month} <span>{year}</span>
  </h1>
);

const backgroundCss = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
  transition: all 0.5s ease-out;
  border-radius: 30px;
  // -webkit-filter: blur(3px);
  // filter: blur(3px);
`;

//////////////// table ////////////////
const tableCss = css`
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 1rem;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  th {
    display: inline-block;
    width: ${rect};
    height: ${rect};
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
    transform: translateZ(50px);
  }
  th:not(:first-of-type) {
    margin-left: ${margin};
  }

  td {
    display: inline-block;
    width: ${rect};
    height: ${rect};
    text-align: center;
    line-height: ${rect};
    font-weight: bold;
    transition: all 0.25s ease-in-out;
    border-radius:50%;
    transform: translateZ(50px);
  }
  td:not(:first-of-type) {
    margin-left: ${margin};
  }
  td:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const todayCss = css`
  position: relative;
  font-weight: bold;
  text-shadow: 1px 1px #555;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
`;

const table = (headers, bodies, today) => {
  return (
    <div>
      <div className={backgroundCss} />
      <table className={tableCss}>
        <thead>
          <tr>
            {headers.map((s, i) => (
              <th key={i}>{s}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodies.map((row, i) => (
            <tr key={i}>
              {row.map((s, j) => (
                <td className={s.trim() === today ? todayCss : ""} key={j}>{s}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
let bounds;
let timeoutRemove;

const onMouseEnter = () => {
  let el = document.getElementById("simple-calendar-widget-simple-white-calendar-jsx");
  // el.style.transition = null;
  bounds = el.getBoundingClientRect();
  clearTimeout(timeoutRemove);
  el.style.transition = 'all 0.2s linear';
  timeoutRemove = setTimeout(function(){
    el.style.transition = '';
  }, 200);
}

const onMouseMove = (e) => {
  let el = document.getElementById("simple-calendar-widget-simple-white-calendar-jsx");
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const leftX = mouseX - bounds.x;
  const topY = mouseY - bounds.y;
  const center = {
    x: leftX - bounds.width / 2,
    y: topY - bounds.height / 2
  }
  const distance = Math.sqrt(center.x**2 + center.y**2);
  clearTimeout(timeoutRemove);
  timeoutRemove = setTimeout(function(){
    el.style.transition = '';
  }, 200);
  
  el.style.transform = `
    scale3d(1.07, 1.07, 1.07)
    rotateX(${-center.y / 5}deg)
    rotateY(${-center.x / 5}deg)
  `;
}

const onMouseLeave = (e) => {
  let el = document.getElementById("simple-calendar-widget-simple-white-calendar-jsx");
  el.style.transform = `rotateX(0deg) rotateY(0deg)`;
  clearTimeout(timeoutRemove);
  el.style.transition = 'all 0.25s linear';
  timeoutRemove = setTimeout(function(){
    el.style.transition = '';
  }, 250);
}

export const render = ({ output, error }) => {
  if (error) {
    return <p>{error}</p>;
  }

  if (!output) {
    return <p>output is not defined</p>;
  }

  const s = parse(output);
  return (
    <div
      id="calendarId"
      onMouseEnter={(ev) => onMouseEnter(ev)}
      onMouseMove={(ev) => onMouseMove(ev)} 
      onMouseLeave={(ev) => onMouseLeave(ev)}
    >
      {header(...s.headers)}
      {table(s.tableHeaderRow, s.tableBodyRows, s.today)}
    </div>
  );
};
