let logout = document.querySelector(".logout")
let origin = window.location.origin
let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
let popup = document.querySelector(".popup")
let popcontent = document.querySelector(".popcontent")
let trashx = document.querySelector(".trashx")
let insidetable = document.querySelector(".insidetable")
console.log(insidetable)
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

// trashx.addEventListener("click", function(e){
//     e.preventDefault()
//     // let formdata = new FormData();
//     // formdata.append("email", email.value);
//     // axios.post(
//     //     `${origin}/logout`,
//     //     formdata,
//     //   {headers: {
//     //     "X-CSRFToken": csrfToken,
//     //       "Content-Type": "application/json",
//     //     },}
//     // )
//     // .then((response) => {
//     //       if(response.data.success){
//     //         popup.style.display = "flex"
//     //         popcontent.textContent = response.data.success
//     //         setTimeout(()=>{
//     //                 window.location.href = `${origin}/home`
//     //         },2000)
//     //       }
//     // })

// })



axios.get(
    `${origin}/tranallwords/?page=${1}`,
    {headers: {
        "X-CSRFToken": csrfToken,
          "Content-Type": "application/json",
        },}
)
.then((response) => {
    
 //  console.log("Success:", response.data.responseData.translatedText);
  console.log("Success:", response.data.data);
  if(response.data.success){
      let list = response.data.data
      list.map((item)=>{

        insidetable.innerHTML += `<tr>
              <td class="text-center text-xs sm:text-xs md:text-sm lg:text-sm ">${item.fromx}</td>
                        <td class="text-center text-xs sm:text-xs md:text-sm lg:text-sm">${item.to}</td>
                        <td class="text-center text-xs sm:text-xs md:text-sm lg:text-sm">${item.tranword}</td>
                        <td class="grid place-items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                            <span  data-id="${item.id}"  class="w-6 eye">
                                <i class="fa fa-eye text-green-600 text-xs sm:text-xs md:text-sm lg:text-sm" aria-hidden="true"></i>
                            </span>
                             <span data-id="${item.id}" class="w-6 trashdel">
                                <i class="fa fa-trash text-red-600 text-xs sm:text-xs md:text-sm lg:text-sm trashx" aria-hidden="true"></i>
                             </span>
                            </td>
                    </tr>
        `

      })
      let eye = document.querySelector(".eye")
      let trashdel = document.querySelector(".trashdel")
      trashdel.addEventListener("click", function(e){
        e.preventDefault()
       let delnum = parseInt(trashdel.dataset.id)
        let formdata = new FormData();
        formdata.append("id", delnum);
        axios.post(
            `${origin}/trash`,
            formdata,
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
                        window.location.href = `${origin}/home`
                },2000)
              }
        })


      })

      eye.addEventListener("click", function(e){
        e.preventDefault()
        let delnum = parseInt(trashdel.dataset.id)
         let ansfind = list.find((item)=>parseInt(item.id) == delnum)
         console.log(ansfind)
          localStorage.setItem("transget", JSON.stringify(ansfind))
          setTimeout(()=>{
            window.location.href = `${origin}`
          },1500)
      })


  }
})
.catch((error) => {
  console.error("Error:", error);
});