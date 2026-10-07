const USER_KEY =
  "myQuizWebsiteUsername";

const LAST_SCORE_KEY =
  "myQuizWebsiteLastScore";

const LEADERBOARD_KEY =
  "myQuizWebsiteLeaderboard";


/* =================================
   DUCKS
================================= */

const ducks = [

  {
    id: 0,
    name: "Red Duck",
    color: "#ef4444"
  },


  {
    id: 1,
    name: "Blue Duck",
    color: "#3b82f6"
  },


  {
    id: 2,
    name: "Green Duck",
    color: "#22c55e"
  },


  {
    id: 3,
    name: "Yellow Duck",
    color: "#eab308"
  }

];


let selectedDuck =
  0;

let racing =
  false;

let raceAnimation =
  null;


let lastScore =
  null;


try {

  lastScore =
    JSON.parse(

      localStorage.getItem(
        LAST_SCORE_KEY
      ) || "null"

    );

}

catch {

  lastScore =
    null;

}


/* =================================
   ELEMENTS
================================= */

const raceUsername =
  document.getElementById(
    "raceUsername"
  );


const raceQuizScore =
  document.getElementById(
    "raceQuizScore"
  );


const raceBoost =
  document.getElementById(
    "raceBoost"
  );


const duckChoices =
  document.getElementById(
    "duckChoices"
  );


const startRaceBtn =
  document.getElementById(
    "startRaceBtn"
  );


const resetRaceBtn =
  document.getElementById(
    "resetRaceBtn"
  );


const raceTrack =
  document.getElementById(
    "raceTrack"
  );


const raceStatus =
  document.getElementById(
    "raceStatus"
  );


const lanes =
  document.getElementById(
    "lanes"
  );


const raceResult =
  document.getElementById(
    "raceResult"
  );


const winnerTitle =
  document.getElementById(
    "winnerTitle"
  );


const raceResultText =
  document.getElementById(
    "raceResultText"
  );


const raceStandings =
  document.getElementById(
    "raceStandings"
  );


const leaderboard =
  document.getElementById(
    "leaderboard"
  );


const clearLeaderboardBtn =
  document.getElementById(
    "clearLeaderboardBtn"
  );


/* =================================
   USERNAME
================================= */

raceUsername.value =
  localStorage.getItem(
    USER_KEY
  ) ||
  lastScore?.username ||
  "";


/* =================================
   QUIZ BOOST
================================= */

function calculateBoost() {

  if (!lastScore) {
    return 0;
  }


  return Math.round(

    Math.min(

      8,

      (
        lastScore.percentage /
        100
      ) * 8

    )

  );

}


/* =================================
   QUIZ INFO
================================= */

function updateQuizInfo() {

  const boost =
    calculateBoost();


  if (lastScore) {

    raceQuizScore.textContent =

      `${lastScore.score}/${lastScore.total} (${lastScore.percentage}%)`;

  }

  else {

    raceQuizScore.textContent =
      "No quiz yet";

  }


  raceBoost.textContent =
    `+${boost}%`;

}


/* =================================
   DUCK SELECTION
================================= */

function renderDuckChoices() {

  duckChoices.innerHTML =
    "";


  ducks.forEach(
    duck => {

      const button =
        document.createElement(
          "button"
        );


      button.type =
        "button";


      button.className =

        "duck-option" +

        (
          selectedDuck ===
          duck.id
            ? " selected"
            : ""
        );


      button.innerHTML = `

        <span
          class="duck-emoji"
          style="filter:
            ${
              duck.id === 0
                ? "none"
                : duck.id === 1
                  ? "hue-rotate(100deg)"
                  : duck.id === 2
                    ? "hue-rotate(220deg)"
                    : "hue-rotate(40deg)"
            }"
        >
          🦆
        </span>


        <span class="duck-name">

          ${duck.name}

        </span>

      `;


      button.addEventListener(
        "click",

        () => {

          if (racing) {
            return;
          }


          selectedDuck =
            duck.id;


          renderDuckChoices();

        }
      );


      duckChoices.appendChild(
        button
      );

    }
  );

}


/* =================================
   CREATE TRACK
================================= */

