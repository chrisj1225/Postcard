const validCoordinate = (pos, type) => {
  switch (type) {
    case "lat":
      return pos >= -90 && pos <= 90;
    case "long":
      return pos >= -180 && pos <= 180;
  }
}

module.exports = validCoordinate;