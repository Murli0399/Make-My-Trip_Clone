const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
ci=document.getElementById("ci")
co=document.getElementById("co")
ci.innerHTML=`<input type="date" id="cid" value="${year}-0${month}-${day}">`
co.innerHTML=`<input type="date" id="cod" min="${year}-0${month}-${day+1}" value="${year}-0${month}-${day+1}">`
const d = new Date(`${year}-0${month}-${day}`);
    let day2 = d.getDay()
    const p = new Date(`${year}-0${month}-${day+1}`);
    let day1 = p.getDay()
    if(day2==0){
        dayw="Sunday"
    }else if(day2==1){
        dayw="Monday"
    }else if(day2==2){
        dayw="Tuesday"
    }else if(day2==3){
        dayw="Wednesday"
    }else if(day2==4){
        dayw="Thursday"
    }else if(day2==5){
        dayw="Friday"
    }else if(day2==6){
        dayw="Saturday"
    }
    if(day1==0){
        day1w="Sunday"
    }else if(day1==1){
        day1w="Monday"
    }else if(day1==2){
        day1w="Tuesday"
    }else if(day1==3){
        day1w="Wednesday"
    }else if(day1==4){
        day1w="Thursday"
    }else if(day1==5){
        day1w="Friday"
    }else if(day1==6){
        day1w="Saturday"
    }
    cdi=document.getElementById("cdi")
    cdi.innerHTML=`<p>${dayw}</p>`
    cdo=document.getElementById("cdo")
    cdo.innerHTML=`<p>${day1w}</p>`
    search=document.getElementById("search")
    search.onclick=()=>{
        window.location.href = "./hotel.html";
    }
    langbtn=document.querySelector(".langbtn")
    langbtn.onclick=()=>{
        window.location.assign("admin_login.html")
    }
    navbar=document.querySelector(".nav1")
    // navbar.style.display="none"
    cate=document.querySelector(".cate")
    const observer=new IntersectionObserver((entries)=>{
        // console.log("p");
        const ent = entries[0]
        console.log(ent);
        ent.isIntersecting===false? navbar.classList.add("sticky"):navbar.classList.remove("sticky")
    },{

        root:null,
        rootMargin: "",
        threshold:0,
    })
    observer.observe(cate)
