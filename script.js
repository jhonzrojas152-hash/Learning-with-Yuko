const QUIZ_KEY =
  "myQuizWebsiteQuizzes";

const USER_KEY =
  "myQuizWebsiteUsername";

const LAST_SCORE_KEY =
  "myQuizWebsiteLastScore";


/* =================================
   DEFAULT QUIZ
================================= */

const defaultQuizzes = [

  {
    id: "sample",

    title:
      "Web Development Basics",

    description:
      "Sample quiz. You can edit or delete it.",

    questions: [

      {
        question:
          "What does HTML stand for?",

        choices: [
          "HyperText Markup Language",
          "HighText Machine Language",
          "Home Tool Markup Language",
          "Hyperlink Text Management Language"
        ],

        answer:
          "HyperText Markup Language",

        explanation:
          "HTML is used to structure content on web pages."
      },


      {
        question:
          "Which language is mainly used to style a web page?",

        choices: [
          "HTML",
          "CSS",
          "Java",
          "SQL"
        ],

        answer:
          "CSS",

        explanation:
          "CSS controls the appearance and layout of web pages."
      },


      {
        question:
          "Which JavaScript keyword declares a variable that can be reassigned?",

        choices: [
          "const",
          "let",
          "static",
          "fixed"
        ],

        answer:
          "let",

        explanation:
          "A variable declared with let can be reassigned."
      }

    ]

  }

];


/* =================================
   GET QUIZZES
================================= */

function getQuizzes() {

  const saved =
    localStorage.getItem(
      QUIZ_KEY
    );


  if (!saved) {

    localStorage.setItem(

      QUIZ_KEY,

      JSON.stringify(
        defaultQuizzes
      )

    );


    return structuredClone(
      defaultQuizzes
    );

  }


  try {

    const data =
      JSON.parse(saved);


    if (
      Array.isArray(data)
    ) {

      return data;

    }


    return structuredClone(
      defaultQuizzes
    );

  }

  catch {

    return structuredClone(
      defaultQuizzes
    );

  }

}


/* =================================
   ELEMENTS
================================= */

const startPanel =
  document.getElementById(
    "startPanel"
  );


const usernameInput =
  document.getElementById(
    "usernameInput"
  );


const startMessage =
  document.getElementById(
    "startMessage"
  );


const quizPicker =
  document.getElementById(
    "quizPicker"
  );


const quizArea =
  document.getElementById(
    "quizArea"
  );


const pageTitle =
  document.getElementById(
    "pageTitle"
  );


const quizTitle =
  document.getElementById(
    "quizTitle"
  );


const quizDescription =
  document.getElementById(
    "quizDescription"
  );


const playerWelcome =
  document.getElementById(
    "playerWelcome"
  );


const backBtn =
  document.getElementById(
    "backToQuizzesBtn"
  );


const quizContainer =
  document.getElementById(
    "quiz"
  );


const submitBtn =
  document.getElementById(
    "submitBtn"
  );


const restartBtn =
  document.getElementById(
    "restartBtn"
  );


const raceBtn =
  document.getElementById(
    "raceBtn"
  );


const result =
  document.getElementById(
    "result"
  );


const scoreText =
  document.getElementById(
    "scoreText"
  );


const percentageText =
  document.getElementById(
    "percentageText"
  );


const scoreFill =
  document.getElementById(
    "scoreFill"
  );


const answerKey =
  document.getElementById(
    "answerKey"
  );


const keyList =
  document.getElementById(
    "keyList"
  );


let currentQuiz =
  null;


let selectedAnswers =
  [];


let finished =
  false;


/* =================================
   LOAD USERNAME
================================= */

usernameInput.value =
  localStorage.getItem(
    USER_KEY
  ) || "";


/* =================================
   SHOW MESSAGE
================================= */

function showMessage(
  text,
  error = false
) {

  startMessage.hidden =
    false;


  startMessage.textContent =
    text;


  startMessage.style.background =
    error
      ? "#fee2e2"
      : "#dcfce7";


  startMessage.style.color =
    error
      ? "#991b1b"
      : "#166534";

}


/* =================================
   SHOW QUIZZES
================================= */

