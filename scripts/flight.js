const slideValue = document.querySelector("#slide-value");
const inputSlider = document.querySelector("input[type='range']");
inputSlider.oninput = (() => {
    let value = inputSlider.value;
    slideValue.textContent = `Rs.${value}`;
    // slideValue.style.left = (value / 150) + "%";
});
inputSlider.onblur = (() => {
    console.log(inputSlider.value)
});




// ...........Ftech Data From Server.............
let searchData=JSON.parse(localStorage.getItem("searchData")) || {}
let from
let to
let date1;
let date2;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

if(searchData.from){
    from= searchData.from
    to=searchData.to
    date1=searchData.date1;
    date2=searchData.date2;
}else{
    from=  "Pune"
    to="Delhi"
    date1=today
    date2=today
}






 





let flightData = []
let currentOneWayData = []
let currentReturnData = []
let flighttype = "round-trip"
let selFlightData =  JSON.parse(localStorage.getItem("selectedFlight")) || {}


fetch("http://localhost:3000/flights")
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        flightData = data
        console.log(flightData)
        SearchIt()
    })


    



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ..............Function for Displaying Data........................

function DisplayDataOneway(arr) {
    document.getElementById("return-fligts").innerHTML = null
    document.getElementById("one-ward-flight-list-cards").innerHTML = CreateListofcardsoneway(arr).join(" ")
     document.getElementById("one-ward-flight-name").innerText=`${from} → ${to}`
     document.getElementById("one-ward-date").innerText=date1
}


function DisplayDataReturn(arr) {

    document.getElementById("return-fligts").innerHTML = `
                <div id="return-flight-info">
                    <div>
                        <p style="font-size: 16px;">
                            <b id="return-flight-name">${to} → ${from}</b>
                            <span id="return-date">${date2}</span>
                        </p>
                    </div>
                    <div class="sort-buttons">
                        <div>
                            <span id="return-departure-sort" data-type="normal">Departure</span>
                            <span class="return-sort-button-arrow" id="departure-sort-arrow">&#8593;</span>
                        </div>
                        <div>
                            <span id="return-duration-sort" data-type="normal">Duration</span>
                            <span class="return-sort-button-arrow" id="duration-sort-arrow">&#8593;</span>
                        </div>
                        <div>
                            <span id="return-arrival-sort" data-type="normal">Arrival</span>
                            <span class="return-sort-button-arrow" id="arrival-sort-arrow">&#8593;</span>
                        </div>
                        <div>
                            <span id="return-price-sort" data-type="normal">Price</span>
                            <span class="return-sort-button-arrow" id="price-sort-arrow">&#8593;</span>
                        </div>
                    </div>
                </div>

                <!-- List of Cards -->
                <div id="return-flight-list-cards">
                    ${CreateListofcardsreturn(arr).join(" ")}
                </div>
    `


}



// ..................................Function for Creating List of cards..........................................

function CreateListofcardsoneway(arr) {
    let list = []
    arr.forEach(el => {
        list.push(CreateOnewayCard(el))
    });
    return list
}

function CreateListofcardsreturn(arr) {
    let list = []
    arr.forEach(el => {
        list.push(CreateReturnCard(el))
    });
    return list
}





// ..................................Function for creating  flight Card...............

function CreateOnewayCard(el) {
    return `
    <div class="one-ward-card">
        <div class="flight-name-logo flex">
            <img class="flight-img-logo"
                src=${el.logo} alt="">
            <p>${el.airlines}</p>
        </div>
        <div class="flight-details flex">
            <div class="flex-col">
                <span class="flight-time">${el["start_time"]}</span>
                <span class="card-place">${el.from}</span>
            </div>
            <div class="flex-col">
                <span class="duration">${el.distance}</span>
                <p style="border: 2px solid rgb(81, 226, 194); margin: 8px 0px; width: 80%;"></p>
                <span class="no-stop">Non Stop</span>
            </div>
            <div class="flex-col">
                <span class="flight-time">${el["end_time"]}</span>
                <span class="card-place">${el.to}</span>
            </div>
            <div class="">
                <label for="select-flight" class="price">Rs ${el.price}</label>
                <input type="radio" class="select-flight" value=${el.id} name="selected-oneway-flight" onclick="onSelectOne(this.value)">
            </div>
        </div>
    </div>
        `
}

