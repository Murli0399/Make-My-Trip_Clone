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
  if (0<= sticky1) {
    navbar1.classList.add("sticky1")
  } else {
    navbar1.classList.remove("sticky1");
  }
}
// --------------------------------------------------------------sticky nav bar---------------------------------------------------------------------------//
function clickimg(smallimg) {
  var fullimg=document.getElementById("img")
  fullimg.src = smallimg.src
}
// --------------------------------------------------------------main body--------------------------------------------------------------------------------//
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
    img2=document.createElement("img")
    img2.id="img2"
    img2.src=element.img2
    img3=document.createElement("img")
    img3.id="img3"
    img3.src=element.img3
    img4=document.createElement("img")
    img4.id="img4"
    img4.src=element.img4
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
    a=document.createElement("small")
    a.id="a"
    a.innerText=element.locat
    b=document.createElement("small")
    b.id="b"
    b.innerHTML=`<i class="fa-solid fa-check"></i>Free Cancellation <u>till check in</u>`
    post.append(a,b)
    eddy.append(zap,hotelname,post)
    money=document.createElement("div")
    money.className="money"
    strikeprice=document.createElement("strike")
    strikeprice.innerText=`₹ ${Math.floor(element.dprice+((element.dprice/100)*5))}`
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
  });
}
s=document.getElementById("search")
s.onclick=()=>{
  var a=document.getElementById('0-3000').checked?document.getElementById('0-3000').value:''
console.log(a);
}

// --------------------------------------------------------------main body--------------------------------------------------------------------------------//

