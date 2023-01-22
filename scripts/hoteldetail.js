data = JSON.parse(localStorage.getItem("key"));
city = document.getElementById("city");
city.innerHTML = `<option selected>${data.hotelname}, ${data.city}</option>
<optgroup label="Popular Cities" style="font-size: 15px;color: #4a4a4a;">
                <option  value="Mumbai" >Mumbai</option>
                <option  value="Delhi" >Delhi</option>
                <option  value="Bengaluru">Bengaluru</option>
                <option  value="Goa">Goa</option>
                <option  value="Chennai">Chennai</option>
                <option  value="Jaipur">Jaipur</option>
                <option  value="Hyderabad">Hyderabad</option>
                <option  value="Singapore">Singapore</option>
                <option  value="Dubai">Dubai</option>
                <option  value="Bangkok">Bangkok</option>
                </optgroup>`;
del = document.querySelector(".del");
del.innerHTML = `
<div class="gfg"> 
        <img src="${data.mainimg}" alt="" width="100%" height="500px">
        <div class="first-txt"> 
            Home > Hotels in ${data.city} > ${data.hotelname}
        </div> 
        <div class="second-txt"> 
            <div class="name1">
            <h1>${data.hotelname}</h1>
            </div>
        </div> 
</div>
<div class="price1">
    <img src="${data.img1}" alt="" width="100%" height="150px">
    <p>Premiere Room , King/Twin Be...</p>
    <div class="dit">
    <small style="color: #4a4a4a;font-size: 12px;font-weight:900"><i class="fa-solid fa-user-group"></i> For 2 Adults</small>
    <small style="color: #4a4a4a;font-size: 12px;">Per Night</small>
    </div>
    <div class="dit">
    <small style="color: #D0021B;font-size: 14px;" ><i class="fa-solid fa-xmark"></i> Non - Refundable</small>
    <strike style="color: #727272;font-size: 14px;" >₹ ${Math.floor(
      data.dprice + (data.dprice / 100) * 10
    )}</strike>
    </div>
    <div class="dit">
    <small style="color: #4a4a4a;font-size: 14px;" ><i class="fa-solid fa-check"></i>Room Only</small>
    <small style="color: #000000;font-size: 22px;font-weight:900" >₹ ${
      data.dprice
    }</small>
    </div>
    <div class="dit">
    <small></small>
    <small style="color: #727272;font-size: 12px;font-weight:900" >+ ₹ ${Math.ceil(
      (data.dprice / 100) * 18
    )} taxes & fee </small>
    </div>
    <div class="dit">
    <small></small>
    <small style="color: #D0021B;font-size: 12px;" >Saving ₹ ${
      Math.floor(data.dprice + (data.dprice / 100) * 10) - data.dprice
    }</small>
    </div>
    <div class="dit">
    <label style="color:#008cff;font-size: 14px;font-weight:700">VIEW OTHER ROOMS<span class="hsw_inputBoxArrow"></span></label>
    </div>
    <button id="book"><b>BOOK THIS NOW</b></button>
</div>
`;
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
ci = document.getElementById("ci");
co = document.getElementById("co");
ci.innerHTML = `<input type="date" id="cid" value="${year}-0${month}-${day}">`;
co.innerHTML = `<input type="date" id="cod" min="${year}-0${month}-${day + 1}" value="${year}-0${month}-${day + 1}">`;
ing = document.querySelector("#ing");
rq = document.querySelector("#rq");
about = document.querySelector("#about");
amenities = document.querySelector("#amenities");
if (data.rating >= 4.5) {
  rq.innerText = "Excellent";
} else if (data.rating >= 4 && data.rating < 4.5) {
  rq.innerText = "Very Good";
} else if (data.rating >= 3 && data.rating < 4) {
  rq.innerText = "Good";
}
ing.innerText = data.rating;
about.innerText = `About ${data.hotelname}`;
amenities.innerText = `Amenities at ${data.hotelname}`;
book = document.getElementById("book");
book.onclick = () => {
  localStorage.setItem("book", JSON.stringify(data));
  let op = {
  ci: cid.value,
  co: cod.value,
};
  localStorage.setItem("date", JSON.stringify(op));
  window.location.href = "./hotelpayment.html";
};

































window.onscroll = function () {
  myFunction();
};
var navbar = document.querySelector(".nav2");
var sticky = navbar.offsetTop;
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}
let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides((slideIndex += n));
}
function currentSlide(n) {
  showSlides((slideIndex = n));
}
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
