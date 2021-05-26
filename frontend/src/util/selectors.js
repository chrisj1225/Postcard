export const attachTripPos = (trip, postcardsState) => {
  let tripCopy = Object.assign({}, trip);
  const postcards = Object.values(Object.assign({},postcardsState));
  const tripPostcards = postcards.filter(postcard => postcard.tripId === trip.id);
  const latAvg = tripPostcards.reduce((total, postcard) => total + postcard.lat, 0)/tripPostcards.length;
  const lngAvg = tripPostcards.reduce((total, postcard) => total + postcard.lng, 0)/tripPostcards.length;
  tripCopy.lat = latAvg;
  tripCopy.lng = lngAvg;
  return tripCopy;
};

export const attachAllTripPos = (tripsState, postcardsState) => {
  const trips = Object.values(Object.assign({}, tripsState));
  return trips.map(trip => attachTripPos(trip, postcardsState));
};

export const attachPhotoTiles = (trip, postcardsState) => {
  let tripCopy = Object.assign({}, trip);
  const postcards = Object.values(postcardsState);
  const tripPostcards = postcards.filter(postcard => postcard.tripId === trip.id);
  let firstFourImages = tripPostcards.slice(0,4).map(postcard => postcard.photos[0]);
  firstFourImages = firstFourImages.filter(photoUrl => photoUrl);
  let i = 1;
  while (firstFourImages.length < 4) {
    for (let postcard of tripPostcards.slice(0,4)) {
      if (postcard.photos[i]) firstFourImages.push(postcard.photos[i]);
      if (firstFourImages.length >= 4) break;
    }
    i++;
    if (i > 20) {
      while (firstFourImages.length < 4) {
        firstFourImages.push(null);
      }
    }
  }
  tripCopy.photoTiles = firstFourImages;
  return tripCopy;
};

export const attachAllPhotoTiles = (tripsState, postcardsState) => {
  const trips = Object.values(Object.assign({}, tripsState));
  return trips.map(trip => attachPhotoTiles(trip, postcardsState));
}