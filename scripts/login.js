  // for login page
  let login_button=document.getElementById("login_button");
  let sign_up_button=document.getElementById("sign_up_button");

  let login_page=document.getElementById("login_page")
  let signup_page=document.getElementById("signup_page")

  signup_page.style.display="none";

  sign_up_button.addEventListener("click",function(){
      login_page.style.display="none";
      signup_page.style.display="block";
  })

  p_tag=document.getElementById("p_tag");
  p_tag.addEventListener("load",function(){
      console.log("working")
  })
 
// for login btn background color

function change(){
  let num=document.getElementById("name_input").value;
  if(num.length==9){
  let continue_btn=document.getElementById("continue_button");
  continue_btn.style.backgroundColor="#008CFF"
  }
}

//  for otp
let otp=document.getElementById("otp_input");
otp.style.display="none"
let conbtn=document.getElementById("continue_button");
conbtn.addEventListener("click",function(){
  otp.style.display="block"
})


 // for signup page

  let login_buttons=document.getElementById("login_buttons");
  let sign_up_buttons=document.getElementById("sign_up_buttons");

  login_buttons.addEventListener("click",function(){
      login_page.style.display="block";
      signup_page.style.display="none";
  })
let arr=[]
let form=document.getElementById("input_or_countinue_div");
form.addEventListener("submit",function(event){
  event.preventDefault()
  let names=document.getElementById("named_input")
  let emails=document.getElementById("email_input")
  let numbers=document.getElementById("number_input")
  let passwords=document.getElementById("password_input")
  let user_data={
   name:names.value,
   email:emails.value,
   number:numbers.value,
   password:passwords.value,
  }
  arr.push(user_data)
 console.log(arr)
})
  
//  for continue btn background color
function key(){
let passwords=document.getElementById("password_input").value
if(passwords.length==0){
  let btn=document.getElementById("continue_buttons");
  btn.style.backgroundImage="linear-gradient(93deg,#f0772c,#f95776)"
}
}