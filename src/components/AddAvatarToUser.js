import React, { useState, useEffect } from "react";

import { User } from "../api/user";
import { baseUrl } from "../config";

export const UserEditPage = props => {
  const [user, setUser] = useState({});
  const [fileUrl, setFileUrl] = useState();

  const previewAvatar = event => {
    const { currentTarget } = event;

    debugger;
    setFileUrl(file);
  };

  const updateUser = event => {
    event.preventDefault();
    const { currentTarget: formNode } = event;

    const fd = new FormData(formNode);

    fetch(`${baseUrl}/users/current`, {
      method: "PATCH",
      body: fd,
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(() => {
        props.history.push("/");
        // check if type of the method you sent down here is a function
        
        // if it is, then go ahead and update user
        if (typeof props.onUpdateUser === "function") {
            props.onUpdateUser();
        }
      });
  };
  return (
    <>
      <h1 className="ui header">Edit User</h1>
      { fileUrl && (
          <img src={fileUrl} />
      )}
      <form>
        <label
          for="embedpollfileinput"
          className="ui huge green right floated button"
        >
          <i className="ui upload icon"></i>
          Add Avatar
        </label>
        <button className="ui blue button" type="submit">
          Save Changes
        </button>
      </form>
    </>
  );
};
