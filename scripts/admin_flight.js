let baseServerURL = "http://localhost:3000";
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var closeBtn = document.getElementById("close");
var submitBtn = document.getElementById("submitBtn");
var updateBtn = document.getElementById("updateBtn");
var registerFlight = document.getElementById("registerFlight");
var updateFlight = document.getElementById("updateFlight");

fetchFlightServer()


// fetch flight data form server
let flightArray;
function fetchFlightServer() {
  fetch(`${baseServerURL}/flights`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      // console.log(data);
      flightArray = data.reverse();
      showFlightData(flightArray);
    })
}

// sorting functionality by price
let sortPrice = document.getElementById("sortPrice");
sortPrice.addEventListener("change", (e) => {
  if (e.target.value == 'l2h') {
    fetch(`${baseServerURL}/flights?_sort=price&_order=asc`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        showFlightData(data);
      })
  }
  else if (e.target.value == 'h2l') {
    fetch(`${baseServerURL}/flights?_sort=price&_order=desc`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        showFlightData(data);
      })
  }
  else {
    fetchFlightServer()
  }
})

// search functionality by city
let searchByCity = document.getElementById("searchByCity");
searchByCity.addEventListener("input", (e) => {
  let input = e.target.value.toLowerCase();
  let arr = flightArray.filter((el, i) => {
    if (el.from.toLowerCase().includes(input) || el.to.toLowerCase().includes(input)) {
      return true;
    }
    return false;
  })
  showFlightData(arr);
})

// filter functionality by airlines
let filterByAir = document.getElementById("filterByAir");
filterByAir.addEventListener("change", (e) => {
  let input = e.target.value.toLowerCase();
  if (input == "") {
    fetchFlightServer();
  }
  else {
    let arr = flightArray.filter((el, i) => {
      if (el.airlines.toLowerCase() == input) {
        return true;
      }
      return false;
    })
    showFlightData(arr);
  }
})


// append data on display 
let flight_cont = document.getElementById("flight-cont");

function showFlightData(data) {
  flight_cont.innerHTML = null;
  data.forEach((element, index) => {

    let flight_card = document.createElement("div");
    flight_card.setAttribute("class", "flight-card");

    let box1 = document.createElement("div");
    box1.setAttribute("class", "card-head-1");
    let logodiv = document.createElement("div");
    logodiv.setAttribute("class", "logo");
    let logoimg = document.createElement("img");
    logoimg.setAttribute("src", element.logo);
    logodiv.append(logoimg);
    let company = document.createElement("p");
    company.innerText = element.airlines;
    box1.append(logodiv, company);

    let box2 = document.createElement("div");
    box2.setAttribute("class", "card-head-2");
    let startTime = document.createElement("p");
    startTime.innerText = element.start_time;
    let startCity = document.createElement("p");
    startCity.setAttribute("class", "thoda-big");
    startCity.innerText = element.from;
    box2.append(startTime, startCity);

    let box3 = document.createElement("div");
    box3.setAttribute("class", "card-head-2");
    let distanceTime = document.createElement("p");
    distanceTime.innerText = element.distance;
    box3.append(distanceTime);

    let box4 = document.createElement("div");
    box4.setAttribute("class", "card-head-2");
    let endTime = document.createElement("p");
    endTime.innerText = element.end_time;
    let endCity = document.createElement("p");
    endCity.setAttribute("class", "thoda-big");
    endCity.innerText = element.to;
    box4.append(endTime, endCity);

    let box5 = document.createElement("div");
    box5.setAttribute("class", "card-head-2");
    let price = document.createElement("p");
    price.innerText = element.price;
    box5.append(price);

    let box6 = document.createElement("div");
    box6.setAttribute("class", "card-head-2");
    let update = document.createElement("p");
    update.setAttribute("class", "green");
    update.innerText = "Update";
    update.addEventListener("click", () => {
      modal.style.display = "block";
      updateBtn.style.display = "block";
      updateFlight.style.display = "block";
      submitBtn.style.display = "none";
      registerFlight.style.display = "none";

      let from = document.getElementById("startCity");
      from.value = element.from;
      let to = document.getElementById("departureCity");
      to.value = element.to;
      let distance = document.getElementById("travelTime");
      distance.value = element.distance;
      let price = document.getElementById("cost");
      price.value = element.price;
      let airlines = document.getElementById("airlines");
      airlines.value = element.airlines;
      let logo = document.getElementById("airlogo");
      logo.value = element.logo;
      let start_time = document.getElementById("takeoffTime");
      start_time.value = element.start_time;
      let end_time = document.getElementById("landingTime");
      end_time.value = element.end_time;

      updateBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let obj = {
          "from": from.value,
          "to": to.value,
          "distance": distance.value,
          "price": price.value,
          "airlines": airlines.value,
          "logo": logo.value,
          "start_time": start_time.value,
          "end_time": end_time.value
        }
        console.log(obj);
        fetch(`${baseServerURL}/flights/${element.id}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(obj)
        })
      })

    })

    let Delete = document.createElement("p");
    Delete.setAttribute("class", "red");
    Delete.innerText = "Delete";
    Delete.addEventListener("click", (e) => {
      e.preventDefault();
      fetch(`${baseServerURL}/flights/${element.id}`, {
        method: 'DELETE'
      })
      showFlightData(data);
      // flightPage()
    })

    box6.append(update, Delete);

    flight_card.append(box1, box2, box3, box4, box5, box6);
    flight_cont.append(flight_card);
  })
}

function dashboardPage() {
  location.href = "admin.html";
}

function hotelPage() {
  location.href = "admin_hotel.html";
}

function userPage() {
  location.href = "admin_users.html";
}
// model functionality

btn.onclick = function () {
  modal.style.display = "block";
  updateBtn.style.display = "none";
  updateFlight.style.display = "none";
  registerFlight.style.display = "block";
  submitBtn.style.display = "block";
  addFlightdata()
}
closeBtn.onclick = function () {
  modal.style.display = "none";
}

// add flight data functionality
function addFlightdata() {
  let addFlight = document.getElementById("flight-add");
  addFlight.addEventListener("submit", (e) => {
    e.preventDefault();

    let obj = {
      "from": addFlight.startCity.value,
      "to": addFlight.departureCity.value,
      "distance": addFlight.travelTime.value,
      "price": addFlight.cost.value,
      "airlines": addFlight.airlines.value,
      "logo": addFlight.airlogo.value,
      "start_time": addFlight.takeoffTime.value,
      "end_time": addFlight.landingTime.value
    }
    // console.log(obj);
    fetch(`${baseServerURL}/flights`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })

  })
}

let adminName = JSON.parse(localStorage.getItem("admin"));
document.getElementById("adminNameShow").innerText = adminName;