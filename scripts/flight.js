const slideValue = document.querySelector("#slide-value");
const inputSlider = document.querySelector("input[type='range']");
inputSlider.oninput = (() => {
    let value = inputSlider.value;
    slideValue.textContent = `Rs.${value}`;
    // slideValue.style.left = (value / 150) + "%";
});
inputSlider.onblur = (() => {
});

// ...........Ftech Data From Server.............

let flightData=[]

fetch("http://localhost:3000/flights")
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        flightData=data
    })


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ..............Function for Displaying Data........................

function DisplayDataOneway(arr){
    document.getElementById("one-ward-flight-list-cards").innerHTML=CreateListofcards(arr).join(" ")
}

function DisplayDataReturn(arr){
    document.getElementById("return-fligts").innerHTML=CreateListofcards(arr).join(" ")
}


// ..................................Function for Creating List of cards..........................................

function CreateListofcards(arr){
    let list=[]
    arr.forEach(element => {
        list.push(CreateCard(el))
    });
    return list
}


// ..................................Function for creating  flight Card...............

function CreateCard(el) {
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
                <input type="radio" class="select-flight">
            </div>
        </div>
    </div>
        `
} 
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////