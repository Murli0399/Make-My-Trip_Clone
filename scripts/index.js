let flight1 = document.querySelector(".flight1")
let input1 = document.getElementById("input1")
let searchData={}

  let cityArr;
  fetch("http://localhost:3000/flights")
    .then(res => {
      return res.json()
    })
    .then(data => {
      // console.log(data);
      cityArr = data;
    })
  let dataCity = document.getElementById("down_bar");
  let input = document.getElementById("input1");
  input.addEventListener("input", (e) => {
    let x = e.target.value.toLowerCase();
    // console.log(x);
    let arr = cityArr.filter(el => {
      return el.from.toLowerCase().includes(x);
    })
    let obj = {};
    dataCity.innerHTML = null;
    arr.forEach(element => {
      if (obj[element.from] == undefined) {
        obj[element.from] = 1;
      }
    });
    for (let key in obj) {
      let p = document.createElement("p");
      p.setAttribute("class", "suggestion_name");
      p.innerText = key;
      p.addEventListener("click", () => {
        input.value = key;
        dataCity.style.display = "none";
      })
      dataCity.append(p);
    }
  })






//   to

let cityArr1;
fetch("http://localhost:3000/flights")
  .then(res => {
    return res.json()
  })
  .then(data => {
    // console.log(data);
    cityArr1 = data;
  })
let dataCity1 = document.getElementById("down_bar1");
let input_2 = document.getElementById("input2");
input_2.addEventListener("input", (e) => {
  let x = e.target.value.toLowerCase();
  // console.log(x);
  let arr = cityArr1.filter(el => {
    return el.to.toLowerCase().includes(x);
  })
  let obj = {};
  dataCity1.innerHTML = null;
  arr.forEach(element => {
    if (obj[element.to] == undefined) {
      obj[element.to] = 1;
    }
  });
  for (let key in obj) {
    let p = document.createElement("p");
    p.setAttribute("class", "suggestion_name");
    p.innerText = key;
    p.addEventListener("click", () => {
      input_2.value = key;
      dataCity1.style.display = "none";
    })
    dataCity1.append(p);
  }
})









let span1 = document.getElementById("span1")
let down_bar = document.getElementById("down_bar")
let fromh1 = document.getElementById("fromh1")
let span2 = document.getElementById("span2")
input1.style.display = "none"
flight1.addEventListener("click", function () {
    input1.style.display = "block"
    span1.style.display = "none"
    down_bar.style.display = "block"
    fromh1.style.display = "none"
    span2.style.display = "none"

})



let flight2 = document.querySelector(".flight2")
let input2 = document.getElementById("input2")
let span3 = document.getElementById("span3")
let down_bar1 = document.getElementById("down_bar1")
let toh1 = document.getElementById("toh1")
let span4 = document.getElementById("span4")
let anchor1 = document.getElementById("anchor1")
let anchor2 = document.getElementById("anchor2")
input2.style.display = "none"
flight2.addEventListener("click", function () {
    input2.style.display = "block"
    span3.style.display = "none"
    down_bar1.style.display = "block"
    toh1.style.display = "none"
    span4.style.display = "none"



    let input1_value = input1.value

    input1.style.display = "none"
    down_bar.style.display = "none"


    span1.style.display = "block"
    fromh1.style.display = "block"
    fromh1.innerText = input1_value;
    anchor1.innerText = input1_value;
    anchor2.innerText = input1_value;
    span2.style.display = "block"
})



let anchor3 = document.getElementById("anchor3")
let anchor4 = document.getElementById("anchor4")
// let search_button=document.querySelector(".search-button");

let flight3 = document.querySelector(".flight3");
flight3.addEventListener("click", function () {
    input2.style.display = "none";
    down_bar1.style.display = "none";
    span3.style.display = "block";

    input2_value = input2.value;
    toh1.style.display = "block";
    toh1.innerText = input2_value
    anchor3.innerText = input2_value;
    anchor4.innerText = input2_value;
    span4.style.display = "block"

    
})



let select_number=document.getElementById("select_number");
let new_span=document.getElementById("new_span")
select_number.addEventListener("change",function(){
    new_span.innerText=select_number.value;
})



let for_day=document.getElementById("for_day");
let for_month=document.getElementById("for_month");
let for_year=document.getElementById("for_year");
let vars=document.getElementById("var")

