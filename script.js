const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json()
  } catch (error) {
    console.error(error.message);
  }
}

const changeText = (text) => {
  const elem = document.getElementById("title");
  elem.innerText = text
}

const changeCard = (time, temprature) => {
    const timeElem = document.getElementById("time");
    const tempratureElem = document.getElementById("temprature");
    timeElem.innerText = time
    tempratureElem.innerText = temprature
}

const makeRequests = async () => {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${searchBar.children[0].value}`;
    const cityResponse = await getData(geoUrl)
    if (!cityResponse) {alert("Что-то пошло не так! (Поиск города)"); return;}
    if (!cityResponse.results) {alert("Город не найден."); return;}
    changeText(cityResponse.results[0]?.name)
    console.log(cityResponse.results)

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${cityResponse.results[0].latitude}&longitude=${cityResponse.results[0].longitude}&current=temperature_2m`
    const geoResponce = await getData(weatherUrl)
    if (!geoResponce) 
      {alert("Что-то пошло не так! (Получение данных о погоде)"); return;}
    const temprature = geoResponce.current.temperature_2m + geoResponce.current_units.temperature_2m
    const time = new Date(Date.parse(geoResponce.current.time))
    changeCard(time.toTimeString().slice(0, 5), temprature)
}

const initSeachElement = () => {
    const searchBar = document.getElementById("searchBar");
    const searchIcon = document.getElementById("searchIcon");
    searchBar.addEventListener("click", () => {
        searchBar.children[0].focus()
    })
    searchBar.addEventListener("submit", (e) => {
        e.preventDefault();
        makeRequests();
    })
    searchIcon.addEventListener("click", () => {
      searchBar.dispatchEvent(new Event('submit'))
    })
}


const main = () => {
    

    initSeachElement()
}

main()