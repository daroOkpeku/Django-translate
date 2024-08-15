let logout = document.querySelector(".logout")
let origin = window.location.origin
let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
let popup = document.querySelector(".popup")
let popcontent = document.querySelector(".popcontent")
let trashx = document.querySelector(".trashx")
logout.addEventListener("click", function(e){
    e.preventDefault()
    axios.get(
        `${origin}/logout`,
      {headers: {
        "X-CSRFToken": csrfToken,
          "Content-Type": "application/json",
        },}
    )
    .then((response) => {
          if(response.data.success){
            popup.style.display = "flex"
            popcontent.textContent = response.data.success
            setTimeout(()=>{
                    window.location.href = `${origin}`
            },2000)
          }
    })
})

trashx.addEventListener("click", function(e){
    e.preventDefault()
    // let formdata = new FormData();
    // formdata.append("email", email.value);
    // axios.post(
    //     `${origin}/logout`,
    //     formdata,
    //   {headers: {
    //     "X-CSRFToken": csrfToken,
    //       "Content-Type": "application/json",
    //     },}
    // )
    // .then((response) => {
    //       if(response.data.success){
    //         popup.style.display = "flex"
    //         popcontent.textContent = response.data.success
    //         setTimeout(()=>{
    //                 window.location.href = `${origin}/home`
    //         },2000)
    //       }
    // })

})



axios.get(
    `${origin}/tranallwords`,
    {headers: {
        "X-CSRFToken": csrfToken,
          "Content-Type": "application/json",
        },}
)
.then((response) => {
    
 //  console.log("Success:", response.data.responseData.translatedText);
  console.log("Success:", response);
//   if(response.data.responseData.translatedText){
//     containercover.style.display = "flex"
//     containercover.style.flexDirection ="column"
//     contenttext.textContent = response.data.responseData.translatedText
//   }
})
.catch((error) => {
  console.error("Error:", error);
});