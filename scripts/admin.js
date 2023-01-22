

let baseServerURL = "http://localhost:3000";

// users count functionality
fetchUserServer()
function fetchUserServer() {
  fetch(`${baseServerURL}/users`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      // console.log(data)
      document.getElementById("total_users").innerText = data.length;
    })
}

// flight count functionality
fetchFlightServer()
function fetchFlightServer() {
  fetch(`${baseServerURL}/flights`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      document.getElementById("total_flight").innerText = data.length;
    })
}

// hotel count functionality
fetchHotelServer()
function fetchHotelServer() {
  fetch(`${baseServerURL}/hotels`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      // console.log(data)
      document.getElementById("total_hotels").innerText = data.length;
    })
}

function flightPage() {
  location.href = "admin_flight.html";
}
function hotelPage() {
  location.href = "admin_hotel.html";
}
function userPage() {
  location.href = "admin_users.html";
}

let adminName = JSON.parse(localStorage.getItem("admin"));
document.getElementById("adminNameShow").innerText = adminName;
function logoutFun() {
  localStorage.removeItem("admin");
  location.href = "index.html"
}