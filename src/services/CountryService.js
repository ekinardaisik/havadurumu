const BASE_URL = import.meta.env.VITE_COUNTRIES_API; 

export const fetchCountries = async () => {
  try {
    const response = await fetch(`${BASE_URL}/countries`);
    if (!response.ok) {
      throw new Error('Ülkeler yüklenirken bir hata oluştu.');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchCities = async (countryName) => {
  try {
    const response = await fetch(`${BASE_URL}/countries/cities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ iso2: countryName }),
    });
    if (!response.ok) {
      throw new Error(`${countryName} ülkesine ait şehirler yüklenirken bir hata oluştu.`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
