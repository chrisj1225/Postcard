# <a href="https://postcard-triplog.herokuapp.com/#/" target="_blank">Postcard</a>
#### *The app for the person who loves to travel and keep a beautiful scrapbook of their travels. Users can view other users' travels and even follow their `Trips`!*

---

## **Postcard** is a MERN stack project
#### Technologies employed

* MongoDB
  * MongoDB is a general purpose, document-based, distributed database. Accessing it allows for much faster queries as opposed to a SQL database.
* ExpressJS
  * ExpressJS is a fast web framework facilitating the controller aspect of backend routing in a MERN stack app.
* ReactJS
  * A JavaScript library used for building fast, responsive, and interactive views for any kind of app.
* NodeJS
  * Node is used primarily as a runtime environment for a MERN stack to run a server. Also, it provides a lot of flexibility for building via the Node Package Manager (NPM) library installation feature.
* Google Maps API
  * Google Maps API allows developers to implement beautiful, interactive maps within their applications.
* Amazon Web Services
  * Amazon Web Services provides a gamut of services a developer may need. From photo storage to web app hosting, Amazon almost does it all. In this case, we only utilize the photo storage service.

---

## Feature highlights
### Implementation of Google Maps API
Google Maps wasn't terribly difficult to implement and get started, however, it was somewhat tricky to make the map interactive with the rest of the app because when the map loads it doesn't really load any HTML elements with easily "grabbable" properties. We envisioned the user being able to see a correlation on the map when selecting or interacting with other parts of the app. So, our solution to that was this:
```javascript
// event listeners for hovering the markers
marker.addListener("mouseover", e => {

});
marker.addListener("mouseout", e => {

});
        
// event listener for clicking the marker
marker.addListener("click", e => {
          
});

// event listeners for hovering the corresponding list item
document.getElementById(`trip-item-${trip._id}`)addEventListener("mouseenter", () =>{

});

document.getElementById(`trip-item-${trip._id}`).addEventListener("mouseleave", () =>{

});

```
As markers were being generated to be placed on the map, we would install listeners on the markers themselves as well as the corresponding elements that should have interactivity with their marker.

In addition to the maps interactivity, we also were able to implement a places search box allowing the user to search for a place they may have visited and select it on the map when creating or editing a `Postcard`. 