function CreateReturnCard(el) {
    return `
    <div class="one-ward-card">
        <div class="flight-name-logo flex">
            <img class="flight-img-logo"
                src=${el.logo} alt="">
            <p>${el.airlines}</p>
        </div>
        <div class="flight-details flex">
            <div class="flex-col">
                <span class="flight-time">${el["start_time"]}</span>
                <span class="card-place">${el.from}</span>
            </div>
            <div class="flex-col">
                <span class="duration">${el.distance}</span>
                <p style="border: 2px solid rgb(81, 226, 194); margin: 8px 0px; width: 80%;"></p>
                <span class="no-stop">Non Stop</span>
            </div>
            <div class="flex-col">
                <span class="flight-time">${el["end_time"]}</span>
                <span class="card-place">${el.to}</span>
            </div>
            <div class="">
                <label for="select-flight" class="price">Rs ${el.price}</label>
                <input type="radio" class="select-flight" value=${el.id} name="selected-return-flight" onclick="onSelectReturn(this.value)" >
            </div>
        </div>
    </div>
        `
}
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







// .....................................Function for Search Input Display..........................................

let search = document.getElementById("search")

search.addEventListener("click",SearchIt )



function SearchIt() {
    let fromValue = from //Put here Id of from input value
    let ToValue = to //Put here Id of To input value
    let tripType = document.getElementById("trip-type").value
    console.log(tripType)
    document.getElementById("one-ward-flight-name").innerText = `${fromValue} → ${ToValue}`
    document.getElementById("one-ward-date").innerText = "Date"

    if (tripType == "round-trip") {
        flighttype = "round-trip"
        document.getElementById("return-fligts").style.display="block"
    
        document.getElementById("rsb-hr").style.display = "block"

        let oneway = flightData.filter((el) => {
            if (el.from == fromValue && el.to == ToValue) {
                return true
            } else {
                return false
            }
        })
        let returndata = flightData.filter((el) => {
            if (el.from == ToValue && el.to == fromValue) {
                return true
            }
        })
        currentOneWayData = oneway
        DisplayDataOneway(oneway)
        currentReturnData = returndata
        DisplayDataReturn(returndata)
        console.log("displaying return")
        document.getElementById("return-flight-name").innerText = `${ToValue} → ${fromValue}`
        document.getElementById("return-date").innerText = date2

    } else {
        flighttype = "one-way"
        document.getElementById("return-selected-box").style.display = "none"
        document.getElementById("rsb-hr").style.display = "none"
        document.getElementById("return-fligts").style.display="none"
        selFlightData.return={}
        selFlightData.total = selFlightData.oneway.price
        document.getElementById("total-price").innerText=`Rs ${selFlightData.total}`
        
        
        let oneway = flightData.filter((el) => {
            if (el.from == fromValue && el.to == ToValue) {
                return true
            } else {
                return false
            }
        })
        currentOneWayData = oneway
        DisplayDataOneway(oneway)
    }


}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// Filtering Airlines functionality

let airlineSelect = document.getElementsByName("Airlines")
let applyAirlineFilter = document.getElementById("filterbyAirlineBtn")


applyAirlineFilter.addEventListener("click", applyFilter)

function applyFilter() {
    let checkedAirline = []
    airlineSelect.forEach((el) => {
        if (el.checked) {
            checkedAirline.push(el.value)
        }
    })
    filterbyAirline(checkedAirline)
}






// ....................function for filtering Airline................

function filterbyAirline(checkedAirline) {
    // let fromValue = document.getElementById("").value //Put here Id of from input value
    // let ToValue = document.getElementById("").value //Put here Id of To input value
    // let tripType = document.getElementById("trip-type")

    if (flighttype == "round-trip") {
        let oneway = currentOneWayData.filter((el) => {
            if (checkedAirline.includes(el.airlines) && el.price <= inputSlider.value) {
                return true
            } else {
                return false
            }
        })
        let returndata = currentReturnData.filter((el) => {
            if (checkedAirline.includes(el.airlines) && el.price <= inputSlider.value) {
                return true
            }
        })
        DisplayDataOneway(oneway)
        DisplayDataReturn(returndata)

    } else {
        let oneway = currentOneWayData.filter((el) => {
            if (checkedAirline.includes(el.airlines) && el.price <= inputSlider.value) {
                return true
            } else {
                return false
            }
        })
        DisplayDataOneway(oneway)
    }


}






