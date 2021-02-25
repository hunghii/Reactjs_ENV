/**
 * LoadingINdicator (Component)
 */

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dot from './Dot';
import Wrapper from './Wrapper';
import Icon from "images/idea-bulb.gif"
function Loading() {
  return (
    <Wrapper style={{display:"flex",justifyContent:"center",background:"white"}}>
      {/* <Dot className="one">
        <FontAwesomeIcon icon="circle" />
      </Dot>
      <Dot className="two">
        <FontAwesomeIcon icon="circle" />
      </Dot>
      <Dot className="three">
        <FontAwesomeIcon icon="circle" />
      </Dot> */}
      <img src={Icon} height="40%" width="40%" />
    </Wrapper>
    
  );
}

export default Loading;