function createLanes() {

  lanes.innerHTML =
    "";


  ducks.forEach(
    duck => {

      const lane =
        document.createElement(
          "div"
        );


      lane.className =
        "lane";


      const label =
        document.createElement(
          "div"
        );


      label.className =
        "lane-label";


      label.textContent =
        `${duck.id + 1}`;


      const track =
        document.createElement(
          "div"
        );


      track.className =
        "track-area";


      const finish =
        document.createElement(
          "span"
        );


      finish.className =
        "finish-label";


      finish.textContent =
        "FINISH";


      const racer =
        document.createElement(
          "div"
        );


      racer.className =
        "racer";


      racer.id =
        `racer-${duck.id}`;


      racer.textContent =
        "🦆";


      track.append(
        finish,
        racer
      );


      lane.append(
        label,
        track
      );


      lanes.appendChild(
        lane
      );

    }
  );

}


/* =================================
   START RACE
================================= */

function startRace() {

  if (racing) {
    return;
  }


  const username =
    raceUsername.value.trim();


  if (!username) {

    raceUsername.focus();


    raceStatus.textContent =
      "Please enter a username first.";


    return;

  }


  localStorage.setItem(
    USER_KEY,
    username
  );


  if (raceAnimation) {

    cancelAnimationFrame(
      raceAnimation
    );

  }


  racing =
    true;


  startRaceBtn.disabled =
    true;


  resetRaceBtn.disabled =
    true;


  raceResult.hidden =
    true;


  raceTrack.hidden =
    false;


  createLanes();


  const playerBoost =
    calculateBoost() / 100;


  const progress =
    ducks.map(
      () => 0
    );


  const speeds =
    ducks.map(

      () =>

        0.10 +
        Math.random() * 0.12

    );


  speeds[selectedDuck] *=

    1 + playerBoost;


  raceStatus.textContent =

    `${username}'s ${ducks[selectedDuck].name} is racing!`;


  let lastTime =
    performance.now();


  let finishOrder =
    [];


  function animate(now) {

    const delta =
      Math.min(
        40,
        now - lastTime
      );


    lastTime =
      now;


    for (
      let i = 0;
      i < ducks.length;
      i++
    ) {

      if (
        progress[i] < 100
      ) {

        const wobble =

          0.86 +
          Math.random() * 0.28;


        progress[i] +=

          speeds[i] *
          delta *
          wobble;


        if (
          progress[i] >= 100
        ) {

          progress[i] =
            100;


          finishOrder.push(
            i
          );

        }

      }

    }


    ducks.forEach(
      duck => {

        const racer =
          document.getElementById(
            `racer-${duck.id}`
          );


        if (racer) {

          racer.style.left =

            `${Math.min(
              progress[duck.id],
              94
            )}%`;

        }

      }
    );


    if (
      finishOrder.length ===
      ducks.length
    ) {

      finishRace(
        finishOrder,
        username,
        playerBoost
      );


      return;

    }


    raceAnimation =
      requestAnimationFrame(
        animate
      );

  }


  raceAnimation =
    requestAnimationFrame(
      animate
    );

}


/* =================================
   ORDINAL
================================= */

function getOrdinal(
  place
) {

  if (
    place === 1
  ) {
    return "1st";
  }


  if (
    place === 2
  ) {
    return "2nd";
  }


  if (
    place === 3
  ) {
    return "3rd";
  }


  return `${place}th`;

}


/* =================================
   FINISH RACE
================================= */

function finishRace(
  order,
  username,
  playerBoost
) {

  racing =
    false;


  startRaceBtn.disabled =
    false;


  resetRaceBtn.disabled =
    false;


  const playerPosition =

    order.indexOf(
      selectedDuck
    ) + 1;


  const playerDuck =
    ducks[selectedDuck];


  if (
    playerPosition === 1
  ) {

    winnerTitle.textContent =
      "🏆 You Won!";

  }

  else {

    winnerTitle.textContent =
      "🏁 Race Finished!";

  }


  raceResultText.textContent =

    `${username}, your ${playerDuck.name} finished ${getOrdinal(playerPosition)}. ` +

    `Quiz score: ` +

    (

      lastScore

        ? `${lastScore.score}/${lastScore.total} (${lastScore.percentage}%)`

        : "No quiz score"

    ) +

    `. Race boost: +${Math.round(
      playerBoost * 100
    )}%.`;


  raceStandings.innerHTML =
    "";


  order.forEach(
    (duckId, index) => {

      const duck =
        ducks[duckId];


      const row =
        document.createElement(
          "div"
        );


      row.className =

        "race-result-row" +

        (
          duckId ===
          selectedDuck
            ? " user-result"
            : ""
        );


      const place =
        document.createElement(
          "div"
        );


      place.className =
        "place";


      place.textContent =

        index < 3

          ? [
              "🥇",
              "🥈",
              "🥉"
            ][index]

          : `${index + 1}.`;


      const who =
        document.createElement(
          "div"
        );


      who.innerHTML = `

        <div class="result-player">

          ${duck.name}

          ${
            duckId === selectedDuck
              ? "(You)"
              : ""
          }

        </div>


        <div class="result-meta">

          Finished
          ${getOrdinal(index + 1)}

        </div>

      `;


      const resultLabel =
        document.createElement(
          "div"
        );


      resultLabel.className =
        "result-meta";


      resultLabel.textContent =

        index === 0
          ? "Winner"
          : "";


      row.append(
        place,
        who,
        resultLabel
      );


      raceStandings.appendChild(
        row
      );

    }
  );


  raceResult.hidden =
    false;


  raceResult.scrollIntoView({

    behavior:
      "smooth",

    block:
      "start"

  });


  saveLeaderboard({

    username,

    quizPercentage:
      lastScore?.percentage ?? 0,

    quizScore:

      lastScore

        ? `${lastScore.score}/${lastScore.total}`

        : "—",

    racePlace:
      playerPosition,

    duck:
      playerDuck.name,

    timestamp:
      Date.now()

  });


  renderLeaderboard();

}


