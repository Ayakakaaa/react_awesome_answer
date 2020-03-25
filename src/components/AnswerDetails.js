import React, { useContext } from "react";
import { QuestionShowContext } from "./pages/QuestionShowPage";


export const AnswerDetails = props => {
  const deleteAnswer = useContext(QuestionShowContext);
  return (
    <div>
      <p>
        {props.body} <br />
        By{" "}
        <small
          style={{
            color: "red",
            fontStyle: "italic"
          }}
        >
          {props.author.full_name}
        </small>
      </p>
      <p>Answered {props.created_at.toLocaleString()}</p>
            <button
              className="ui small  red button"
              onClick={() => deleteAnswer(props.id)}
            >
              Delete
            </button>
    </div>
  );
};