// Filtering Airlines by Price functionality

let applyPriceFilter = document.getElementById("filterbyPriceBtn")

applyPriceFilter.addEventListener("click", applyFilter)

// ///////////////////////////////////////////////////////////////////////////////////








///// ................ Sorting One-way flights............................../////

let sortDepartureOne = document.getElementById("one-ward-departure-sort")
let sortDurationOne = document.getElementById("one-ward-duration-sort")
let sortArrivalOne = document.getElementById("one-ward-arrival-sort")
let sortPriceOne = document.getElementById("one-ward-price-sort")


//   ............One-way Departure Sort................

sortDepartureOne.addEventListener("click", sortByDepartOne)

function sortByDepartOne() {
    makeNormalDeparture()
    if (sortDepartureOne.dataset.type == "normal") {
        sortDepartureOne.dataset.type = "asc"
        document.getElementById("one-departure-sort-arrow").style.display = "inline"
        sortDepartureOne.style.fontWeight = "bold"

        // sort(ascending order)
        currentOneWayData.sort((a, b) => {
            if ((+(a["start_time"][0] + a["start_time"][1])) == (+(b["start_time"][0] + b["start_time"][1]))) {
                return ((+(a["start_time"][3] + a["start_time"][4])) - (+(b["start_time"][3] + b["start_time"][4])))
            } else {
                return ((+(a["start_time"][0] + a["start_time"][1])) - (+(b["start_time"][0] + b["start_time"][1])))
            }
        })
        applyFilter()

    } else if (sortDepartureOne.dataset.type == "asc") {
        sortDepartureOne.dataset.type = "des"
        document.getElementById("one-departure-sort-arrow").innerHTML = "&#8595;";

        // sort(descending order)
        currentOneWayData.sort((a, b) => {
            if ((+(a["start_time"][0] + a["start_time"][1])) == (+(b["start_time"][0] + b["start_time"][1]))) {
                return ((+(b["start_time"][3] + b["start_time"][4])) - (+(a["start_time"][3] + a["start_time"][4])))
            } else {
                return ((+(b["start_time"][0] + b["start_time"][1])) - (+(a["start_time"][0] + a["start_time"][1])))
            }
        })
        applyFilter()

    } else if (sortDepartureOne.dataset.type == "des") {
        sortDepartureOne.dataset.type = "normal"
        document.getElementById("one-departure-sort-arrow").innerHTML = "&#8593;";
        document.getElementById("one-departure-sort-arrow").style.display = "none"
        sortDepartureOne.style.fontWeight = "normal"
    }
}



//   ............One-way Arrival Sort................

sortArrivalOne.addEventListener("click", sortByArrivalOne)

function sortByArrivalOne() {
    makeNormalArrival()
    if (sortArrivalOne.dataset.type == "normal") {
        sortArrivalOne.dataset.type = "asc"
        document.getElementById("one-arrival-sort-arrow").style.display = "inline"
        sortArrivalOne.style.fontWeight = "bold"

        // sort(ascending order)
        currentOneWayData.sort((a, b) => {
            if ((+(a["end_time"][0] + a["end_time"][1])) == (+(b["end_time"][0] + b["end_time"][1]))) {
                return ((+(a["end_time"][3] + a["end_time"][4])) - (+(b["end_time"][3] + b["end_time"][4])))
            } else {
                return ((+(a["end_time"][0] + a["end_time"][1])) - (+(b["end_time"][0] + b["end_time"][1])))
            }
        })
        applyFilter()

    } else if (sortArrivalOne.dataset.type == "asc") {
        sortArrivalOne.dataset.type = "des"
        document.getElementById("one-arrival-sort-arrow").innerHTML = "&#8595;";

        // sort(descending order)
        currentOneWayData.sort((a, b) => {
            if ((+(a["end_time"][0] + a["end_time"][1])) == (+(b["end_time"][0] + b["end_time"][1]))) {
                return ((+(b["end_time"][3] + b["end_time"][4])) - (+(a["start_time"][3] + a["start_time"][4])))
            } else {
                return ((+(b["end_time"][0] + b["end_time"][1])) - (+(a["end_time"][0] + a["end_time"][1])))
            }
        })
        applyFilter()

    } else if (sortArrivalOne.dataset.type == "des") {
        sortArrivalOne.dataset.type = "normal"
        document.getElementById("one-arrival-sort-arrow").innerHTML = "&#8593;";
        document.getElementById("one-arrival-sort-arrow").style.display = "none"
        sortArrivalOne.style.fontWeight = "normal"
    }
}


