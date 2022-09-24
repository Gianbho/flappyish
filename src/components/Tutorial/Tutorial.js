import React, { useState, useEffect } from "react";
import "./tutorial.css";
import eventsBus from '../../events/eventsBus-1'

let interval = null;
let countInterval = null;
let messages = [
  "Schiva gli ostacoli e non farti prendere dal mostro!",
  "Schiva gli ostacoli e non farti prendere dal mostro!",
  "Prendi i potenziamenti per accumulare più punti!",
  "Prendi i potenziamenti per accumulare più punti!",
  "Buona fuga!",
  "Buona fuga!",
  false,
];
const Tutorial = (props) => {
  let i = 0;
  const [controller, setController] = useState({
    message: messages[i],
    count: 3,
  });

  useEffect(() => {
    interval = setInterval(() => {
      i++;
      setController({
        ...controller,
        message: messages[i],
      });
    }, 1500);
    return () => {
      clearInterval(interval, countInterval);
    };
  }, []);

  useEffect(() => {
    if (!controller.message) {
      clearInterval(interval);
      countInterval = setInterval(() => {
        setController({
          ...controller,
          count: --controller.count,
        });
      }, 1000);
    }
  }, [controller.message]);

  useEffect(() => {
    if (controller.count <= 0) {
      clearInterval(countInterval);
      setController({
        ...controller,
        count: null,
      });
    eventsBus.dispatch('endTutorial');
    }
  }, [controller.count]);

  return (
    <>
      <div className="tutorial">
        <span>{controller.message || controller.count}</span>
      </div>
    </>
  );
};

export default Tutorial;
