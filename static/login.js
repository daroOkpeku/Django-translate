let email = document.querySelector(".email")
let password = document.querySelector(".password")
let login = document.querySelector(".login")
let origin = window.location.origin
let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
let popup = document.querySelector(".popup")
let popcontent = document.querySelector(".popcontent")
let closex = document.querySelector(".close")

login.addEventListener("click", function(e){
    e.preventDefault()
    let formdata = new FormData();
    formdata.append("email", email.value);
    formdata.append("password", password.value);

    axios.post(
        `${origin}/signin`,
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
      popcontent.textContent = response.data.success
      setTimeout(()=>{
        window.location.href = `${origin}/home`
      },1500)
    }else{
      popup.style.display = "flex"
      popcontent.textContent = response.data.error
    //   "this email has been used before or you input is wrong"
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