//   ............One-way Duration Sort................

sortDurationOne.addEventListener("click", sortByDurationOne)

function sortByDurationOne() {
    makeNormalDuration()
    if (sortDurationOne.dataset.type == "normal") {
        sortDurationOne.dataset.type = "asc"
        document.getElementById("one-duration-sort-arrow").style.display = "inline"
        sortDurationOne.style.fontWeight = "bold"

        // sort(ascending order)
        currentOneWayData.sort((a, b) => {
            if ((+(a["distance"][0] + a["distance"][1])) == (+(b["distance"][0] + b["distance"][1]))) {
                return ((+(a["distance"][4] + a["distance"][5])) - (+(b["distance"][4] + b["distance"][5])))
            } else {
                return ((+(a["distance"][0] + a["distance"][1])) - (+(b["distance"][0] + b["distance"][1])))
            }
        })
        applyFilter()

    } else if (sortDurationOne.dataset.type == "asc") {
        sortDurationOne.dataset.type = "des"
        document.getElementById("one-duration-sort-arrow").innerHTML = "&#8595;";

        // sort(descending order)
        currentOneWayData.sort((a, b) => {
            if ((+(a["distance"][0] + a["distance"][1])) == (+(b["distance"][0] + b["distance"][1]))) {
                return ((+(b["distance"][4] + b["distance"][5])) - (+(a["distance"][4] + a["distance"][5])))
            } else {
                return ((+(b["distance"][0] + b["distance"][1])) - (+(a["distance"][0] + a["distance"][1])))
            }
        })
        applyFilter()

    } else if (sortDurationOne.dataset.type == "des") {
        sortDurationOne.dataset.type = "normal"
        document.getElementById("one-duration-sort-arrow").innerHTML = "&#8593;";
        document.getElementById("one-duration-sort-arrow").style.display = "none"
        sortDurationOne.style.fontWeight = "normal"
    }
}


//   ............One-way Price Sort................

sortPriceOne.addEventListener("click", sortByPriceOne)

function sortByPriceOne() {
    makeNormalPrice()
    if (sortPriceOne.dataset.type == "normal") {
        sortPriceOne.dataset.type = "asc"
        document.getElementById("one-price-sort-arrow").style.display = "inline"
        sortPriceOne.style.fontWeight = "bold"

        // sort(ascending order)
        currentOneWayData.sort((a, b) => {
            return ((a.price) - (b.price))
        })
        applyFilter()

    } else if (sortPriceOne.dataset.type == "asc") {
        sortPriceOne.dataset.type = "des"
        document.getElementById("one-price-sort-arrow").innerHTML = "&#8595;";

        // sort(descending order)
        currentOneWayData.sort((a, b) => {
            return ((b.price) - (a.price))
        })
        applyFilter()

    } else if (sortPriceOne.dataset.type == "des") {
        sortPriceOne.dataset.type = "normal"
        document.getElementById("one-price-sort-arrow").innerHTML = "&#8593;";
        document.getElementById("one-price-sort-arrow").style.display = "none"
        sortPriceOne.style.fontWeight = "normal"
    }
}








// //////////////////////////////////////////////////////////////////////////////



// ................Function for selecting Flight.........................

selFlightData = {
    oneway: {},
    return: {},
    total: 0,
    passenger:1
}

