const form = document.querySelector("section.top-banner form");
const input = document.querySelector(".container input");
const span = document.querySelector(".msg");
const cityList = document.querySelector(".ajax-section .cities");

localStorage.setItem("apiKey", "5367e2ce8b28efe3b520e745cd510df2");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherDataFromApi();
});

const getWeatherDataFromApi = async () => {
  let apiKey = localStorage.getItem("apiKey");
  // alert(apiKey);
  let inputVal = input.value;
  let unitType = "metric";
  let lang = "tr";

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=${unitType}&lang=${lang}`;

  // const response = await fetch(url).then(response =>response.json());
  try {
    const response = await axios(url);

    //obj destructuring
    const { main, name, sys, weather } = response.data;

    let iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    // console.log(response.data);
    //input.value = "";

    const cityListCards = cityList.querySelectorAll(".city");
    //nodeList => forEach()
    //array =>forEach(), map(), reduce(), filter()
    console.log("cityListCards", cityListCards);

    const cityListCardsArray = Array.from(cityListCards);
    console.log("cityListCardsArray", cityListCardsArray);

    //cityName control
    if (cityListCardsArray.length > 0) {
      const filteredArray = cityListCardsArray.filter(
        (cityCard) => cityCard.querySelector("span").innerText == name
      );
      if (filteredArray.length > 0) {
        span.innerText = `You already know the weather for ${name}, Please search for another city 😉`;
        setTimeout(() => {
          span.innerText = "";
        }, 5000);
        form.reset();
        return;
      }
    }
    // else{}
    const createdLi = document.createElement("li");
    createdLi.classList.add("city");
    createdLi.innerHTML = `
        <h2 class="city-name" data-name="${name}, ${sys.country}">
            <span>${name}</span>
            <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
            <img class="city-icon" src="${iconUrl}">
            <figcaption>${weather[0].description}</figcaption>
        </figure>
    `;
    //append vs.prepend
    cityList.prepend(createdLi);
  } catch (error) {
    span.innerText = "City not found!";
    setTimeout(() => {
      span.innerText = "";
    }, 5000);
  }
  form.reset();
};