/* =================================
   LEADERBOARD
================================= */

function getLeaderboard() {

  try {

    return JSON.parse(

      localStorage.getItem(
        LEADERBOARD_KEY
      ) ||
      "[]"

    );

  }

  catch {

    return [];

  }

}


function saveLeaderboard(
  entry
) {

  const data =
    getLeaderboard();


  data.push(
    entry
  );


  data.sort(
    (a, b) => {

      if (
        b.quizPercentage !==
        a.quizPercentage
      ) {

        return (

          b.quizPercentage -
          a.quizPercentage

        );

      }


      return (
        a.racePlace -
        b.racePlace
      );

    }
  );


  localStorage.setItem(

    LEADERBOARD_KEY,

    JSON.stringify(
      data.slice(
        0,
        20
      )
    )

  );

}


/* =================================
   DISPLAY LEADERBOARD
================================= */

function renderLeaderboard() {

  const data =
    getLeaderboard();


  leaderboard.innerHTML =
    "";


  if (!data.length) {

    leaderboard.innerHTML = `

      <div class="empty-state">

        <p>
          No race results yet.
        </p>

      </div>

    `;


    return;

  }


  data.forEach(
    (entry, index) => {

      const row =
        document.createElement(
          "div"
        );


      row.className =
        "leader-row";


      const rank =
        document.createElement(
          "div"
        );


      rank.className =
        "leader-rank";


      rank.textContent =

        index < 3

          ? [
              "🥇",
              "🥈",
              "🥉"
            ][index]

          : `${index + 1}`;


      const name =
        document.createElement(
          "div"
        );


      name.className =
        "leader-name";


      name.textContent =
        entry.username;


      const score =
        document.createElement(
          "div"
        );


      score.className =
        "leader-score";


      score.textContent =
        `${entry.quizPercentage}%`;


      const place =
        document.createElement(
          "div"
        );


      place.className =
        "leader-place";


      place.textContent =
        getOrdinal(
          entry.racePlace
        );


      row.append(
        rank,
        name,
        score,
        place
      );


      leaderboard.appendChild(
        row
      );

    }
  );

}


/* =================================
   RESET
================================= */

function resetRace() {

  if (raceAnimation) {

    cancelAnimationFrame(
      raceAnimation
    );

  }


  raceAnimation =
    null;


  racing =
    false;


  startRaceBtn.disabled =
    false;


  resetRaceBtn.disabled =
    false;


  raceTrack.hidden =
    true;


  raceResult.hidden =
    true;


  raceStatus.textContent =
    "Choose your duck and start the race.";


  renderDuckChoices();

}


/* =================================
   BUTTONS
================================= */

startRaceBtn.addEventListener(
  "click",
  startRace
);


resetRaceBtn.addEventListener(
  "click",
  resetRace
);


clearLeaderboardBtn.addEventListener(

  "click",

  () => {

    const data =
      getLeaderboard();


    if (!data.length) {
      return;
    }


    if (

      window.confirm(
        "Clear the local leaderboard?"
      )

    ) {

      localStorage.removeItem(
        LEADERBOARD_KEY
      );


      renderLeaderboard();

    }

  }

);


raceUsername.addEventListener(

  "input",

  () => {

    localStorage.setItem(

      USER_KEY,

      raceUsername.value.trim()

    );

  }

);


/* =================================
   START PAGE
================================= */

updateQuizInfo();

renderDuckChoices();

renderLeaderboard();