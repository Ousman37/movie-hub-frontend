import React from "react";

const EnvCheck = () => {
  return (
    <div>
      <h1>Environment Check</h1>
      <p>API Key: {process.env.REACT_APP_TMDB_API_KEY}</p>
    </div>
  );
};

export default EnvCheck;
