import React, { useState } from "react";
import { Button } from "reactstrap";
import Highlight from "../components/Highlight";
import { useAuth0 } from "../react-auth0-spa";

const ExternalApi = () => {
  const [showResult, setShowResult] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const { getTokenSilently } = useAuth0();

  const callApi = async () => {
    try {
      const token = await getTokenSilently();

      const response = await fetch("http://localhost:8080/api/whoami", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const responseData = await response.json();

      setShowResult(true);
      setApiMessage(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mb-5">
        <h1>External API</h1>
        <p>
          Call external APIs by clicking one of the button below. This will call the
          external API using an access token, and the API will validate it using
          the API's audience value.
        </p>

        <p>
          Who Am I is an API that displays the details on an JWT token
        </p>
        <Button color="primary" className="mt-5" onClick={callApi}>
          Who Am I
        </Button>
      </div>

      <div className="result-block-container">
        <div className={`result-block ${showResult && "show"}`}>
          <h6 className="muted">Result</h6>
          <Highlight>{JSON.stringify(apiMessage, null, 2)}</Highlight>
        </div>
      </div>
    </>
  );
};

export default ExternalApi;
