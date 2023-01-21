let baseServerURL = "http://localhost:3000";

fetchUserServer()

// fetch flight data form server
let userArray;
function fetchUserServer() {
  fetch(`${baseServerURL}/users`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      console.log(data);
      userArray = data.reverse();
      showUserData(userArray);
    })
}

// sorting functionality by price
let sortName = document.getElementById("sortName");
sortName.addEventListener("change", (e) => {
  if (e.target.value == 'l2h') {
    fetch(`${baseServerURL}/users?_sort=user_name&_order=asc`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        showUserData(data);
      })
  }
  else if (e.target.value == 'h2l') {
    fetch(`${baseServerURL}/users?_sort=user_name&_order=desc`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        showUserData(data);
      })
  }
  else {
    fetchUserServer()
  }
})


// search functionality user
let searchUser = document.getElementById("searchByName");
searchUser.addEventListener("input", (e) => {
  let input = e.target.value.toLowerCase();
  let arr = userArray.filter((el, i) => {
    if ((el.user_name.toLowerCase().includes(input)) || (el.email.toLowerCase().includes(input))) {
      return true;
    }
    return false;
  })
  showUserData(arr);
})



// append data on display 
let user_cont = document.getElementById("user-cont");

function showUserData(data) {
  user_cont.innerHTML = null;
  data.forEach((element, index) => {

    let user_card = document.createElement("div");
    user_card.setAttribute("class", "user-card");

    let box1 = document.createElement("div");
    box1.setAttribute("class", "card-head-1");
    let userName = document.createElement("p");
    userName.setAttribute("class", "thoda-big");
    userName.innerText = element.user_name;
    box1.append(userName);


    let box2 = document.createElement("div");
    box2.setAttribute("class", "card-head-2");
    let email = document.createElement("p");
    email.setAttribute("class", "thoda-big");
    email.innerText = element.email;
    box2.append(email);

    let box3 = document.createElement("div");
    box3.setAttribute("class", "card-head-3");
    let mobile = document.createElement("p");
    mobile.setAttribute("class", "thoda-big");
    mobile.innerText = element.mobile;

    box3.append(mobile);

    let box4 = document.createElement("div");
    box4.setAttribute("class", "card-head-4");
    let Delete = document.createElement("p");
    Delete.setAttribute("class", "red thoda-big");
    Delete.innerText = "Delete";
    Delete.addEventListener("click", (e) => {
      e.preventDefault();
      fetch(`${baseServerURL}/users/${element.id}`, {
        method: 'DELETE'
      })
      showUserData(data);
    })

    box4.append(Delete);

    user_card.append(box1, box2, box3, box4);
    user_cont.append(user_card);
  })
}




function dashboardPage() {
  location.href = "admin.html";
}

function flightPage() {
  location.href = "admin_flight.html";
}

function hotelPage() {
  location.href = "admin_hotel.html";
}

let adminName = JSON.parse(localStorage.getItem("admin"));
document.getElementById("adminNameShow").innerText = adminName;
function logoutFun() {
  localStorage.removeItem("admin");
  location.href = "index.html"
}