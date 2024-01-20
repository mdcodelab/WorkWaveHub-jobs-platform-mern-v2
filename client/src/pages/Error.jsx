import React from 'react';
import {Link, useRouteError} from "react-router-dom";
import styled from "styled-components";

function Error() {
    const error=useRouteError();
    console.log(error);
  return (
    <div>
      <h1>Error</h1>
    </div>
  );
}

export default Error;
