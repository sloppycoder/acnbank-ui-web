import React, { useState } from "react";
import { Button } from "reactstrap";
import Highlight from "../components/Highlight";
import Hero from '../components/Hero.js'
import { useAuth0 } from "../react-auth0-spa";
import jwtDecode from 'jwt-decode';

const Home = () => {
  const [showResult, setShowResult] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [scopes, setScopes] = useState("");

  const { getTokenSilently } = useAuth0();
  var responseData;

  const callApi = (path) => async () => {
    try {
      const token = await getTokenSilently();
      console.log("token", token);
      const scopes = jwtDecode(token).scope.replace("openid ", "").replace("email ", "").replace("profile ", "");
      console.log("scopes", scopes);
      setScopes(scopes);

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
    <Hero/>
      <div className="mb-5">
        <h1>External API</h1>
        <p>Current scopes: {scopes}</p>
        <p>
          Call external APIs by clicking one of the button below. This will call the
          external API using an access token, and the API will validate it using
          the API's audience value.
        </p>

        <div className="table-responsive mb-5">
          <table className="table">
            <tbody>
            <tr>
              <td>Show my access token</td>
              <td>
                <Button color="primary" className="btn btn-primary btn-block" onClick={callApi('whoami')}>
                Show Token
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                Offers API can only be accessed before authentication
              </td>
              <td>
              <Button color="primary" className="btn btn-primary btn-block" onClick={callApi('offers')}>
                Offers
              </Button>
              </td>
            </tr>
            <tr>
              <td>
                Transaction History API can only be accessed after full authentication
              </td>
              <td>
                <Button color="primary" className="btn btn-primary btn-block" onClick={callApi('transactions')}>
                Transactions
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                Fund transfer can only be performed if a user has been authencatied by multi-factored mechanism
              </td>
              <td>
                <Button color="primary" className="btn btn-primary btn-block" onClick={callApi('transfers')}>
                Transfer
                </Button>
              </td>
            </tr>
            </tbody>
          </table>
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

export default Home;
