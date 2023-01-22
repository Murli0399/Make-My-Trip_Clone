// --------------------------------------------------------------sticky nav bar---------------------------------------------------------------------------//
window.onscroll = function() {myFunction(),myFunction1()};
var navbar = document.querySelector(".nav2");
var sticky = navbar.offsetTop;
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}
var navbar1 = document.querySelector(".nav4");
var sticky1 = navbar1.offsetTop;
function myFunction1() {
  if (0 <= sticky1) {
    navbar1.classList.add("sticky1")
  } else {
    navbar1.classList.remove("sticky1");
  }
}
// --------------------------------------------------------------sticky nav bar---------------------------------------------------------------------------//
// ------------------------------------------------------------------filter-------------------------------------------------------------------------------//
let lowerPrice = document.getElementById("lower")
let upperPrice = document.getElementById("upper")
let filterBtn = document.getElementById("filter-btn")
filterBtn.addEventListener("click", () => {
  let arr = newData.filter(el => {
    if (el.dprice >= lowerPrice.value && el.dprice <= upperPrice.value) {
      return true;
    }
    return false;
  })
  display(arr);
})
let btn1=document.querySelectorAll("input[name='rate']")
let findselected1=()=>{
  let select=document.querySelector('input[name="rate"]:checked')
  sl=+select.value
  console.log(sl);
  let arr = newData.filter(el => {
    if (el.rating>=sl) {
      return true;
    }
    return false;
  })
  display(arr);
  
}
btn1.forEach(element=>{
  element.addEventListener("change",findselected1)
})
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
nav3p=document.getElementById("nav3p")
nav4p=document.getElementById("nav4p")
body1p=document.getElementById("body1p")
body2p=document.getElementById("body2p")
fcity=document.getElementById("city")
if (fcity.value=="Mumbai") {
  nav3p.innerHTML=`Hotel and more in ${fcity.value}`
  nav4p.innerHTML=`Hotels, Villas, Apartments and more in ${fcity.value}`
  body1p.innerHTML=`Showing Properties ${fcity.value}`
  body2p.innerHTML=`Showing ${randomIntFromInterval(500,800)} properties in ${fcity.value}`
}
fcity.onchange=()=>{
  nav3p.innerHTML=`Hotel and more in ${fcity.value}`
  nav4p.innerHTML=`Hotels, Villas, Apartments and more in ${fcity.value}`
  body1p.innerHTML=`Showing Properties ${fcity.value}`
  body2p.innerHTML=`Showing ${randomIntFromInterval(500,800)} properties in ${fcity.value}`
  let arr = newData.filter(el => {
    if(el.city==fcity.value){
      return true
    }
    return false
  })
  display(arr);
}
search1=document.getElementById("search1")
search1.oninput=()=>{
  let val = search1.value;
  let arrr = newData.filter(function (elem) {
    return elem.locat.toLowerCase().includes(val.toLowerCase());
  });
  display(arrr);
}
search1.oninput=()=>{
  let val = search1.value;
  let arrr = newData.filter(function (elem) {
    return elem.hotelname.toLowerCase().includes(val.toLowerCase());
  });
  display(arrr);
}
select1=document.getElementById("select1")
select1.onchange=()=>{
  if(select1.value=="Price-Low to High"){
    select1.style.width="130px"
    newData.sort((a, b) => a.dprice - b.dprice);
    display(newData);
  }else if(select1.value=="Popularity"){
    select1.style.width="90px"
    location.reload();
  }else if(select1.value=="Price-High to Low"){
    select1.style.width="130px"
    newData.sort((a, b) => b.dprice - a.dprice);
    display(newData);
  }
}
// --------------------------------------------------------------filter-----------------------------------------------------------------------------------//
// --------------------------------------------------------------main body--------------------------------------------------------------------------------//
hotel=document.querySelector("#hotel")
fetch("http://localhost:3000/hotels")
.then(res=>res.json())
.then(data=>{
  newData=data
  display(data)})
