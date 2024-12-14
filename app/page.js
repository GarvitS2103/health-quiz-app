"use client";

import { useState } from "react";
import styles from "./page.module.css"; // Ensure you have styles in the CSS file

export default function HealthQuizApp() {
  const [selectedDefect, setSelectedDefect] = useState(null);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  // Diseases and their respective questions
  const healthDefects = {
    "Diaphragmatic Hernia": [
      "Is diaphragmatic hernia a congenital condition?",
      "Can diaphragmatic hernia cause breathing problems in infants?",
      "Is surgery often required to treat diaphragmatic hernia?",
      "Is diaphragmatic hernia associated with a hole in the diaphragm?",
      "Can diaphragmatic hernia lead to lung underdevelopment?",
      "Is diaphragmatic hernia more common on the left side?",
      "Does diaphragmatic hernia always present at birth?",
      "Is prenatal diagnosis of diaphragmatic hernia possible?",
      "Can diaphragmatic hernia cause heart displacement?",
      "Is the prognosis for children with diaphragmatic hernia better if diagnosed early?",
      "Does diaphragmatic hernia have a high mortality rate in untreated cases?",
      "Can diaphragmatic hernia cause gastrointestinal issues?",
      "Does treatment of diaphragmatic hernia usually involve surgery within hours of birth?",
      "Can diaphragmatic hernia be repaired with minimally invasive techniques?"
    ],
    Polydactyly: [
      "Is polydactyly a condition where a person is born with extra fingers or toes?",
      "Can polydactyly occur in both hands and feet?",
      "Is polydactyly always inherited genetically?",
      "Can polydactyly be acquired during fetal development?",
      "Is polydactyly usually caused by a mutation in the ZRS gene?",
      "Can polydactyly result in functional problems with the hands or feet?",
      "Are extra fingers or toes usually fully developed in polydactyly?",
      "Is polydactyly more common in African American populations?",
      "Can polydactyly be treated through surgical removal of the extra digits?",
      "Is polydactyly more likely to affect the thumbs and big toes?",
      "Is polydactyly classified as a type of congenital limb abnormality?",
      "Can polydactyly be diagnosed using prenatal ultrasound?",
      "Is polydactyly sometimes associated with other genetic disorders?",
      "Can polydactyly affect both hands and feet in the same individual?"
    ],
    "Congenital Heart Defect": [
      "Is congenital heart defect a condition present at birth?",
      "Can congenital heart defects be diagnosed before birth?",
      "Can surgery correct most congenital heart defects?",
      "Is congenital heart defect the leading cause of birth defects in the United States?",
      "Are all congenital heart defects serious and life-threatening?",
      "Can a congenital heart defect be detected using an echocardiogram?",
      "Is congenital heart defect always hereditary?",
      "Can congenital heart defects be repaired in childhood?",
      "Is the survival rate for children with congenital heart defects improving?",
      "Do all congenital heart defects require surgery?",
      "Can congenital heart defects cause long-term health complications in adulthood?",
      "Can a congenital heart defect affect the heart's ability to pump blood efficiently?",
      "Are congenital heart defects more common in infants with Down syndrome?",
      "Can a congenital heart defect be corrected through catheter-based interventions?",
      "Do certain environmental factors increase the risk of congenital heart defects?"
    ]
  };

  // Correct answers for each question in each disease
  const correctAnswers = {
    "Diaphragmatic Hernia": [
      "True", "True", "True", "True", "True", "True", "True", "True", "True", "True", "True", "True", "True", "True"
    ],
    Polydactyly: [
      "True", "True", "False", "True", "True", "True", "True", "True", "True", "True", "True", "True", "True", "True"
    ],
    "Congenital Heart Defect": [
      "True", "True", "True", "True", "False", "True", "False", "True", "True", "False", "True", "True", "True", "True", "True"
    ]
  };

  // Handle the dropdown selection
  const handleSelection = (event) => {
    const selected = event.target.value;
    setSelectedDefect(selected);
    setQuestionIndex(0); // Reset to the first question of the selected disease
    setUserAnswer("");
    setFeedback("");
    setScore(0); // Reset the score for a new selection
  };

  // Handle the submission of the answer
  const handleSubmit = () => {
    if (!selectedDefect || questionIndex >= healthDefects[selectedDefect].length) return;

    // Check if the answer is correct (case-insensitive)
    const correctAnswer = correctAnswers[selectedDefect][questionIndex];
    if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("Correct! 🎉");
      setScore(score + 1);
    } else {
      setFeedback(`Wrong! The correct answer is: ${correctAnswer}.`);
    }

    // Move to the next question
    setUserAnswer("");
    setQuestionIndex(questionIndex + 1);
  };

  // Get the current question
  const currentQuestion = selectedDefect
    ? healthDefects[selectedDefect][questionIndex]
    : null;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Health Quiz</h1>
      <p className={styles.score}>Your Score: {score}</p>

      <div className={styles.dropdown}>
        <label htmlFor="defects">Select a Disease:</label>
        <select id="defects" onChange={handleSelection}>
          <option value="">-- Select --</option>
          {Object.keys(healthDefects).map((defect) => (
            <option key={defect} value={defect}>
              {defect}
            </option>
          ))}
        </select>
      </div>

      {currentQuestion && (
        <div className={styles.quizSection}>
          <h2 className={styles.question}>{currentQuestion}</h2>
          <input
            type="text"
            placeholder="Enter your answer (True/False)"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleSubmit} className={styles.submitButton}>
            Submit Answer
          </button>
        </div>
      )}

      {feedback && <p className={styles.feedback}>{feedback}</p>}
    </div>
  );
}
