const QUIZ_KEY =
  "myQuizWebsiteQuizzes";


const defaultQuizzes = [

  {
    id:
      "sample",

    title:
      "Web Development Basics",

    description:
      "Sample quiz. Edit or delete it.",

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
          "CSS controls the appearance of web pages."

      }

    ]

  }

];


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


function saveQuizzes(
  quizzes
) {

  localStorage.setItem(

    QUIZ_KEY,

    JSON.stringify(
      quizzes
    )

  );

}


const quizList =
  document.getElementById(
    "quizList"
  );


const editor =
  document.getElementById(
    "editor"
  );


const newQuizBtn =
  document.getElementById(
    "newQuizBtn"
  );


const addQuestionBtn =
  document.getElementById(
    "addQuestionBtn"
  );


const saveQuizBtn =
  document.getElementById(
    "saveQuizBtn"
  );


const cancelBtn =
  document.getElementById(
    "cancelBtn"
  );


const quizNameInput =
  document.getElementById(
    "quizNameInput"
  );


const quizDescriptionInput =
  document.getElementById(
    "quizDescriptionInput"
  );


const questionEditorList =
  document.getElementById(
    "questionEditorList"
  );


const formMessage =
  document.getElementById(
    "formMessage"
  );


const editorMode =
  document.getElementById(
    "editorMode"
  );


const editorTitle =
  document.getElementById(
    "editorTitle"
  );


let editingQuizId =
  null;


/* =================================
   SHOW QUIZZES
================================= */

