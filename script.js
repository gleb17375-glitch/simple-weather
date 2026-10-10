const STORAGE_KEY = 'simple-weather-city';

const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
};

const getCityInput = () => document.getElementById('citySearch');

const saveCity = (city) => {
  if (!city) return;
  localStorage.setItem(STORAGE_KEY, city);
};

const loadSavedCity = () => {
  const cityInput = getCityInput();
  const savedCity = localStorage.getItem(STORAGE_KEY);

  if (!savedCity) return;

  cityInput.value = savedCity;
  makeRequests();
};

const changeText = (text) => {
  const elem = document.getElementById('title');
  elem.innerText = text;
};

const changeCard = (time, temprature) => {
  const timeElem = document.getElementById('time');
  const tempratureElem = document.getElementById('temprature');
  timeElem.innerText = time;
  tempratureElem.innerText = temprature;
};

const makeRequests = async () => {
  const cityInput = getCityInput();
  const cityName = cityInput.value.trim();

  if (!cityName) {
    alert('Введите город.');
    return;
  }

  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}`;
  const cityResponse = await getData(geoUrl);
  if (!cityResponse) {
    alert('Что-то пошло не так! (Поиск города)');
    return;
  }
  if (!cityResponse.results) {
    alert('Город не найден.');
    return;
  }

  saveCity(cityName);
  changeText(cityResponse.results[0]?.name);
  console.log(cityResponse.results);

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${cityResponse.results[0].latitude}&longitude=${cityResponse.results[0].longitude}&current=temperature_2m`;
  const geoResponse = await getData(weatherUrl);
  if (!geoResponse) {
    alert('Что-то пошло не так! (Получение данных о погоде)');
    return;
  }

  const temprature =
    geoResponse.current.temperature_2m +
    ' ' +
    geoResponse.current_units.temperature_2m;
  const time = new Date(Date.parse(geoResponse.current.time));
  changeCard(time.toTimeString().slice(0, 5), temprature);
};

const initSeachElement = () => {
  const searchBar = document.getElementById('searchBar');
  const searchIcon = document.getElementById('searchIcon');

  searchBar.addEventListener('click', () => {
    getCityInput().focus();
  });

  searchBar.addEventListener('submit', (e) => {
    e.preventDefault();
    makeRequests();
  });

  searchIcon.addEventListener('click', () => {
    searchBar.dispatchEvent(new Event('submit'));
  });
};

const main = () => {
  initSeachElement();
  loadSavedCity();
};

main();
