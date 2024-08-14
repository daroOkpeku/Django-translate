let buger = document.getElementById("buger")
console.log(buger)
let listx =document.getElementById('list')
let word = document.querySelector(".word")
let submit = document.querySelector(".submit")
let from = document.querySelector(".from")
let to = document.querySelector(".to")
let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
let containercover = document.querySelector(".containercover")
let contenttext = document.querySelector(".contenttext")
let speaktransalte = document.querySelector(".speaktransalte")
let closex = document.querySelector(".close")
let popup = document.querySelector(".popup")
let popcontent = document.querySelector(".popcontent")
console.log(submit)
// https://www.flaticon.com/search?word=send



const countries = [
   // { country: "Select", language: "Language", code: "US" },
   // { country: "United States", language: "en-US", code: "US" },
   { country: "United Kingdom", language: "en-GB", code: "GB" },
   // { country: "Canada", language: "en-CA", code: "CA" },
   { country: "Australia", language: "en-AU", code: "AU" },
   { country: "France", language: "fr-FR", code: "FR" },
   { country: "Germany", language: "de-DE", code: "DE" },
   { country: "Spain", language: "es-ES", code: "ES" },
   { country: "Mexico", language: "es-MX", code: "MX" },
   { country: "Italy", language: "it-IT", code: "IT" },
   { country: "Brazil", language: "pt-BR", code: "BR" },
   { country: "Portugal", language: "pt-PT", code: "PT" },
   { country: "Japan", language: "ja-JP", code: "JP" },
   { country: "South Korea", language: "ko-KR", code: "KR" },
   { country: "China", language: "zh-CN", code: "CN" },
   { country: "Russia", language: "ru-RU", code: "RU" },
   { country: "Netherlands", language: "nl-NL", code: "NL" },
   { country: "Turkey", language: "tr-TR", code: "TR" },
   { country: "India", language: "hi-IN", code: "IN" },
   { country: "Pakistan", language: "ur-PK", code: "PK" },
   { country: "Saudi Arabia", language: "ar-SA", code: "SA" },
   { country: "Egypt", language: "ar-EG", code: "EG" },
   { country: "Greece", language: "el-GR", code: "GR" },
   { country: "Sweden", language: "sv-SE", code: "SE" },
   { country: "Norway", language: "no-NO", code: "NO" },
   { country: "Denmark", language: "da-DK", code: "DK" },
   { country: "Finland", language: "fi-FI", code: "FI" },
   { country: "Poland", language: "pl-PL", code: "PL" },
   { country: "Ukraine", language: "uk-UA", code: "UA" },
   { country: "Czech Republic", language: "cs-CZ", code: "CZ" },
   { country: "Hungary", language: "hu-HU", code: "HU" },
   { country: "Vietnam", language: "vi-VN", code: "VN" },
   { country: "Thailand", language: "th-TH", code: "TH" },
   { country: "Indonesia", language: "id-ID", code: "ID" },
   { country: "Malaysia", language: "ms-MY", code: "MY" },
   { country: "Philippines", language: "fil-PH", code: "PH" },
   { country: "Singapore", language: "en-SG", code: "SG" },
   { country: "South Africa", language: "en-ZA", code: "ZA" },
   { country: "Nigeria", language: "en-NG", code: "NG" },
   { country: "Kenya", language: "en-KE", code: "KE" },
   { country: "Ghana", language: "en-GH", code: "GH" },
   { country: "Ireland", language: "en-IE", code: "IE" },
   { country: "New Zealand", language: "en-NZ", code: "NZ" },
   { country: "Switzerland", language: "de-CH", code: "CH" },
   { country: "Austria", language: "de-AT", code: "AT" },
   { country: "Belgium", language: "nl-BE", code: "BE" },
   { country: "Argentina", language: "es-AR", code: "AR" },
   { country: "Chile", language: "es-CL", code: "CL" },
   { country: "Colombia", language: "es-CO", code: "CO" },
   { country: "Peru", language: "es-PE", code: "PE" },
   { country: "Venezuela", language: "es-VE", code: "VE" },
   { country: "Cuba", language: "es-CU", code: "CU" },
   { country: "Dominican Republic", language: "es-DO", code: "DO" },
   { country: "Ecuador", language: "es-EC", code: "EC" },
   { country: "Bolivia", language: "es-BO", code: "BO" },
   { country: "Uruguay", language: "es-UY", code: "UY" },
   { country: "Paraguay", language: "es-PY", code: "PY" },
   { country: "Costa Rica", language: "es-CR", code: "CR" },
   { country: "Panama", language: "es-PA", code: "PA" },
   { country: "El Salvador", language: "es-SV", code: "SV" },
   { country: "Guatemala", language: "es-GT", code: "GT" },
   { country: "Honduras", language: "es-HN", code: "HN" },
   { country: "Nicaragua", language: "es-NI", code: "NI" },
   { country: "Portugal", language: "pt-PT", code: "PT" },
   { country: "Angola", language: "pt-AO", code: "AO" },
   { country: "Mozambique", language: "pt-MZ", code: "MZ" },
   { country: "Cape Verde", language: "pt-CV", code: "CV" },
   { country: "Guinea-Bissau", language: "pt-GW", code: "GW" },
   { country: "East Timor", language: "pt-TL", code: "TL" },
   { country: "Luxembourg", language: "fr-LU", code: "LU" },
   { country: "Iceland", language: "is-IS", code: "IS" },
   { country: "Lithuania", language: "lt-LT", code: "LT" },
   { country: "Latvia", language: "lv-LV", code: "LV" },
   { country: "Estonia", language: "et-EE", code: "EE" },
   { country: "Slovakia", language: "sk-SK", code: "SK" },
   { country: "Slovenia", language: "sl-SI", code: "SI" },
   { country: "Croatia", language: "hr-HR", code: "HR" },
   { country: "Bosnia and Herzegovina", language: "bs-BA", code: "BA" },
   { country: "Serbia", language: "sr-RS", code: "RS" },
   { country: "Montenegro", language: "sr-ME", code: "ME" },
   { country: "North Macedonia", language: "mk-MK", code: "MK" },
   { country: "Bulgaria", language: "bg-BG", code: "BG" },
   { country: "Romania", language: "ro-RO", code: "RO" },
   { country: "Albania", language: "sq-AL", code: "AL" },
   { country: "Moldova", language: "ro-MD", code: "MD" },
   { country: "Georgia", language: "ka-GE", code: "GE" },
   { country: "Armenia", language: "hy-AM", code: "AM" },
   { country: "Azerbaijan", language: "az-AZ", code: "AZ" },
   { country: "Kazakhstan", language: "kk-KZ", code: "KZ" },
   { country: "Uzbekistan", language: "uz-UZ", code: "UZ" },
   { country: "Kyrgyzstan", language: "ky-KG", code: "KG" },
   { country: "Tajikistan", language: "tg-TJ", code: "TJ" },
   { country: "Turkmenistan", language: "tk-TM", code: "TM" },
   { country: "Afghanistan", language: "fa-AF", code: "AF" },
   { country: "Nepal", language: "ne-NP", code: "NP" },
   { country: "Sri Lanka", language: "si-LK", code: "LK" },
   { country: "Bangladesh", language: "bn-BD", code: "BD" },
   { country: "Myanmar", language: "my-MM", code: "MM" },
];