function renderQuizList() {

  quizList.innerHTML =
    "";


  const quizzes =
    getQuizzes();


  if (!quizzes.length) {

    quizList.innerHTML = `

      <div class="empty-state">

        No questionnaires yet.

        Click + to create one.

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
        "manage-quiz-card";


      const info =
        document.createElement(
          "div"
        );


      info.className =
        "manage-quiz-info";


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


      const actions =
        document.createElement(
          "div"
        );


      actions.className =
        "manage-actions";


      const edit =
        document.createElement(
          "button"
        );


      edit.type =
        "button";


      edit.className =
        "edit-btn";


      edit.textContent =
        "Edit";


      edit.addEventListener(
        "click",

        () =>
          openEditor(
            quiz
          )
      );


      const del =
        document.createElement(
          "button"
        );


      del.type =
        "button";


      del.className =
        "delete-btn";


      del.textContent =
        "Delete";


      del.addEventListener(
        "click",

        () =>
          deleteQuiz(
            quiz.id
          )
      );


      actions.append(
        edit,
        del
      );


      card.append(
        info,
        actions
      );


      quizList.appendChild(
        card
      );

    }
  );

}


/* =================================
   OPEN EDITOR
================================= */

function openEditor(
  quiz = null
) {

  editingQuizId =
    quiz
      ? quiz.id
      : null;


  editorMode.textContent =
    quiz
      ? "Edit Quiz"
      : "New Quiz";


  editorTitle.textContent =
    quiz
      ? "Edit Questionnaire"
      : "Create Questionnaire";


  quizNameInput.value =
    quiz
      ? quiz.title
      : "";


  quizDescriptionInput.value =
    quiz
      ? quiz.description || ""
      : "";


  questionEditorList.innerHTML =
    "";


  if (
    quiz &&
    quiz.questions.length
  ) {

    quiz.questions.forEach(
      question =>
        addQuestion(
          question
        )
    );

  }

  else {

    addQuestion();

  }


  formMessage.hidden =
    true;


  editor.hidden =
    false;


  editor.scrollIntoView({
    behavior: "smooth"
  });

}


/* =================================
   ADD QUESTION
================================= */

function addQuestion(
  question = null
) {

  const card =
    document.createElement(
      "article"
    );


  card.className =
    "question-editor";


  card.innerHTML = `

    <div class="question-editor-header">

      <h4>
        Question
      </h4>


      <button
        type="button"
        class="remove-question-btn"
      >
        Remove
      </button>

    </div>


    <label>

      Question

      <textarea
        class="question-input"
        rows="2"
        placeholder="Type your question here..."
      ></textarea>

    </label>


    <div class="choice-grid">


      <div class="choice-row">

        <label>

          Choice A

          <input
            class="choice-input"
            type="text"
            placeholder="Answer A"
          >

        </label>


        <label>

          Correct Answer

          <select
            class="correct-select"
          >

            <option value="0">
              Choice A
            </option>

            <option value="1">
              Choice B
            </option>

            <option value="2">
              Choice C
            </option>

            <option value="3">
              Choice D
            </option>

          </select>

        </label>

      </div>


      <div class="choice-row">

        <label>

          Choice B

          <input
            class="choice-input"
            type="text"
            placeholder="Answer B"
          >

        </label>

        <span></span>

      </div>


      <div class="choice-row">

        <label>

          Choice C

          <input
            class="choice-input"
            type="text"
            placeholder="Answer C"
          >

        </label>

        <span></span>

      </div>


      <div class="choice-row">

        <label>

          Choice D

          <input
            class="choice-input"
            type="text"
            placeholder="Answer D"
          >

        </label>

        <span></span>

      </div>

    </div>


    <label style="margin-top:14px">

      Explanation (optional)

      <textarea
        class="explanation-input"
        rows="2"
        placeholder="Why is this answer correct?"
      ></textarea>

    </label>

  `;


  questionEditorList.appendChild(
    card
  );


  card.querySelector(
    ".question-input"
  ).value =

    question
      ? question.question
      : "";


  const inputs =
    [
      ...card.querySelectorAll(
        ".choice-input"
      )
    ];


  const choices =

    question
      ? question.choices
      : [
          "",
          "",
          "",
          ""
        ];


  choices.forEach(
    (choice, index) => {

      inputs[index].value =
        choice || "";

    }
  );


  card.querySelector(
    ".explanation-input"
  ).value =

    question
      ? question.explanation || ""
      : "";


  if (question) {

    const correctIndex =
      question.choices.indexOf(
        question.answer
      );


    if (
      correctIndex >= 0
    ) {

      card.querySelector(
        ".correct-select"
      ).value =
        String(correctIndex);

    }

  }


  card.querySelector(
    ".remove-question-btn"
  ).addEventListener(

    "click",

    () => {

      card.remove();

      renumberQuestions();

    }

  );


  renumberQuestions();

}


/* =================================
   NUMBER QUESTIONS
================================= */

function renumberQuestions() {

  const cards =
    [
      ...questionEditorList
        .querySelectorAll(
          ".question-editor"
        )
    ];


  cards.forEach(
    (card, index) => {

      card.querySelector(
        "h4"
      ).textContent =

        `Question ${index + 1}`;

    }
  );

}


/* =================================
   READ QUESTIONS
================================= */

function readQuestions() {

  const cards =
    [
      ...questionEditorList
        .querySelectorAll(
          ".question-editor"
        )
    ];


  if (
    cards.length === 0
  ) {

    throw new Error(
      "Add at least one question."
    );

  }


  return cards.map(
    card => {

      const question =
        card.querySelector(
          ".question-input"
        )
          .value
          .trim();


      const choices =
        [
          ...card.querySelectorAll(
            ".choice-input"
          )
        ].map(
          input =>
            input.value.trim()
        );


      const correctIndex =
        Number(
          card.querySelector(
            ".correct-select"
          ).value
        );


      const explanation =
        card.querySelector(
          ".explanation-input"
        )
          .value
          .trim();


      if (!question) {

        throw new Error(
          "Every question needs question text."
        );

      }


      if (
        choices.some(
          choice =>
            !choice
        )
      ) {

        throw new Error(
          "Every question needs all four choices."
        );

      }


      return {

        question,

        choices,

        answer:
          choices[
            correctIndex
          ],

        explanation

      };

    }
  );

}


/* =================================
   MESSAGE
================================= */

function showMessage(
  text,
  error = false
) {

  formMessage.hidden =
    false;


  formMessage.textContent =
    text;


  formMessage.style.background =
    error
      ? "#fee2e2"
      : "#dcfce7";


  formMessage.style.color =
    error
      ? "#991b1b"
      : "#166534";

}


/* =================================
   SAVE QUIZ
================================= */

function saveQuiz() {

  const title =
    quizNameInput
      .value
      .trim();


  const description =
    quizDescriptionInput
      .value
      .trim();


  if (!title) {

    showMessage(
      "Please enter a quiz title.",
      true
    );


    return;

  }


  let questions;


  try {

    questions =
      readQuestions();

  }

  catch (error) {

    showMessage(
      error.message,
      true
    );


    return;

  }


  const quizzes =
    getQuizzes();


  /* EDIT */

  if (editingQuizId) {

    const index =
      quizzes.findIndex(
        quiz =>
          quiz.id ===
          editingQuizId
      );


    if (
      index >= 0
    ) {

      quizzes[index] = {

        ...quizzes[index],

        title,

        description,

        questions

      };

    }

  }


  /* CREATE */

  else {

    quizzes.push({

      id:
        `quiz-${Date.now()}-${Math.random()
          .toString(16)
          .slice(2)}`,

      title,

      description,

      questions

    });

  }


  saveQuizzes(
    quizzes
  );


  renderQuizList();


  showMessage(
    "Quiz saved successfully!"
  );


  setTimeout(
    () => {

      editor.hidden =
        true;

    },

    500
  );

}


/* =================================
   DELETE
================================= */

function deleteQuiz(
  id
) {

  const quizzes =
    getQuizzes();


  const quiz =
    quizzes.find(
      item =>
        item.id === id
    );


  if (!quiz) {
    return;
  }


  if (

    !window.confirm(
      `Delete "${quiz.title}"?`
    )

  ) {

    return;

  }


  saveQuizzes(

    quizzes.filter(
      item =>
        item.id !== id
    )

  );


  renderQuizList();

}


/* =================================
   BUTTONS
================================= */

newQuizBtn.addEventListener(
  "click",

  () =>
    openEditor()
);


addQuestionBtn.addEventListener(
  "click",

  () =>
    addQuestion()
);


saveQuizBtn.addEventListener(
  "click",

  saveQuiz
);


cancelBtn.addEventListener(
  "click",

  () => {

    editor.hidden =
      true;

  }
);


/* =================================
   START
================================= */

renderQuizList();