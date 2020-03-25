import React from "react";

export const QuestionDetails = props => {
  return (
    <div className="ui segment">
      <h2 className="ui header">{props.title}</h2>
      <p>
        {props.body} <br />
        By {props.author.full_name}
      </p>
      <small>
        Seen {props.view_count} times - {props.created_at.toLocaleString()}
      </small>
    </div>
  );
};
