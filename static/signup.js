let popup = document.querySelector(".popup")
let popcontent = document.querySelector(".popcontent")
let closex = document.querySelector(".close")
let submit = document.querySelector(".submit")
let fullname = document.querySelector(".fullname")
let email = document.querySelector(".email")
let password = document.querySelector(".password")
let confirm_password = document.querySelector(".confirm_password")
let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
let origin = window.location.origin
submit.addEventListener("click", function(e){
    e.preventDefault();
    
  
    
    confirm_password.value
    let formdata = new FormData();
    formdata.append("fullname", fullname.value);
    formdata.append("email",   email.value);
    formdata.append("password", password.value);
    formdata.append("confirm_password", confirm_password.value);
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
    
    console.log(response)
    if(response.data.data){
        containercover.style.display = "flex"
        contenttext.textContent = rresponse.data.data
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