function onSelectOne(value) {
    for (j of currentOneWayData) {
        if (j.id == value) {
            selFlightData.oneway = j
            break
        }
    }
    document.getElementById("selected-departure-flight-name").innerText = selFlightData.oneway.airlines
    document.getElementById("selected-departure-flight-logo").setAttribute("src", selFlightData.oneway.logo)
    document.getElementById("selected-on-ward-time-1").innerText = selFlightData.oneway["start_time"]
    document.getElementById("selected-on-ward-time-2").innerText = selFlightData.oneway["end_time"]
    document.getElementById("selected-departure-price").innerText = `Rs ${selFlightData.oneway.price}`
    let totalprice = document.getElementById("total-price")
    if (selFlightData.return.price) {
        selFlightData.total = selFlightData.oneway.price + selFlightData.return.price
        totalprice.innerText = `Rs ${selFlightData.total}`
    } else {
        selFlightData.total = selFlightData.oneway.price
        totalprice.innerText = `Rs ${selFlightData.total}`
    }

    localStorage.setItem("selectedFlight", JSON.stringify(selFlightData))

    document.getElementById("selected-flight").style.display = "flex"

}

function onSelectReturn(value) {
    document.getElementById("return-selected-box").style.display = "block"
    for (j of currentReturnData) {
        if (j.id == value) {
            selFlightData.return = j
            break
        }
    }
    document.getElementById("selected-return-flight-name").innerText = selFlightData.return.airlines
    document.getElementById("selected-return-flight-logo").setAttribute("src", selFlightData.return.logo)
    document.getElementById("selected-return-time-1").innerText = selFlightData.return["start_time"]
    document.getElementById("selected-return-time-2").innerText = selFlightData.return["end_time"]
    document.getElementById("selected-return-price").innerText = `Rs ${selFlightData.return.price}`
    let totalprice = document.getElementById("total-price")
    selFlightData.total = selFlightData.oneway.price + selFlightData.return.price
    totalprice.innerText = `Rs ${selFlightData.total}`

    localStorage.setItem("selectedFlight", JSON.stringify(selFlightData))

}


// Function for Making all One-way Sort Buttons Normal


function makeNormalDeparture() {
    sortDurationOne.dataset.type = "normal"
    document.getElementById("one-duration-sort-arrow").innerHTML = "&#8593;";
    document.getElementById("one-duration-sort-arrow").style.display = "none"
    sortDurationOne.style.fontWeight = "normal"

    sortArrivalOne.dataset.type = "normal"
    document.getElementById("one-arrival-sort-arrow").innerHTML = "&#8593;";
    document.getElementById("one-arrival-sort-arrow").style.display = "none"
    sortArrivalOne.style.fontWeight = "normal"

    sortPriceOne.dataset.type = "normal"
    document.getElementById("one-price-sort-arrow").innerHTML = "&#8593;";
    document.getElementById("one-price-sort-arrow").style.display = "none"
    sortPriceOne.style.fontWeight = "normal"
}

function makeNormalArrival() {
    sortDepartureOne.dataset.type = "normal"
    document.getElementById("one-departure-sort-arrow").innerHTML = "&#8593;";
    document.getElementById("one-departure-sort-arrow").style.display = "none"
    sortDepartureOne.style.fontWeight = "normal"

    sortDurationOne.dataset.type = "normal"
    document.getElementById("one-duration-sort-arrow").innerHTML = "&#8593;";
    document.getElementById("one-duration-sort-arrow").style.display = "none"
    sortDurationOne.style.fontWeight = "normal"

    sortPriceOne.dataset.type = "normal"
    document.getElementById("one-price-sort-arrow").innerHTML = "&#8593;";
    document.getElementById("one-price-sort-arrow").style.display = "none"
    sortPriceOne.style.fontWeight = "normal"
}

function makeNormalDuration() {
    sortDepartureOne.dataset.type = "normal"
    document.getElementById("one-departure-sort-arrow").innerHTML = "&#8593;";
    document.getElementById("one-departure-sort-arrow").style.display = "none"
    sortDepartureOne.style.fontWeight = "normal"

    sortArrivalOne.dataset.type = "normal"
    document.getElementById("one-arrival-sort-arrow").innerHTML = "&#8593;";
    document.getElementById("one-arrival-sort-arrow").style.display = "none"
    sortArrivalOne.style.fontWeight = "normal"

    sortPriceOne.dataset.type = "normal"
    document.getElementById("one-price-sort-arrow").innerHTML = "&#8593;";
    document.getElementById("one-price-sort-arrow").style.display = "none"
    sortPriceOne.style.fontWeight = "normal"
}

