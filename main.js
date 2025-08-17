

async function getwether() {
  let city = document.getElementById("city").value;   // تتأكد انه الـ input id="city"
  let key = "672f5f292a59b243360303502fd101a1"; 

  // هذا السطر كان زائد، شلته
  // (`https://api.openweathermap.org/...`);

  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&units=metric`
  );

  let data = await response.json();
  console.log(data);
   let temp = data.main.temp;
   

  let iconCode = data.weather[0].icon; // مثال: "04d"

  // رابط الصورة الرسمي من موقع OpenWeather
  let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
   document.getElementById("temp1").innerText = `${temp}°C`;
  document.getElementById("icon").innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;
  // ممكن تعرض النتيجة عالصفحة بدل ما تضلها بالكونسول
  document.getElementById("result").innerText =
    `City: ${data.name}, Temp: ${data.main.temp}°C , and the sky is: ${data.weather[0].description}`;  ;
  if (temp <= 0) {
    document.body.style.background = "linear-gradient(to bottom, #5e5e5f, rgba(173, 216, 230, 0.5))"; 
    document.getElementById("advise").innerText = ("its cold try to wear warm clothes") ; 
    document.getElementById("brand1").style.color = "rgba(173, 216, 230, 0.5)"; // lightblue شفاف
} else if (temp > 0 && temp <= 15) {
    document.body.style.background = "linear-gradient(to bottom, #5e5e5f, rgba(135, 206, 235, 0.5))";  
    document.getElementById("advise").innerText = ("its goodwether ") ;  // skyblue شفاف
     document.getElementById("brand1").style.color = "rgba(135, 206, 235, 0.5)";
} else if (temp > 15 && temp <= 25) {
    document.body.style.background = "linear-gradient(to bottom, #5e5e5f, rgba(144, 238, 144, 0.5))";
    document.getElementById("advise").innerText = ("its goodwether") ; 
     document.getElementById("brand1").style.color = " rgba(144, 238, 144, 0.5)";   // lightgreen شفاف
} else if (temp > 25 && temp <= 35) {
    document.body.style.background = "linear-gradient(to bottom, #5e5e5f, rgba(255, 165, 0, 0.5))";     // orange شفاف
    document.getElementById("advise").innerText = ("its hot try to whear good colthes") ; 
     document.getElementById("brand1").style.color = "rgba(255, 165, 0, 0.5)";
     

} else {
    document.body.style.background = "linear-gradient(to bottom, #5e5e5f, rgba(255, 0, 0, 0.5))";  
    document.getElementById("advise").innerText = ("its very hot try to whear nothing") ; 
     document.getElementById("brand1").style.color = " rgba(255, 0, 0, 0.5)";     // red شفاف
}
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundAttachment = "fixed"; // يبقي الخلفية ثابتة عند السحب

}

let cities = [];

// تحميل ملف المدن من GitHub
async function loadCities() {
  let response = await fetch("https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json");
  cities = await response.json();
}
loadCities();

// البحث عن المدن عند كتابة المستخدم
document.getElementById("city").addEventListener("input", function() {
  let query = this.value.trim().toLowerCase();
  let results = document.getElementById("results");
  results.innerHTML = "";

  if(query.length === 0) return;

  let matched = cities.filter(city => city.name.toLowerCase().startsWith(query)).slice(0, 10);
  matched.forEach(city => {
    let li = document.createElement("li");
    li.textContent = `${city.name}, ${city.country}`;
    li.addEventListener("click", () => {
      document.getElementById("city").value = city.name;
      results.innerHTML = "";
    });
    results.appendChild(li);
  });
});