function showQuizList() {

  pageTitle.textContent =
    "Choose a Quiz";


  startPanel.hidden =
    false;


  quizArea.hidden =
    true;


  quizPicker.hidden =
    false;


  quizPicker.innerHTML =
    "";


  const quizzes =
    getQuizzes();


  if (!quizzes.length) {

    quizPicker.innerHTML = `

      <div class="empty-state">

        <h3>
          No quizzes yet
        </h3>

        <p>
          Go to Manage Quizzes
          and click the + button.
        </p>

      </div>

    `;

    return;

  }


  quizzes.forEach(
    quiz => {

      const card =
        document.createElement(
          "article"
        );


      card.className =
        "quiz-select-card";


      const info =
        document.createElement(
          "div"
        );


      const title =
        document.createElement(
          "h3"
        );


      title.textContent =
        quiz.title;


      const desc =
        document.createElement(
          "p"
        );


      desc.textContent =
        quiz.description ||
        "No description.";


      const count =
        document.createElement(
          "p"
        );


      count.className =
        "count";


      count.textContent =

        `${quiz.questions.length} question${
          quiz.questions.length === 1
            ? ""
            : "s"
        }`;


      info.append(
        title,
        desc,
        count
      );


      const button =
        document.createElement(
          "button"
        );


      button.type =
        "button";


      button.className =
        "quiz-select-btn";


      button.textContent =
        "Start Quiz";


      button.addEventListener(
        "click",

        () =>
          startQuiz(
            quiz.id
          )
      );


      card.append(
        info,
        button
      );


      quizPicker.appendChild(
        card
      );

    }
  );

}


/* =================================
   GET USERNAME
================================= */

function getUsername() {

  const username =
    usernameInput
      .value
      .trim();


  if (!username) {

    showMessage(
      "Please enter a username before starting the quiz.",
      true
    );


    usernameInput.focus();


    return null;

  }


  localStorage.setItem(
    USER_KEY,
    username
  );


  startMessage.hidden =
    true;


  return username;

}


/* =================================
   START QUIZ
================================= */