function makeNormalPrice() {
    sortDepartureOne.dataset.type = "normal"
    document.getElementById("one-departure-sort-arrow").innerHTML = "&#8593;";
    document.getElementById("one-departure-sort-arrow").style.display = "none"
    sortDepartureOne.style.fontWeight = "normal"

    sortDurationOne.dataset.type = "normal"
    document.getElementById("one-duration-sort-arrow").innerHTML = "&#8593;";
    document.getElementById("one-duration-sort-arrow").style.display = "none"
    sortDurationOne.style.fontWeight = "normal"

    sortArrivalOne.dataset.type = "normal"
    document.getElementById("one-arrival-sort-arrow").innerHTML = "&#8593;";
    document.getElementById("one-arrival-sort-arrow").style.display = "none"
    sortArrivalOne.style.fontWeight = "normal"

}






// /////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////



let flight1 = document.querySelector(".flight1")
let input1 = document.getElementById("input1")
let span1 = document.getElementById("span1")
let down_bar = document.getElementById("down_bar")
let fromh1 = document.getElementById("fromh1")

fromh1.innerText=from
input1.value=from

flight1.addEventListener("click", function () {
    if(input1.style.display = "none"){
        input1.style.display = "block"
    }else{
        input1.style.display = "none"
    }
    span1.style.display = "none"
    down_bar.style.display = "block"
    fromh1.style.display = "none"
    console.log("button clicking")
})



let cityArr;
fetch("http://localhost:3000/flights")
    .then(res => {
        return res.json()
    })
    .then(data => {
        // console.log(data);
        cityArr = data;
    })


    input1.addEventListener("input", (e) => {
    let x = e.target.value.toLowerCase();
    // console.log(x);
    let arr = cityArr.filter(el => {
        return el.from.toLowerCase().includes(x);
    })
    let obj = {};
    down_bar.innerHTML = null;
    arr.forEach(element => {
        if (obj[element.from] == undefined) {
            obj[element.from] = 1;
        }
    });
    for (let key in obj) {
        let p = document.createElement("p");
        p.setAttribute("class", "suggestion_name");
        p.innerText = key;
        p.addEventListener("click", (event) => {
            input1.value = key;
            down_bar.style.display = "none";
            fromh1.innerText=input1.value
            from=input1.value
            input1.style.display="none"
            span1.style.display = "block"
            fromh1.style.display = "block"
            event.stopPropagation()
        })
        down_bar.append(p);
    }
})



////.............................................//////////////////


let flight2 = document.querySelector(".flight2")
let input2 = document.getElementById("input2")
let span3 = document.getElementById("span3")
let down_bar1 = document.getElementById("down_bar1")
let toh1 = document.getElementById("toh1")

toh1.innerHTML=to
input2.value=to


flight2.addEventListener("click", function () {

    if(input2.style.display = "none"){
        input2.style.display = "block"
    }else{
        input2.style.display = "none"
    }   
    span3.style.display = "none"
    down_bar1.style.display = "block"
    toh1.style.display = "none"

})


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

input2.addEventListener("input", (e) => {
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
    p.addEventListener("click", (event) => {
      input2.value = key;
      dataCity1.style.display = "none";
      to=input2.value
      toh1.innerText=input2.value
      down_bar1.style.display="none"
      input2.style.display="none"
      span3.style.display = "block"
      toh1.style.display = "block"
      event.stopPropagation()

    })
    dataCity1.append(p);
  }
})



// ....................departure date.............. 


let for_day=document.getElementById("for_day");
let for_month=document.getElementById("for_month");
let for_year=document.getElementById("for_year");
let vars=document.getElementById("var")

for_day.innerText=date1

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
    date1=`${vars.innerText},${for_month.innerText}${for_day.innerText},${for_year.innerText}`


})


// ....................Return date.............. 


