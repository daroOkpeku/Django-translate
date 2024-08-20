let logout = document.querySelector(".logout")
let origin = window.location.origin
let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
let popup = document.querySelector(".popup")
let popcontent = document.querySelector(".popcontent")
let trashx = document.querySelector(".trashx")
let insidetable = document.querySelector(".insidetable")
let buger = document.getElementById("buger")
let listx =document.getElementById('list')
let prev = document.querySelector(".prev")
let numinside = document.querySelector(".numinside")
let next = document.querySelector(".next")
let total_num ;
console.log(insidetable)
logout.addEventListener("click", function(e){
    e.preventDefault()
    localStorage.removeItem("transget")
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
  // console.log("Success:", response.data.data);
  if(response.data.success){
      let list = response.data.data
      total_num = response.data.total_pages
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


buger.addEventListener("click", function(e){
  if(listx.style.display === 'block'){
   listx.style.display = 'none';
  }else{
  listx.style.display = 'block';
  }
  listx.style.animation = 'yourAnimationName 2s ease-in-out';
})


prev.addEventListener("click", function(e){
  e.preventDefault()
 let current = parseInt(numinside.textContent)
   insidetable.innerHTML = ``
 if(current > 1 ){
  let ans =  current -= 1;
  numinside.textContent = ans
  axios.get(
    `${origin}/tranallwords/?page=${ans}`,
    {headers: {
        "X-CSRFToken": csrfToken,
          "Content-Type": "application/json",
        },}
)
.then((response) => {
    
 //  console.log("Success:", response.data.responseData.translatedText);
  // console.log("Success:", response.data.data);
  if(response.data.success){
      let list = response.data.data
      // total_num = response.data.total_pages
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


 }
 else if(current == 1 ){
   numinside.textContent = 1
   axios.get(
    `${origin}/tranallwords/?page=${1}`,
    {headers: {
        "X-CSRFToken": csrfToken,
          "Content-Type": "application/json",
        },}
)
.then((response) => {
    
 //  console.log("Success:", response.data.responseData.translatedText);
  // console.log("Success:", response.data.data);
  if(response.data.success){
      let list = response.data.data
      // total_num = response.data.total_pages
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

 }
})


next.addEventListener("click", function(e){
  e.preventDefault()
  let current = parseInt(numinside.textContent)
  insidetable.innerHTML = ``

  if(current < total_num){
    let ans =  current += 1;
    console.log(ans)
    numinside.textContent = ans

    axios.get(
      `${origin}/tranallwords/?page=${ans}`,
      {headers: {
          "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
          },}
  )
  .then((response) => {
      
   //  console.log("Success:", response.data.responseData.translatedText);
    // console.log("Success:", response.data.data);
    if(response.data.success){
        let list = response.data.data
        // total_num = response.data.total_pages
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
  }
  else if(current == total_num){
    numinside.textContent = 1
    
    axios.get(
      `${origin}/tranallwords/?page=${1}`,
      {headers: {
          "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
          },}
  )
  .then((response) => {
      
   //  console.log("Success:", response.data.responseData.translatedText);
    // console.log("Success:", response.data.data);
    if(response.data.success){
        let list = response.data.data
        // total_num = response.data.total_pages
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



  } 
})