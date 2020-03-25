import React, { useState } from "react";

import { Question } from "../../api/question";
import { QuestionForm } from "../QuestionForm";

export const QuestionNewPage = props => {
  const [errors, setErrors] = useState([]);

  const createQuestion = event => {
    event.preventDefault();
    const { currentTarget } = event;
    const fd = new FormData(currentTarget);

    const newQuestion = {
      title: fd.get("title"),
      body: fd.get("body")
    };

    Question.create(newQuestion).then(data => {
      if (data.errors) {
        setErrors(data.errors);
        console.log("errors: ", errors);
      } else {
        props.history.push(`/questions/${data.id}`);
      }
    });

    currentTarget.reset();
  };
  return (
    <QuestionForm
      errors={errors}
      onCreateQuestion={createQuestion}
      buttonMessage="Create Question"
    />
  );
};
