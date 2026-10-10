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
    return null;
  }
};

const getCityInput = () => document.getElementById('citySearch');

const saveCity = (city) => {
  if (!city) return;
  localStorage.setItem(STORAGE_KEY, city);
};

const getSavedCity = () => localStorage.getItem(STORAGE_KEY);

const setTitle = (text) => {
  const elem = document.getElementById('title');
  if (elem) {
    elem.textContent = text;
  }
};

const setWeatherCard = (time, temperature) => {
  const timeElem = document.getElementById('time');
  const temperatureElem = document.getElementById('temperature');

  if (timeElem) {
    timeElem.textContent = time;
  }

  if (temperatureElem) {
    temperatureElem.textContent = temperature;
  }
};

const createWeatherSummary = (weatherResponse) => {
  const { current, current_units } = weatherResponse;

  const temperature = `${current.temperature_2m} ${current_units.temperature_2m}`;
  const time = new Date(Date.parse(current.time)).toTimeString().slice(0, 5);

  return { time, temperature };
};

const loadSavedCity = () => {
  const cityInput = getCityInput();
  const savedCity = getSavedCity();

  if (!savedCity || !cityInput) return;

  cityInput.value = savedCity;
  handleSearch();
};

const handleSearch = async () => {
  const cityInput = getCityInput();
  const cityName = cityInput?.value.trim();

  if (!cityName) {
    alert('Введите город.');
    return;
  }

  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}`;
  const cityResponse = await getData(geoUrl);

  if (!cityResponse || !cityResponse.results?.length) {
    alert(cityResponse ? 'Город не найден.' : 'Что-то пошло не так! (Поиск города)');
    return;
  }

  const city = cityResponse.results[0];
  saveCity(cityName);
  setTitle(city.name);

  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast?` +
    `latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m`;

  const weatherResponse = await getData(weatherUrl);

  if (!weatherResponse) {
    alert('Что-то пошло не так! (Получение данных о погоде)');
    return;
  }

  const { time, temperature } = createWeatherSummary(weatherResponse);
  setWeatherCard(time, temperature);
};

const initSearchElement = () => {
  const searchBar = document.getElementById('searchBar');
  const searchIcon = document.getElementById('searchIcon');

  if (!searchBar || !searchIcon) return;

  searchBar.addEventListener('submit', (event) => {
    event.preventDefault();
    handleSearch();
  });

  searchBar.addEventListener('click', () => {
    getCityInput()?.focus();
  });

  searchIcon.addEventListener('click', () => {
    searchBar.dispatchEvent(new Event('submit'));
  });

  searchIcon.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      searchBar.dispatchEvent(new Event('submit'));
    }
  });
};

const initApp = () => {
  initSearchElement();
  loadSavedCity();
};

initApp();
