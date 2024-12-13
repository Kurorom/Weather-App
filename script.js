const apiKey = "87cc6880a2a6f6f2232186bf2cef4797";
const apiUrl="https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkForcast(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    var data = await response.json();
    console.log(data) ;
    
    const today = new Date().toLocaleDateString('en-EN', { weekday: 'long' }) ;
    let tommorow = new Date();
    const year = new Date().getFullYear() ;
    const month = new Date().toLocaleDateString('default', { month: 'short' }) ;
    const day = new Date().toLocaleDateString('default', {day: 'numeric'});

    document.querySelector(".date-dayname").innerHTML = today;
    document.querySelector(".date-day").innerHTML = day+" "+month+" "+ year;

    document.querySelector(".location").innerHTML = data.city.name+","+data.city.country;

    document.querySelector(".weather-temp").innerHTML = Math.round(data.list[0].main.temp)+"°C";
    let status = data.list[0].weather[0].main ;
    document.querySelector(".weather-desc").innerHTML = data.list[0].weather[0].main ;
    document.querySelector(".weather-side").style.backgroundImage =  `url(images/${status}-bg.png)`;
    document.getElementById("humidity").innerHTML = data.list[0].main.humidity + "%";
    document.getElementById("wind").innerHTML = data.list[0].wind.speed + "kmh/h";

    /* days of the week list */
    for(let i = 1 ; i<7 ; i++){

    nextday = document.getElementById("day"+i);
    nexttemp = document.getElementById("temp"+i);
    nexticon = document.getElementById("icon"+i);
    tommorow.setDate(new Date().getDate()+i).toLocaleString ;

    nextday.innerHTML = tommorow.toLocaleDateString('en-EN', { weekday: 'short' });
    nexttemp.innerHTML = Math.round(data.list[i].main.temp)+"°C";
    nexticon.src = "images/"+data.list[i].weather[0].main+".png";
    
    }

    
 

}

searchBtn.addEventListener("click",()=>{
    checkForcast(searchBox.value);
})


checkForcast()