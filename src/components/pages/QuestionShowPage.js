import React, { useReducer, useEffect } from "react";
import { Link } from "react-router-dom";

import "../css/QuestionShowPage.css";
import { QuestionDetails } from "../QuestionDetails";
import { AnswerList } from "../AnswerList";
import { Question } from "../../api/question";
import { Spinner } from "../Spinner";

export const QuestionShowContext = React.createContext();

const initialState = {
  question: null,
  isLoading: true
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_QUESTION":
      return {
        question: action.payload,
        isLoading: false
      };

    case "DELETE_QUESTION":
      return {
        question: null,
        isLoading: true
      };

    case "DELETE_ANSWER":
      return {
        ...state,
        question: action.payload
      };
  }
};

const QuestionShowPage = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const currentQuestionId = props.match.params.id;

  const deleteQuestion = () => {
    Question.destroy(state.question.id).then(data => {
      dispatch({ type: "DELETE_QUESTION" });
      props.history.push("/questions");
    });
  };

  const deleteAnswer = id => {
    const newAnswers = state.question.answers.filter(a => a.id !== id);

    const payload = {
      ...state.question,
      answers: newAnswers
    };

    dispatch({ type: "DELETE_ANSWER", payload });
  };

  useEffect(() => {
    Question.one(currentQuestionId).then(question => {
      // setQuestionShow({ question, isLoading: false });
      dispatch({ type: "FETCH_QUESTION", payload: question });
    });
  }, [currentQuestionId]);

  if (state.isLoading) {
    return <Spinner message="Question doesn't exist" />;
  }
  return (
    <div className="Page">
      <QuestionDetails {...state.question} />
      <Link
        className="ui small right floated orange button" 
        to={`/questions/${state.question.id}/edit`}
      >
        Edit
      </Link>
      <button
        className="ui small right floated red button"
        onClick={() => deleteQuestion()}
      >
        Delete
      </button>
      <QuestionShowContext.Provider value={deleteAnswer}>
        <AnswerList answers={state.question.answers} />
      </QuestionShowContext.Provider>
    </div>
  );
};

export default QuestionShowPage;