let calendor=document.getElementById("calendor");
calendor.addEventListener("change",function(){
    let date_data=calendor.value
    for(i=0;i<date_data.length;i++){
      
        // for year
        let year= date_data[2]+date_data[3]
        for_year.innerText=year;
        //for day
        let day=date_data[8]+date_data[9]
        for_day.innerText=day;
       
        if(day=="01"){
            vars.innerText="Sunday"
        }else if(day=="02"){
            vars.innerText="Monday"
        }else if(day=="03"){
            vars.innerText="Tuesday"
        }else if(day=="04"){
            vars.innerText="Wednesday"
        }else if(day=="05"){
            vars.innerText="Thursday"
        }else if(day=="06"){
            vars.innerText="Friday"
        }else if(day=="07"){
            vars.innerText="Saturday"
        }else if(day=="08"){
            vars.innerText="Sunday"
        }else if(day=="09"){
            vars.innerText="Monday"
        }else if(day=="10"){
            vars.innerText="Tuesday"
        }else if(day=="11"){
            vars.innerText="Wednesday"
        }else if(day=="12"){
            vars.innerText="Thursday"
        }else if(day=="13"){
            vars.innerText="Friday"
        }else if(day=="14"){
            vars.innerText="Saturday"
        }else if(day=="15"){
            vars.innerText="Sunday"
        }else if(day=="16"){
            vars.innerText="Monday"
        }else if(day=="17"){
            vars.innerText="Tuesday"
        }else if(day=="18"){
            vars.innerText="Wednesday"
        }else if(day=="19"){
            vars.innerText="Thursday"
        }else if(day=="20"){
            vars.innerText="Friday"
        }else if(day=="21"){
            vars.innerText="Saturday"
        }else if(day=="22"){
            vars.innerText="Sunday"
        }else if(day=="23"){
            vars.innerText="Monday"
        }else if(day=="24"){
            vars.innerText="Tuesday"
        }else if(day=="25"){
            vars.innerText="Wednesday"
        }else if(day=="26"){
            vars.innerText="Thursday"
        }else if(day=="27"){
            vars.innerText="Friday"
        }else if(day=="28"){
            vars.innerText="Saturday"
        }else if(day=="29"){
            vars.innerText="Sunday"
        }else if(day=="30"){
            vars.innerText="Monday"
        }else if(day=="31"){
            vars.innerText="Tuesday"
        }
        // for month
        let month=date_data[5]+date_data[6]
        if(month=="01"){
            for_month.innerText=" Jan"
        }else if(month=="02"){
            for_month.innerText=" Feb"
        }else if(month=="03"){
            for_month.innerText=" Mar"
        }else if(month=="04"){
            for_month.innerText=" Apr"
        }else if(month=="05"){
            for_month.innerText=" May"
        }else if(month=="06"){
            for_month.innerText=" Jun"
        }else if(month=="07"){
            for_month.innerText=" Jul"
        }else if(month=="08"){
            for_month.innerText=" Aug"
        }else if(month=="09"){
            for_month.innerText=" Sep"
        }else if(month=="10"){
            for_month.innerText=" Oct"
        }else if(month=="11"){
            for_month.innerText=" Nov"
        }else if(month=="12"){
            for_month.innerText=" Dec"
        }
    }
})


let login=document.querySelector(".login");
login.addEventListener("click",function(){
    window.location.assign("login.html")
    console.log("working")
})

let langbtn=document.querySelector(".langbtn");
langbtn.addEventListener("click",function(){
    window.location.assign("admin_login.html")
})

let flight=document.querySelector("#flight");
flight.addEventListener("click",function(){
    window.location.assign("flight.html")
})

let flight_second_btn=document.querySelector("#flight_second_btn");
flight_second_btn.addEventListener("click",function(){
    window.location.assign("flight.html")
})

let search_button=document.querySelector(".search-button");
search_button.addEventListener("click",function(){
    searchData={
        from:document.getElementById("fromh1").innerText,
        to:document.getElementById("toh1").innerText,
        date1:document.getElementById("for_day").innerText+document.getElementById("for_month").innerText+document.getElementById("for_year").innerText+" " + document.getElementById("var").innerText,
        date2:document.getElementById("for_day").innerText+document.getElementById("for_month").innerText+document.getElementById("for_year").innerText+" "+ document.getElementById("var").innerText,
        passenger:document.getElementById("new_span").innerText
    }
    localStorage.setItem("searchData",JSON.stringify(searchData))
 
    window.location.assign("flight.html")
})

let hotel=document.querySelector("#hotel");
hotel.addEventListener("click",function(){
    window.location.assign("hotel.html")
})

let second_hotel_btn=document.querySelector("#second_hotel_btn");
second_hotel_btn.addEventListener("click",function(){
    window.location.assign("hotel.html")
})