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

let flightData = []
let currentOneWayData=[]
let currentReturnData=[]
let flighttype="round-trip"
JSON.parse(localStorage.getItem("selectedFlight")) || []


fetch("http://localhost:3000/flights")
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        flightData = data
    })






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ..............Function for Displaying Data........................

function DisplayDataOneway(arr) {
    document.getElementById("return-fligts").innerHTML=null
    document.getElementById("one-ward-flight-list-cards").innerHTML = CreateListofcardsoneway(arr).join(" ")
}



function DisplayDataReturn(arr) {

    document.getElementById("return-fligts").innerHTML = `
                <div id="return-flight-info">
                    <div>
                        <p style="font-size: 16px;">
                            <b id="return-flight-name">Bengaluru → New Delhi</b>
                            <span id="return-date">Thurs, 19 Jan</span>
                        </p>
                    </div>
                    <div class="sort-buttons">
                        <div>
                            <span id="return-departure-sort">Departure</span>
                            <span class="return-sort-button-arrow" id="departure-sort-arrow">&#8593;</span>
                        </div>
                        <div>
                            <span id="one-ward-duration-sort">Duration</span>
                            <span class="return-sort-button-arrow" id="duration-sort-arrow">&#8593;</span>
                        </div>
                        <div>
                            <span id="one-ward-arrival-sort">Arrival</span>
                            <span class="return-sort-button-arrow" id="arrival-sort-arrow">&#8593;</span>
                        </div>
                        <div>
                            <span id="one-ward-price-sort">Price</span>
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
    arr.forEach(element => {
        list.push(CreateOnewayCard(el))
    });
    return list
}

function CreateListofcardsreturn(arr) {
    let list = []
    arr.forEach(element => {
        list.push( CreateReturnCard(el))
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
                <label for="select-flight" class="price">${el.price}</label>
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
                <label for="select-flight" class="price">${el.price}</label>
                <input type="radio" class="select-flight" value=${el.id} name="selected-return-flight" onclick="onSelectReturn(this.value)" >
            </div>
        </div>
    </div>
        `
}
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







// Function for Search Input Display

let search = document.getElementById("search")

search.addEventListener("click", () => {
    let fromValue = document.getElementById("").value //Put here Id of from input value
    let ToValue = document.getElementById("").value //Put here Id of To input value
    let tripType = document.getElementById("trip-type")

    if (tripType.value == "round-trip") {
        flighttype="round-trip"
        document.getElementById("return-selected-box").style.display="block"
        let oneway = flightData.filter((el) => {
            if (el.from == fromValue && el.to == ToValue) {
                return true
            }else{
                return false
            }
        })
        let returndata=flightData.filter((el) => {
            if (el.from == ToValue && el.to == fromValue) {
                return true
            }
        })
        currentOneWayData=oneway
        DisplayDataOneway(oneway)
        currentReturnData=returndata
        DisplayDataReturn(returndata)

    }else{
        flighttype="one-way"
        document.getElementById("return-selected-box").style.display="none"
        let oneway = flightData.filter((el) => {
            if (el.from == fromValue && el.to == ToValue) {
                return true
            }else{
                return false
            }
        })
        currentOneWayData=oneway
        DisplayDataOneway(oneway)
    }



})





// Filtering Airlines functionality

let airlineSelect=document.getElementsByName("Airlines")
applyAirlineFilter=document.getElementById("filterbyAirlineBtn")

console.log(airlineSelect)

applyAirlineFilter.addEventListener("click",applyFilter)

function applyFilter(){
    let checkedAirline=[]
    airlineSelect.forEach((el)=>{
        if(el.checked){
            checkedAirline.push(el.value)
        }
    })
    filterbyAirline(checkedAirline)
}






// ....................function for filtering Airline................

function filterbyAirline(checkedAirline){
    // let fromValue = document.getElementById("").value //Put here Id of from input value
    // let ToValue = document.getElementById("").value //Put here Id of To input value
    // let tripType = document.getElementById("trip-type")

    if ( flighttype== "round-trip") {
        let oneway = currentOneWayData.filter((el) => {
            if (checkedAirline.include(el.airlines) && el.price<=inputSlider.value) {
                return true
            }else{
                return false
            }
        })
        let returndata=currentReturnData.filter((el) => {
            if ( checkedAirline.include(el.airlines) &&  el.price<=inputSlider.value) {
                return true
            }
        })
        DisplayDataOneway(oneway)
        DisplayDataReturn(returndata)

    }else{
        let oneway = currentOneWayData.filter((el) => {
            if (checkedAirline.include(el.airlines) && el.price<=inputSlider.value) {
                return true
            }else{
                return false
            }
        })
        DisplayDataOneway(oneway)
    }


}






// Filtering Airlines by Price functionality

let applyPriceFilter=document.getElementById("filterbyPriceBtn")

applyPriceFilter.addEventListener("click",applyFilter)

// ///////////////////////////////////////////////////////////////////////////////////





// ......Function for selecting Flight

let selFlightData={
    oneway:{},
    return:{},
    total:0
}

function onSelectOne(value){
    for(j of currentOneWayData){
        if(j.id==value){
            selFlightData.oneway=j
            break
        }
    }
    document.getElementById("selected-departure-flight-name").innerText=selFlightData.oneway.from
    document.getElementById("selected-departure-flight-logo").setAttribute("src",selFlightData.oneway.logo)
    document.getElementById("selected-on-ward-time-1").innerText=selFlightData.oneway["start_time"]
    document.getElementById("selected-on-ward-time-2").innerText=selFlightData.oneway["end_time"]
    document.getElementById("selected-departure-price").innerText=selFlightData.oneway.price
    let totalprice=document.getElementById("total-price")
    if(selFlightData.return.price){
        selFlightData.total=selFlightData.oneway.price + selFlightData.return.price
        totalprice.innerText=selFlightData.total
    }else{
        selFlightData.total=selFlightData.oneway.price
        totalprice.innerText=selFlightData.total
    }

    localStorage.setItem("selectedFlight",JSON.stringify("selFlightData"))

    document.getElementById("selected-flight").style.display="flex"

}

function onSelectReturn(value){
    for(j of currentReturnData){
        if(j.id==value){
            selFlightData.return=j
            break
        }
    }
    document.getElementById("selected-return-flight-name").innerText=selFlightData.return.from
    document.getElementById("selected-return-flight-logo").setAttribute("src",selFlightData.return.logo)
    document.getElementById("selected-return-time-1").innerText=selFlightData.return["start_time"]
    document.getElementById("selected-return-time-2").innerText=selFlightData.return["end_time"]
    document.getElementById("selected-return-price").innerText=selFlightData.return.price
    let totalprice=document.getElementById("total-price")
    selFlightData.total=selFlightData.oneway.price + selFlightData.return.price
    totalprice.innerText=selFlightData.total

    localStorage.setItem("selectedFlight",JSON.stringify("selFlightData"))

}
