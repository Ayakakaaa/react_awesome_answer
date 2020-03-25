import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Question } from "../../api/question";
import { Spinner } from "../Spinner";

export const QuestionIndexPage = () => {
  // const [questions, setQuestions] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const [questionIndex, setQuestionIndex] = useState({
    questions: [],
    isLoading: true
  });

  const deleteQuestion = id => {
    const newQuestionsList = questionIndex.questions.filter(q => q.id !== id);
    // setQuestions(newQuestionsList);
    setQuestionIndex({ ...questionIndex, questions: newQuestionsList });
  };

  useEffect(() => {
    Question.all().then(questions => {
      // setQuestions(questions);
      // setIsLoading(false);
      setQuestionIndex({ questions, isLoading: false });
    });
  }, []);

  if (questionIndex.isLoading) {
    return <Spinner message="Wait to load the list of questions" />;
  }
  return (
    <main>
      <h2 className="ui horizontal divider header">Questions</h2>
      <ul className="ui list">
        {questionIndex.questions.map(question => (
          <li className="item" key={question.id}>
            <Link to={`/questions/${question.id}`} className="ui link" href="">
              {question.title}
            </Link>
            <button
              className="ui small right floated red button"
              onClick={() => deleteQuestion(question.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};
