const getData = async () => {
  const url = "https://geocoding-api.open-meteo.com/v1/search?name=Berlin";
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

function changeText(text) {
  const elem = document.getElementById("title");
  elem.innerText = text
}

const main = () => {
    getData().then((response) => {
        if (!response) return;
        changeText(response.results[0]?.name)
    })
}

main()