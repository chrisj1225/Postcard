import React from 'react';

export default props => {
  const {
    marker,
    index,
    lat,
    lng
  } = props;
  debugger
  return (
    <div id={ `popup-${index}` } className="marker-info-wrapper">
      <p className="marker-info">{lat},{lng}</p>
    </div>
  );
};