import React, { useState } from "react";

const api = {
 key: "75b2f9dc3d7b7d43751180b266c8335e",
 base: "http://api.openweathermap.org/data/2.5/",
};

export const App = () => {
 const [query, setQuery] = useState("");
 const [weather, setWeather] = useState({});
 const [arkaPlan, setArkaPlan] = useState("")
 const [hata, setHata] = useState(false)

 const search = (evt) => {
  if (evt.key === "Enter") {
   fetch(api.base + "weather?q=" + query + "&appid=" + api.key)
    .then((res) => res.json())
    .then((result) => {
     setWeather(result);
     setArkaPlan(result.weather[0].main)
     setQuery("");
     setHata(true)
     console.log(result);
    })
    .catch((error) => {
      console.log(error)
      setHata(false)
    })
  }
 };

 const dateBuilder = (d) => {
  let months = [
   "Ocak",
   "Şubat",
   "Mart",
   "Nisan",
   "Mayıs",
   "Haziran",
   "Temmuz",
   "Ağustos",
   "Eylül",
   "Ekim",
   "Kasım",
   "Aralık",
  ];
  let days = [
   "Pazartesi",
   "Salı",
   "Çarşamba",
   "Perşembe",
   "Cuma",
   "Cumartesi",
   "Pazar",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return date + " " + month + " " + year + " - " + day;
 };

 const samco = () => {
   if(arkaPlan === "Thunderstorm")
   {
     return 'app thunder'
   }
   else if(arkaPlan === "Drizzle"){
    return 'app drizzle'
   }
   else if(arkaPlan === "Rain"){
    return 'app rain'
   }
   else if(arkaPlan === "Snow"){
    return 'app snow'
   }
   else if(arkaPlan === "Atmosphere"){
    return 'app atmosphere'
   }
   else if(arkaPlan === "Clear"){
    return 'app clear'
   }
   else if(arkaPlan === "Clouds"){
    return 'app clouds'
   }else{
     return 'app not'
   }
 }

 return (
  <div className={((typeof weather.main != "undefined") || (hata)) ? samco() : 'app not'}>
   <main>
    <div className="search-box">
     <input
      type="text"
      className="search-bar"
      placeholder="Search..."
      onChange={(e) => setQuery(e.target.value)}
      value={query}
      onKeyDown={search}
     />
    </div>
    {typeof weather.main != "undefined" ? (
     <div>
      <div className="location-box">
       <div className="location">
        {weather.name}, {weather.sys.country}
       </div>
       <div className="date">{dateBuilder(new Date())}</div>
      </div>
      <div className="weather-box">
        <div className="temp">{Math.round(weather.main.temp - 273.15)}°C</div> 
       <div className="weather">{arkaPlan}</div>
      </div>
     </div>
    ) : (
     ""
    )}
   </main>
  </div>
 );
};