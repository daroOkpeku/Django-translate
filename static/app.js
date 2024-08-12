let buger = document.getElementById("buger")
let listx =document.getElementById('list')
console.log(buger)
buger.addEventListener("click", function(e){
   if(listx.style.display === 'block'){
    listx.style.display = 'none';
   }else{
   listx.style.display = 'block';
   }
   listx.style.animation = 'yourAnimationName 2s ease-in-out';
})

