import React, { useState, useEffect } from "react";

import { User } from "../../api/user";
import { baseUrl } from "../../config";

export const UserEditPage = props => {
  const [user, setUser] = useState({});
  const [fileUrl, setFileUrl] = useState();

  const previewAvatar = event => {
    const { currentTarget } = event;

    debugger;

    setFileUrl(URL.createObjectURL(fileUrl));
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
        if (typeof props.onUpdateUser === "function") {
          props.onUpdateUser();
        }
      })
      .catch(err => {
        debugger;
      });
  };
  return (
    <>
      <h1 className="ui header">Edit User</h1>
      {props.currentUser && (
        <>
          <div className="ui card">
            <div className="image">
              <img src={`${props.currentUser.avatar.url || undefined}`} />
            </div>
            <div className="content">
              <a className="header">{props.currentUser.full_name}</a>
              <div className="meta">
                <span className="date">Joined in 2013</span>
              </div>
              <div className="description">
                Kristy is an art director living in New York.
              </div>
            </div>
            <div className="extra content">
              <a>
                <i className="user icon"></i>
                22 Friends
              </a>
            </div>
          </div>
        </>
      )}
      <form onSubmit={updateUser}>
        <label>Edit Avatar</label>
        <input type="file" name="avatar" />
        <button className="ui blue button" type="submit">
          Save Changes
        </button>
      </form>
    </>
  );
};
