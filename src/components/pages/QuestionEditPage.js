import React, { useState, useEffect } from "react";

import { Question } from "../../api/question";
import { FormErrors } from "../FormErrors";
import { Spinner } from "../Spinner";
import { QuestionForm } from "../QuestionForm";

export const QuestionEditPage = props => {
  const [errors, setErrors] = useState([]);
  const [question, setQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const updateQuestion = event => {
    event.preventDefault();
    const { currentTarget } = event;

    const fd = new FormData(currentTarget);

    const updatedQuestion = {
      title: fd.get("title"),
      body: fd.get("body")
    };

    Question.update(props.match.params.id, updatedQuestion).then(data => {
      if (data.errors) {
        setErrors(data.errors);
      } else {
        props.history.push(`/questions/${data.id}`);
      }
    });
  };

  useEffect(() => {
    Question.one(props.match.params.id).then(question => {
      setQuestion(question);
      setIsLoading(false);
    });
  }, [props.match.params.id]);

  if (isLoading) {
    return <Spinner message="Question doesn't exist to edit" />;
  }

  return (
    <QuestionForm
      errors={errors}
      onUpdateQuestion={updateQuestion}
      buttonMessage="Update Question"
      question={question}
    />
  );
};
