let popup = document.querySelector(".popup")
let popcontent = document.querySelector(".popcontent")
let closex = document.querySelector(".close")
let submit = document.querySelector(".submit")
let fullname = document.querySelector(".fullname")
let email = document.querySelector(".email")
let password = document.querySelector(".password")
let username = document.querySelector(".username")
let confirm_password = document.querySelector(".confirm_password")
let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
let containercover = document.querySelector(".containercover")
let contenttext = document.querySelector(".contenttext")

let origin = window.location.origin
submit.addEventListener("click", function(e){
    e.preventDefault();
    
  
    
    confirm_password.value
    let formdata = new FormData();
    formdata.append("fullname", fullname.value);
    formdata.append("email",   email.value);
    formdata.append("password", password.value);
    formdata.append("confirm_password", confirm_password.value);
    formdata.append("username", username.value)
    formdata.append("origin", origin);
    axios.post(
        `${origin}/register`,
        formdata,
      {headers: {
        "X-CSRFToken": csrfToken,
          "Content-Type": "application/json",
        },}
    )
    .then((response) => {
    
    console.log(response.data)
    if(response.status == 200){
      popup.style.display = "flex"
      popcontent.textContent = response.data.data
    }else{
      popup.style.display = "flex"
      popcontent.textContent = "this email has been used before or you input is wrong"
    }
    })
    .catch((error) => {
        console.error("Error:", error);
      });
})



closex.addEventListener("click", function(e){
    e.preventDefault();
    popup.style.display = 'none'
    popcontent.textContent = ''
 })



