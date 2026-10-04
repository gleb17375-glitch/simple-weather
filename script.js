const getData = async (cityName) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json()
    // const result = await response.json();
    // console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

const changeText = (text) => {
  const elem = document.getElementById("title");
  elem.innerText = text
}

const initSeachElement = () => {
    const searchBar = document.getElementById("searchBar");
    searchBar.addEventListener("click", () => {
        searchBar.children[0].focus()
    })
    searchBar.addEventListener("submit", (e) => {
        e.preventDefault();
        getData(searchBar.children[0].value).then((response) => {
            if (!response) {alert("Что-то пошло не так!"); return;}
            if (!response.results) {alert("Город не найден."); return;}
            changeText(response.results[0]?.name)
        })
    })
}


const main = () => {
    

    initSeachElement()
}

main()