function startQuiz(id) {

  const username =
    getUsername();


  if (!username) {
    return;
  }


  currentQuiz =
    getQuizzes().find(
      quiz =>
        quiz.id === id
    );


  if (!currentQuiz) {
    return;
  }


  selectedAnswers =
    Array(
      currentQuiz.questions.length
    ).fill(null);


  finished =
    false;


  pageTitle.textContent =
    currentQuiz.title;


  startPanel.hidden =
    true;


  quizPicker.hidden =
    true;


  quizArea.hidden =
    false;


  quizTitle.textContent =
    currentQuiz.title;


  quizDescription.textContent =
    currentQuiz.description || "";


  playerWelcome.textContent =
    `👤 Player: ${username}`;


  result.hidden =
    true;


  answerKey.hidden =
    true;


  submitBtn.hidden =
    false;


  restartBtn.hidden =
    true;


  raceBtn.hidden =
    true;


  scoreFill.style.width =
    "0%";


  renderQuiz();


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =================================
   RENDER QUIZ
================================= */

function renderQuiz() {

  quizContainer.innerHTML =
    "";


  currentQuiz.questions.forEach(
    (question, index) => {

      const card =
        document.createElement(
          "article"
        );


      card.className =
        "question-card";


      const number =
        document.createElement(
          "div"
        );


      number.className =
        "question-number";


      number.textContent =

        `Question ${index + 1} of ${currentQuiz.questions.length}`;


      const text =
        document.createElement(
          "h2"
        );


      text.className =
        "question-text";


      text.textContent =
        question.question;


      const choices =
        document.createElement(
          "div"
        );


      choices.className =
        "choices";


      question.choices.forEach(
        choice => {

          const button =
            document.createElement(
              "button"
            );


          button.type =
            "button";


          button.className =
            "choice";


          button.textContent =
            choice;


          button.addEventListener(
            "click",

            () => {

              selectAnswer(
                index,
                choice,
                choices,
                question.answer,
                card
              );

            }

          );


          choices.appendChild(
            button
          );

        }
      );


      const feedback =
        document.createElement(
          "p"
        );


      feedback.className =
        "feedback";


      feedback.hidden =
        true;


      card.append(
        number,
        text,
        choices,
        feedback
      );


      quizContainer.appendChild(
        card
      );

    }
  );


  updateSubmit();

}


/* =================================
   SELECT ANSWER
================================= */

function selectAnswer(
  index,
  selected,
  container,
  correct,
  card
) {

  if (
    finished ||
    selectedAnswers[index] !== null
  ) {
    return;
  }


  selectedAnswers[index] =
    selected;


  [
    ...container.children
  ].forEach(
    button => {

      button.disabled =
        true;


      if (
        button.textContent ===
        correct
      ) {

        button.classList.add(
          "correct"
        );

      }


      if (

        button.textContent ===
          selected &&

        selected !==
          correct

      ) {

        button.classList.add(
          "wrong"
        );

      }

    }
  );


  const feedback =
    card.querySelector(
      ".feedback"
    );


  feedback.hidden =
    false;


  if (
    selected === correct
  ) {

    feedback.textContent =
      "✓ Correct!";


    feedback.classList.add(
      "correct-text"
    );

  }

  else {

    feedback.textContent =
      `✗ Wrong. Correct answer: ${correct}`;


    feedback.classList.add(
      "wrong-text"
    );

  }


  updateSubmit();

}


/* =================================
   UPDATE FINISH BUTTON
================================= */

function updateSubmit() {

  const allAnswered =
    selectedAnswers.every(
      answer =>
        answer !== null
    );


  submitBtn.disabled =
    !allAnswered ||
    finished;

}


/* =================================
   FINISH QUIZ
================================= */

function finishQuiz() {

  if (
    !selectedAnswers.every(
      answer =>
        answer !== null
    )
  ) {
    return;
  }


  finished =
    true;


  const score =
    currentQuiz.questions.reduce(
      (
        total,
        question,
        index
      ) => {

        return (

          total +

          (

            selectedAnswers[index] ===
            question.answer

              ? 1
              : 0

          )

        );

      },
      0
    );


  const percentage =
    Math.round(

      (

        score /
        currentQuiz.questions.length

      ) * 100

    );


  const username =
    localStorage.getItem(
      USER_KEY
    ) ||
    "Player";


  /* SAVE QUIZ RESULT */

  localStorage.setItem(

    LAST_SCORE_KEY,

    JSON.stringify({

      username,

      score,

      total:
        currentQuiz.questions.length,

      percentage,

      quizTitle:
        currentQuiz.title,

      timestamp:
        Date.now()

    })

  );


  scoreText.textContent =

    `${username}, you scored ${score} out of ${currentQuiz.questions.length}.`;


  percentageText.textContent =
    `${percentage}%`;


  scoreFill.style.width =
    `${percentage}%`;


  result.hidden =
    false;


  answerKey.hidden =
    false;


  submitBtn.hidden =
    true;


  restartBtn.hidden =
    false;


  raceBtn.hidden =
    false;


  renderAnswerKey();


  result.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* =================================
   ANSWER KEY
================================= */

function renderAnswerKey() {

  keyList.innerHTML =
    "";


  currentQuiz.questions.forEach(
    (question, index) => {

      const item =
        document.createElement(
          "div"
        );


      item.className =
        "key-item";


      const q =
        document.createElement(
          "p"
        );


      q.className =
        "key-question";


      q.textContent =
        `${index + 1}. ${question.question}`;


      const a =
        document.createElement(
          "p"
        );


      a.className =
        "key-answer";


      a.textContent =
        `Correct answer: ${question.answer}`;


      item.append(
        q,
        a
      );


      if (
        question.explanation
      ) {

        const e =
          document.createElement(
            "p"
          );


        e.className =
          "key-explanation";


        e.textContent =
          question.explanation;


        item.appendChild(
          e
        );

      }


      keyList.appendChild(
        item
      );

    }
  );

}


/* =================================
   BUTTONS
================================= */

submitBtn.addEventListener(
  "click",
  finishQuiz
);


restartBtn.addEventListener(
  "click",
  () => {

    if (currentQuiz) {

      startQuiz(
        currentQuiz.id
      );

    }

  }
);


backBtn.addEventListener(
  "click",
  showQuizList
);


raceBtn.addEventListener(
  "click",
  () => {

    const username =
      usernameInput.value.trim();


    if (username) {

      localStorage.setItem(
        USER_KEY,
        username
      );

    }

  }
);


/* =================================
   START
================================= */

showQuizList();