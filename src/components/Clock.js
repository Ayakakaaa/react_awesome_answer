import React, { useState, useEffect } from "react";

import { setInterval, clearInterval } from "timers";

export const Clock = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    console.log("Clock is mounted");
    const interValId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    
    return () => {
      // what ever is happening here, will happen when component
      // is removed from DOM just like componentWillUnmount
      console.log("Clock is unmounted");
      clearInterval(interValId);
    };
  }, []);

  // console.log("inside render method");
  return (
    <div className="ui brown label item">{dateTime.toLocaleTimeString()}</div>
  );
};
