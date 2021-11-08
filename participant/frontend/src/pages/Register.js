import React, { useState } from "react";

import Error from "./Error";
import Form from "./Form";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Register() {
  const [state, setState] = useState({ isDone: false, error: false });
  const urlSearchParams = new URLSearchParams(useLocation().search);

  const registerCallback = (data) => {
    var body = {
      geneTrustee: "wolper",
      clinical: "nswhp",
      participant: data
    };

    axios
      .post(process.env.REACT_APP_API, body)
      .then(() => {
        setState({ isDone: true, error: false });
      })
      .catch((response) => {
        setState({
          isDone: true,
          error: { request: data, response: response.response }
        });
      });
  };

  if (!state.isDone) {
    return <Form submit={registerCallback} />;
  }

  if (state.error) {
    return <Error reason="post" context={state.error} />;
  }
  return (
    <h1>
      Success! Go check out the{" "}
      <a href="https://genetrustee.public.garvan.org.au/nswhp">Clinical</a> and{" "}
      <a href="https://genetrustee.public.garvan.org.au/wolper">GeneTrustree</a>{" "}
      interfaces to see the addition.
    </h1>
  );
}
