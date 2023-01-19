let baseServerURL = "http://localhost:3000";
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var closeBtn = document.getElementById("close");
var submitBtn = document.getElementById("submitBtn");
var updateBtn = document.getElementById("updateBtn");
var updateHotelhead = document.getElementById("updateHotelhead");
var addHotelhead = document.getElementById("addHotelhead");

fetchHotelServer()

// fetch flight data form server
let hotelArray;
function fetchHotelServer() {
  fetch(`${baseServerURL}/hotels`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      // console.log(data);
      hotelArray = data.reverse();
      showHotelData(hotelArray);
    })
}

// sorting functionality by price
let sortPrice = document.getElementById("sortPrice");
sortPrice.addEventListener("change", (e) => {
  if (e.target.value == 'l2h') {
    fetch(`${baseServerURL}/hotels?_sort=dprice&_order=asc`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        showHotelData(data);
      })
  }
  else if (e.target.value == 'h2l') {
    fetch(`${baseServerURL}/hotels?_sort=dprice&_order=desc`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        showHotelData(data);
      })
  }
  else {
    fetchHotelServer()
  }
})

// // search functionality by city
let searchByCity = document.getElementById("searchByCity");
searchByCity.addEventListener("input", (e) => {
  let input = e.target.value.toLowerCase();
  let arr = hotelArray.filter((el, i) => {
    if (el.city.toLowerCase().includes(input)) {
      return true;
    }
    return false;
  })
  showHotelData(arr);
})

// // filter functionality by rating
let filterByrating = document.getElementById("filterByrating");
filterByrating.addEventListener("change", (e) => {
  let input = e.target.value;
  if (input == "") {
    fetchHotelServer();
  }
  else {
    fetch(`${baseServerURL}/hotels?_sort=rating&_order=asc`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        let arr = data.filter((el, i) => {
          if (el.rating >= input) {
            return true;
          }
          return false;
        })
        showHotelData(arr);
      })

  }
})


// append data on display 
let hotel_cont = document.getElementById("hotel-cont");

function showHotelData(data) {
  hotel_cont.innerHTML = null;
  data.forEach((element, index) => {

    let hotel_card = document.createElement("div");
    hotel_card.setAttribute("class", "hotel-card");

    let box1 = document.createElement("div");
    box1.setAttribute("class", "card-head-1");
    let hotelImg = document.createElement("img");
    hotelImg.setAttribute("src", element.mainimg);
    box1.append(hotelImg);


    let box2 = document.createElement("div");
    box2.setAttribute("class", "card-head-2");
    let hotelName = document.createElement("p");
    hotelName.setAttribute("class", "thoda-big");
    hotelName.innerText = element.hotelname;
    box2.append(hotelName);

    let box3 = document.createElement("div");
    box3.setAttribute("class", "card-head-3");
    let city = document.createElement("p");
    city.setAttribute("class", "thoda-big");
    city.innerText = element.city;
    let nearBy = document.createElement("p");
    nearBy.innerText = element.locat;
    let rating = document.createElement("p");
    rating.innerText = "Rating - " + element.rating;
    box3.append(city, nearBy, rating);

    let box4 = document.createElement("div");
    box4.setAttribute("class", "card-head-4");
    let price = document.createElement("p");
    price.setAttribute("class", "thoda-big");
    price.innerText = element.dprice;
    box4.append(price);

    let box5 = document.createElement("div");
    box5.setAttribute("class", "card-head-5");
    let update = document.createElement("p");
    update.setAttribute("class", "green");
    update.innerText = "Update";
    update.addEventListener("click", () => {
      modal.style.display = "block";
      updateBtn.style.display = "block";
      updateHotelhead.style.display = "block";
      submitBtn.style.display = "none";
      addHotelhead.style.display = "none";

      let hotel_name = document.getElementById("hotelname");
      hotel_name.value = element.hotelname;
      let city = document.getElementById("city");
      city.value = element.city;
      let main_Img = document.getElementById("mainImg");
      main_Img.value = element.mainimg;
      let img_1 = document.getElementById("image_2");
      img_1.value = element.img1;
      let img_2 = document.getElementById("image_3");
      img_2.value = element.img2;
      let img_3 = document.getElementById("image_4");
      img_3.value = element.img3;
      let img_4 = document.getElementById("image_5");
      img_4.value = element.img4;
      let rating_R = document.getElementById("rating");
      rating_R.value = element.rating;
      let street = document.getElementById("nearBy");
      street.value = element.locat;
      let dprice_P = document.getElementById("price");
      dprice_P.value = element.dprice;


      updateBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let obj = {
          "hotelname": hotel_name.value,
          "city": city.value,
          "mainimg": main_Img.value,
          "img1": img_1.value,
          "img2": img_2.value,
          "img3": img_3.value,
          "img4": img_4.value,
          "rating": rating_R.value,
          "locat": street.value,
          "dprice": dprice_P.value
        }
        console.log(obj);
        fetch(`${baseServerURL}/hotels/${element.id}`, {
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
      fetch(`${baseServerURL}/hotels/${element.id}`, {
        method: 'DELETE'
      })
      showHotelData(data);
      // flightPage()
    })

    box5.append(update, Delete);

    hotel_card.append(box1, box2, box3, box4, box5);
    hotel_cont.append(hotel_card);
  })
}

function dashboardPage() {
  location.href = "admin.html";
}

function hotelPage() {
  location.href = "admin_hotel.html";
}

// model functionality

btn.onclick = function () {
  modal.style.display = "block";
  updateBtn.style.display = "none";
  updateHotelhead.style.display = "none";
  submitBtn.style.display = "block";
  addHotelhead.style.display = "block";
  addHoteldata()
}
closeBtn.onclick = function () {
  modal.style.display = "none";
}

// add flight data functionality
function addHoteldata() {
  let addHotel = document.getElementById("hotel-add");
  addHotel.addEventListener("submit", (e) => {
    e.preventDefault();

    let obj = {
      "hotelname": addHotel.hotelname.value,
      "city": addHotel.city.value,
      "mainimg": addHotel.mainImg.value,
      "img1": addHotel.image_2.value,
      "img2": addHotel.image_3.value,
      "img3": addHotel.image_4.value,
      "img4": addHotel.image_5.value,
      "rating": addHotel.rating.value,
      "locat": addHotel.nearBy.value,
      "dprice": addHotel.price.value
    }
    // console.log(obj);
    fetch(`${baseServerURL}/hotels`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })

  })
}





function dashboardPage() {
  location.href = "admin.html";
}

function flightPage() {
  location.href = "admin_flight.html";
}