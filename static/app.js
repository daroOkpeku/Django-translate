let buger = document.getElementById("buger")
let listx =document.getElementById('list')
// https://www.flaticon.com/search?word=send
buger.addEventListener("click", function(e){
   if(listx.style.display === 'block'){
    listx.style.display = 'none';
   }else{
   listx.style.display = 'block';
   }
   listx.style.animation = 'yourAnimationName 2s ease-in-out';
})