countries.map((item)=>{
   from.innerHTML += `<option data-id='${item.language}'>${item.country}(${item.code})</option>`;
   to.innerHTML += `<option data-id='${item.language}'>${item.country}(${item.code})</option>`;
})



buger.addEventListener("click", function(e){
   if(listx.style.display === 'block'){
    listx.style.display = 'none';
   }else{
   listx.style.display = 'block';
   }
   listx.style.animation = 'yourAnimationName 2s ease-in-out';
})

submit.addEventListener("click", function(e){
   e.preventDefault()
  let text = word.value
  let tox = to.value
  let fromx = from.value
  const selectedOption = to.options[to.selectedIndex]
  const dataInfo = selectedOption.dataset.id.toLowerCase();

  const selectedOptionfrom = from.options[from.selectedIndex]
   const dataInfofrom = selectedOptionfrom.dataset.id.toLowerCase()

if(text && tox && fromx){
   axios.get(
      `https://api.mymemory.translated.net/get?q=${text}&langpair=${dataInfofrom}|${dataInfo}&key=49bada96bc7f6feeaef4`,
    {headers: {
        "Content-Type": "application/json",
      },}
  )
  .then((response) => {
      
   //  console.log("Success:", response.data.responseData.translatedText);
    console.log("Success:", response);
    if(response.data.responseData.translatedText){
      containercover.style.display = "flex"
      containercover.style.flexDirection ="column"
      contenttext.textContent = response.data.responseData.translatedText
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

}else{
 popup.style.display = 'flex'
  popcontent.textContent = 'please select and input the correct values'
}


//   console.log(text, tox, fromx, dataInfo)
})


function speak(text, lang) {
   const speech = new SpeechSynthesisUtterance(text);
   speech.lang = lang;
   
   window.speechSynthesis.speak(speech);
}

speaktransalte.addEventListener("click", function(e){
   e.preventDefault();
   const selectedOption = to.options[to.selectedIndex]
   const dataInfo = selectedOption.dataset.id.toLowerCase();
   speak(contenttext.innerText, dataInfo)
})

closex.addEventListener("click", function(e){
   e.preventDefault();
   popup.style.display = 'none'
   popcontent.textContent = ''
})