function display(data){
  hotel.innerHTML=null
  data.forEach(element => {
    box=document.createElement("div")
    box.className="box"
    hotel.append(box)
    mace=document.createElement("div")
    mace.className="mace"
    box.append(mace)
    sett=document.createElement("div")
    sett.className="sett"
    main=document.createElement("div")
    main.className="main"
    mainimg=document.createElement("img")
    mainimg.id="img"
    mainimg.src=element.mainimg
    main.append(mainimg)
    small=document.createElement("div")
    small.className="small"
    img1=document.createElement("img")
    img1.id="img1"
    img1.src=element.img1
    img1.onclick=()=>{
    mainimg.src=element.img1
    }
    img2=document.createElement("img")
    img2.id="img2"
    img2.src=element.img2
    img2.onclick=()=>{
    mainimg.src=element.img2
    }
    img3=document.createElement("img")
    img3.id="img3"
    img3.src=element.img3
    img3.onclick=()=>{
    mainimg.src=element.img3
    }
    img4=document.createElement("img")
    img4.id="img4"
    img4.src=element.img4
    img4.onclick=()=>{
      mainimg.src=element.img4
    }
    small.append(img1,img2,img3,img4)
    sett.append(main,small)
    eddy=document.createElement("div")
    eddy.className="eddy"
    zap=document.createElement("div")
    zap.className="zap"
    rating=document.createElement("button")
    rating.id="rating"
    rating.innerText=element.rating
    review=document.createElement("span")
    review.id="review"
    if(element.rating>=4.5){
      review.innerText="Excellent"
    }else if(element.rating>=4 && element.rating<4.5){
      review.innerText="Very Good"
    }else if(element.rating>=3 && element.rating<4){
      review.innerText="Good"
    } 
    zap.append(rating,review)
    hotelname=document.createElement("span")
    hotelname.id="hotelname"
    hotelname.innerText=element.hotelname
    post=document.createElement("div")
    post.className="post"
    led=document.createElement("div")
    led.className="led"
    a=document.createElement("small")
    a.id="a"
    a.innerText=element.locat
    c=document.createElement("small")
    c.id="c"
    c.innerText=`|${ Math.floor(Math.random() * (100 - 10) + 10) / 10} km from T${randomIntFromInterval(1, 2)} - Chhatrapati Shivaji International Airport`
    c.style.color="#4a4a4a"
    c.style.fontSize="12px"
    led.append(a,c)
    b=document.createElement("small")
    b.id="b"
    b.innerHTML=`<i class="fa-solid fa-check"></i>Free Cancellation <u>till check in</u>`
    b.style.marginTop="5px"
    post.append(led,b)
    eddy.append(zap,hotelname,post)
    money=document.createElement("div")
    money.className="money"
    strikeprice=document.createElement("strike")
    strikeprice.innerText=`₹ ${Math.floor(element.dprice+((element.dprice/100)*10))}`
    strikeprice.id="strikeprice"
    displayprice=document.createElement("p")
    displayprice.id="displayprice"
    displayprice.innerText="₹ "+element.dprice
    tax=document.createElement("p")
    tax.id="tax"
    tax.innerHTML=`+ ₹ ${Math.ceil((element.dprice/100)*18)} taxes & fee `
    o=document.createElement("p")
    o.innerText="Per Night"
    o.style.color="#9b9b9b"
    o.style.fontSize="10px"
    money.append(strikeprice,displayprice,tax,o)
    mace.append(sett,eddy,money)
    eddy.onclick=()=>{
      localStorage.setItem("key",JSON.stringify(element))
      window.location.href="./hoteldetail.html"
    }
    money.onclick=()=>{
      localStorage.setItem("key",JSON.stringify(element))
      window.location.href="./hoteldetail.html"
    }
  });
}
// --------------------------------------------------------------main body--------------------------------------------------------------------------------//
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
ci=document.getElementById("ci")
co=document.getElementById("co")
ci.innerHTML=`<input type="date" id="cid" value="${year}-0${month}-${day}">`
co.innerHTML=`<input type="date" id="cod" min="${year}-0${month}-${day+1}" value="${year}-0${month}-${day+1}">`
search=document.getElementById("search")


