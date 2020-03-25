import React from "react";
import{ AnswerDetails } from "./AnswerDetails"

export const AnswerList = props => {

    return(
        <>
        <h2 className="ui horizontal divider header">Answers</h2>
        <ul className="ui list">
            {props.answers.map(answer => (
                <AnswerDetails 
                    key = {answer.id}
                    // body = {answer.body}
                    // author = {answer.author}
                    // created_at={new Date(answer.created_at)}
                    {...answer}
                    onDeleteClick={props.onAnswerDeleteClick}
                />
            ))}
        </ul>
        </>
    )
}