let for_day_return=document.getElementById("for_day_return");
let for_month_return=document.getElementById("for_month_return");
let for_year_return=document.getElementById("for_year_return");
let vars_return=document.getElementById("var_return")

for_day_return.innerText=date1

let calendorReturn=document.getElementById("calendor-return");
calendorReturn.addEventListener("change",function(){
    let date_data=calendorReturn.value
    for(i=0;i<date_data.length;i++){
      
        // for year
        let year= date_data[2]+date_data[3]
        for_year_return.innerText=year;
        //for day
        let day=date_data[8]+date_data[9]
        for_day_return.innerText=day;
       
        if(day=="01"){
            vars_return.innerText="Sunday"
        }else if(day=="02"){
            vars_return.innerText="Monday"
        }else if(day=="03"){
            vars_return.innerText="Tuesday"
        }else if(day=="04"){
            vars_return.innerText="Wednesday"
        }else if(day=="05"){
            vars_return.innerText="Thursday"
        }else if(day=="06"){
            vars_return.innerText="Friday"
        }else if(day=="07"){
            vars.innerText="Saturday"
        }else if(day=="08"){
            vars_return.innerText="Sunday"
        }else if(day=="09"){
            vars_return.innerText="Monday"
        }else if(day=="10"){
            vars_return.innerText="Tuesday"
        }else if(day=="11"){
            vars_return.innerText="Wednesday"
        }else if(day=="12"){
            vars_return.innerText="Thursday"
        }else if(day=="13"){
            vars_return.innerText="Friday"
        }else if(day=="14"){
            vars_return.innerText="Saturday"
        }else if(day=="15"){
            vars_return.innerText="Sunday"
        }else if(day=="16"){
            vars_return.innerText="Monday"
        }else if(day=="17"){
            vars_return.innerText="Tuesday"
        }else if(day=="18"){
            vars_return.innerText="Wednesday"
        }else if(day=="19"){
            vars_return.innerText="Thursday"
        }else if(day=="20"){
            vars_return.innerText="Friday"
        }else if(day=="21"){
            vars_return.innerText="Saturday"
        }else if(day=="22"){
            vars_return.innerText="Sunday"
        }else if(day=="23"){
            vars.innerText="Monday"
        }else if(day=="24"){
            vars_return.innerText="Tuesday"
        }else if(day=="25"){
            vars_return.innerText="Wednesday"
        }else if(day=="26"){
            vars_return.innerText="Thursday"
        }else if(day=="27"){
            vars_return.innerText="Friday"
        }else if(day=="28"){
            vars_return.innerText="Saturday"
        }else if(day=="29"){
            vars_return.innerText="Sunday"
        }else if(day=="30"){
            vars_return.innerText="Monday"
        }else if(day=="31"){
            vars_return.innerText="Tuesday"
        }
        // for month
        let month=date_data[5]+date_data[6]
        if(month=="01"){
            for_month_return.innerText=" Jan"
        }else if(month=="02"){
            for_month_return.innerText=" Feb"
        }else if(month=="03"){
            for_month_return.innerText=" Mar"
        }else if(month=="04"){
            for_month_return.innerText=" Apr"
        }else if(month=="05"){
            for_month_return.innerText=" May"
        }else if(month=="06"){
            for_month_return.innerText=" Jun"
        }else if(month=="07"){
            for_month_return.innerText=" Jul"
        }else if(month=="08"){
            for_month_return.innerText=" Aug"
        }else if(month=="09"){
            for_month_return.innerText=" Sep"
        }else if(month=="10"){
            for_month_return.innerText=" Oct"
        }else if(month=="11"){
            for_month_return.innerText=" Nov"
        }else if(month=="12"){
            for_month_return.innerText=" Dec"
        }
       
    }
    date2=`${vars_return.innerText},${for_month_return.innerText}${for_day_return.innerText},${for_year_return.innerText}`

})


// .....................Passenger..........................


let select_number=document.getElementById("select_number");
let new_span=document.getElementById("passengerNumber")
select_number.addEventListener("change",function(){
    new_span.innerText=select_number.value;
    selFlightData.passenger=select_number.value

    localStorage.setItem("selectedFlight", JSON.stringify(selFlightData))
})