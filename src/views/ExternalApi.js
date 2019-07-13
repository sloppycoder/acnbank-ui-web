import React, { useState } from "react";
import { Button } from "reactstrap";
import Highlight from "../components/Highlight";
import { useAuth0 } from "../react-auth0-spa";

const ExternalApi = () => {
  const [showResult, setShowResult] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const { getTokenSilently } = useAuth0();
  var responseData;

  const callApi = (path) => async () => {
    try {
      const token = await getTokenSilently();

      const response = await fetch(`/api/${path}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      responseData = await response.json();
    } catch (error) {
      console.error(error);
      responseData = error.message;
    }
    setShowResult(true);
    setApiMessage(responseData);
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

        <div>
          <p>
          Show my access token
          </p>
          <Button color="primary" className="mt-5" onClick={callApi('whoami')}>
            Show my token
          </Button>
        </div>
        <div>
          <p>
          Offers API can only be accessed before authentication
          </p>
          <Button color="primary" className="mt-5" onClick={callApi('offers')}>
            Offers
          </Button>
        </div>
        <div>
          <p>
          Transaction History API can only be accessed after full authentication
          </p>
          <Button color="primary" className="mt-5" onClick={callApi('transactions')}>
            Transactions
          </Button>
        </div>
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
