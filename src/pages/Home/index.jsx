import { Fragment, useEffect, useState } from 'react'
import background from '~/assets/images/background.jpg';
import { fetchCities, fetchCountries } from '~/services/CountryService'
import Alert from '~/Layout/Alert';
import { Menu, Transition, Dialog } from '@headlessui/react';
import { Link } from 'react-router-dom';
import mountain from '~/assets/images/mountain.jpg'
import { fetchWeatherForCities } from '~/services/weather/WeatherService';
import { nanoid } from 'nanoid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation'

function Home() {

  const [open, setOpen] = useState(false)


  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [localCities, setLocalCities] = useState(JSON.parse(localStorage.getItem("cities")) || []);

  useEffect(() => {
    const getcities = async () => {
      const weatherData = await fetchWeatherForCities(localCities);
      setLocalCities(weatherData);
    };

    getcities();
  }, []);

  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const countryData = await fetchCountries();
      const sortedCountryData = countryData.sort((a, b) => {

        const countryA = a.country.toLowerCase();
        const countryB = b.country.toLowerCase();

        if (countryA < countryB) return -1;
        if (countryA > countryB) return 1;

        return 0;
      });

      setCountries(sortedCountryData);
      setLoadingCountries(false);
    };

    fetchData();
  }, []);

  const handleCountryChange = async (e) => {
    setLoadingCities(true);
    setSelectedCity('1')

    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);

    const cityData = await fetchCities(selectedCountry);


    // const sortedCityData = cityData.sort((a, b) => {

    //   const cityA = a.toLowerCase();
    //   const cityB = b.toLowerCase();

    //   if (cityA < cityB) return -1;
    //   if (cityA > cityB) return 1;
    //   return 0;
    // });

    setCities(cityData);
    setSelectedCity('')
    setLoadingCities(false);
  };
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };



  const saveCity = async () => {
    if (!selectedCountry) {
      Alert("error", "Lütfen bir ülke seçiniz.");
      return;
    }

    if (!selectedCity) {
      Alert("error", "Lütfen bir şehir seçiniz.");
      return;
    }

    const newCity = { id: nanoid(), name: selectedCity, country: selectedCountry };

    const newCityData = await fetchWeatherForCities([newCity]);

    if (newCityData && newCityData.length > 0) {
      newCity.cityId = newCityData[0].cityId;

      const storedCities = JSON.parse(localStorage.getItem('cities')) || [];
      const updatedCities = [...storedCities, newCity];

      localStorage.setItem('cities', JSON.stringify(updatedCities));
      setLocalCities(prevCities => [...prevCities, ...newCityData]);

      setSelectedCity('');
      setSelectedCountry('');
      setOpen(false);
      Alert("success", "Şehir başarıyla kaydedildi.");
    } else {

      Alert("error", "Hava durumu verisi alınamadı, lütfen daha sonra tekrar deneyin.");
    }
  };


  const removeCity = (id) => {
    const storedCities = JSON.parse(localStorage.getItem('cities')) || [];

    const updatedCities = storedCities.filter(city => city.id !== id);

    localStorage.setItem('cities', JSON.stringify(updatedCities));
    setLocalCities(prevCities => prevCities.filter(city => city.id !== id));

    Alert("success", "Şehir başarıyla kaldırıldı.");
  };





  return (
    <div className='flex-auto'>

      <div style={{ backgroundImage: `url(${background})` }} className="w-100 h-[400px] bg-[cover] bg-[center] bg-blend-overlay">
        <div className="container px-3 mx-auto flex flex-col justify-center gap-4 text-white h-full">
          <div className='text-3xl font-bold'>Şehir seçerek hava durumunu öğrenebilirsiniz</div>
          <div className='text-xl font-medium'>Şehrini seç ve hava durumunu öğrenebilirsiniz</div>
          <button onClick={() => setOpen(true)} className='bg-white dark:bg-blue-800 dark:text-white text-black px-3 py-1 rounded-md w-fit hover:bg-blue-950 hover:text-white duration-300 transition-colors'>+ Şehir Ekle</button>
        </div>
      </div>
      <div className="container mx-auto px-4 text-2xl mt-6 mb-2 dark:text-white">
        Şehirlere Ait Anlık Hava Durumları
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 right-0 h-full top-0 ">
            <div className="flex min-h-full h-full w-screen max-w-[450px] items-end justify-center text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-x-full"
                enterTo="opacity-100 translate-x-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-full"

              >
                <Dialog.Panel className="relative transform p-8 h-full w-full flex flex-col justify-between dark:text-white overflow-hidden rounded-md bg-white dark:bg-gray-900 text-left shadow-xl transition-all">
                  <div>
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 mt-1 text-gray-900 dark:text-white">
                      Şehir Ekle
                    </Dialog.Title>
                    <label className='font-medium mt-7 block' htmlFor="country">Ülke</label>
                    <select
                      name="country"
                      id="country"
                      className="mt-2 border w-full rounded p-[0.35rem] dark:bg-gray-900"
                      onChange={handleCountryChange}
                      value={selectedCountry}
                    >
                      <option value="" disabled>Ülke Seçin</option>
                      {!loadingCountries &&
                        countries.map((country) => (
                          <option key={country.country} value={country.iso2}>
                            {country.country}
                          </option>
                        ))
                      }
                    </select>


                    <label className='font-medium mt-7 block' htmlFor="city">Şehir</label>
                    <select
                      name="city"
                      id="city"
                      className='mt-2 border w-full rounded p-[0.35rem] dark:bg-gray-900'
                      onChange={handleCityChange}
                      value={selectedCity}
                      disabled={loadingCities || cities.length === 0}
                    >
                      <option value="" disabled>Şehir Seçin</option>
                      <option value="1" disabled className='hidden'>Yükleniyor...</option>
                      {!loadingCities &&
                        cities.map(city => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="flex w-full justify-between">

                    <button
                      type="button"
                      className="inline-flex justify-center items-center gap-x-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
                      onClick={() => setOpen(false)}
                    >
                      <span>
                        <svg width="15" height="15" viewBox="0 0 32 32">
                          <path fill='currentColor' d="M17.769 16l9.016-9.016c0.226-0.226 0.366-0.539 0.366-0.884 0-0.691-0.56-1.251-1.251-1.251-0.346 0-0.658 0.14-0.885 0.367v0l-9.015 9.015-9.016-9.015c-0.226-0.226-0.539-0.366-0.884-0.366-0.69 0-1.25 0.56-1.25 1.25 0 0.345 0.14 0.658 0.366 0.884v0l9.015 9.016-9.015 9.015c-0.227 0.226-0.367 0.539-0.367 0.885 0 0.691 0.56 1.251 1.251 1.251 0.345 0 0.658-0.14 0.884-0.366v0l9.016-9.016 9.015 9.016c0.227 0.228 0.541 0.369 0.888 0.369 0.691 0 1.251-0.56 1.251-1.251 0-0.347-0.141-0.661-0.369-0.887l-0-0z"></path>
                        </svg>
                      </span>
                      <span>Çıkış</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center items-center gap-x-2 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500"
                      onClick={() => saveCity()}
                    >
                      <span>
                        <svg width="15" height="15" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z"></path>
                        </svg>
                      </span>
                      <span>Kaydet</span>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>



      <div className="container px-4 mx-auto mb-6  dark:text-white flex gap-x-4 py-4">
        <div className="w-full overflow-hidden relative">

          <Swiper
            slidesPerView="1"
            spaceBetween="0"
            grabCursor
            modules={[Navigation]}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 3
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
              1535: {
                slidesPerView: 5,
              },
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}

          >
            {localCities && localCities.length > 0 && localCities.map((city, index) => (
              <SwiperSlide key={city.id} style={{ padding: "10px 0" }}>
                <div style={{ backgroundImage: `url(${mountain}` }} className="flex-shrink-0 w-64 h-72 bg-[center] bg-[cover] rounded-2xl text-white shadow-sm dark:shadow-gray-200 shadow-black">

                  <div className="flex w-full h-full justify-between items-center flex-col relative p-4">
                    <div className='absolute right-3 top-3'>

                      <Menu as="div" className="relative inline-block text-left">
                        <div>
                          <Menu.Button className="text-gray-950 inline-flex items-center justify-center w-7 h-7 text-sm font-medium rounded-md hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                            <svg className='w-6 h-6' viewBox="-2.4 -2.4 28.80 28.80" fill="currentColor">
                              <path d="M14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5Z"></path>
                              <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"></path>
                              <path d="M12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z" />
                            </svg>

                          </Menu.Button>
                        </div>
                        <Transition
                          as="div"
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                            <Menu.Item>
                              <Link
                                to={"sehir/" + city.cityId}
                                className="hover:bg-gray-800 justify-end hover:text-white transition-colors text-gray-900 group flex w-full items-center gap-x-1 rounded-t-md p-2 text-sm"
                              >
                                Görüntüle
                                <svg viewBox="0 0 512 512" fill="currentColor" width="22" height="22">
                                  <path d="M212.969,278.609c15.938-44.594,56.344-76.75,103.688-82.141c-15.469-44.016-57.375-75.5-106.656-75.5 c-62.438,0-113.109,50.594-113.109,113.047c0,29.781,11.531,56.859,30.375,77.078c21.672-20.156,50.734-32.547,82.672-32.547 C210.938,278.547,211.906,278.609,212.969,278.609z"></path>
                                  <rect x="193.516" y="24.047" width="32.938" height="63.406"></rect>
                                  <polygon points="117.984,118.734 73.156,73.906 49.859,97.188 94.688,142.031 "></polygon>
                                  <rect y="217.563" width="63.406" height="32.938"></rect>
                                  <path d="M49.859,370.844l23.266,23.328l17.578-17.594c2.766-14.109,7.969-27.344,15.219-39.266l-11.266-11.266 L49.859,370.844z"></path>
                                  <polygon points="370.125,97.188 346.813,73.891 302,118.734 325.281,142.031 "></polygon>
                                  <path d="M422.578,304.344c-9.234-42.828-47.281-74.922-92.859-74.922c-46.063,0-84.438,32.75-93.156,76.25 c-5.156-0.891-10.438-1.453-15.844-1.453c-50.75,0-91.875,41.125-91.875,91.859c0,50.75,41.125,91.875,91.875,91.875 c43.359,0,156.75,0,199.406,0c50.75,0,91.875-41.125,91.875-91.875C512,346.156,472.188,305.641,422.578,304.344z"></path>
                                </svg>

                              </Link>
                            </Menu.Item>
                            <Menu.Item>
                              <button
                                onClick={() => removeCity(city.id)}
                                className="hover:bg-gray-800 justify-end hover:text-white transition-colors text-gray-900 group flex w-full items-center gap-x-1 rounded-b-md p-2 text-sm"
                              >
                                Şehri Kaldır
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M10.3094 2.25002H13.6908C13.9072 2.24988 14.0957 2.24976 14.2737 2.27819C14.977 2.39049 15.5856 2.82915 15.9146 3.46084C15.9978 3.62073 16.0573 3.79961 16.1256 4.00494L16.2373 4.33984C16.2562 4.39653 16.2616 4.41258 16.2661 4.42522C16.4413 4.90933 16.8953 5.23659 17.4099 5.24964C17.4235 5.24998 17.44 5.25004 17.5001 5.25004H20.5001C20.9143 5.25004 21.2501 5.58582 21.2501 6.00004C21.2501 6.41425 20.9143 6.75004 20.5001 6.75004H3.5C3.08579 6.75004 2.75 6.41425 2.75 6.00004C2.75 5.58582 3.08579 5.25004 3.5 5.25004H6.50008C6.56013 5.25004 6.5767 5.24998 6.59023 5.24964C7.10488 5.23659 7.55891 4.90936 7.73402 4.42524C7.73863 4.41251 7.74392 4.39681 7.76291 4.33984L7.87452 4.00496C7.94281 3.79964 8.00233 3.62073 8.08559 3.46084C8.41453 2.82915 9.02313 2.39049 9.72643 2.27819C9.90445 2.24976 10.093 2.24988 10.3094 2.25002ZM9.00815 5.25004C9.05966 5.14902 9.10531 5.04404 9.14458 4.93548C9.1565 4.90251 9.1682 4.86742 9.18322 4.82234L9.28302 4.52292C9.37419 4.24941 9.39519 4.19363 9.41601 4.15364C9.52566 3.94307 9.72853 3.79686 9.96296 3.75942C10.0075 3.75231 10.067 3.75004 10.3553 3.75004H13.6448C13.9331 3.75004 13.9927 3.75231 14.0372 3.75942C14.2716 3.79686 14.4745 3.94307 14.5842 4.15364C14.605 4.19363 14.626 4.2494 14.7171 4.52292L14.8169 4.82216L14.8556 4.9355C14.8949 5.04405 14.9405 5.14902 14.992 5.25004H9.00815Z" />
                                  <path d="M5.91509 8.45015C5.88754 8.03685 5.53016 7.72415 5.11686 7.7517C4.70357 7.77925 4.39086 8.13663 4.41841 8.54993L4.88186 15.5017C4.96736 16.7844 5.03642 17.8205 5.19839 18.6336C5.36679 19.4789 5.65321 20.185 6.2448 20.7385C6.8364 21.2919 7.55995 21.5308 8.4146 21.6425C9.23662 21.7501 10.275 21.7501 11.5606 21.75H12.4395C13.7251 21.7501 14.7635 21.7501 15.5856 21.6425C16.4402 21.5308 17.1638 21.2919 17.7554 20.7385C18.347 20.185 18.6334 19.4789 18.8018 18.6336C18.9638 17.8206 19.0328 16.7844 19.1183 15.5017L19.5818 8.54993C19.6093 8.13663 19.2966 7.77925 18.8833 7.7517C18.47 7.72415 18.1126 8.03685 18.0851 8.45015L17.6251 15.3493C17.5353 16.6971 17.4713 17.6349 17.3307 18.3406C17.1943 19.025 17.004 19.3873 16.7306 19.6431C16.4572 19.8989 16.083 20.0647 15.391 20.1552C14.6776 20.2485 13.7376 20.25 12.3868 20.25H11.6134C10.2626 20.25 9.32255 20.2485 8.60915 20.1552C7.91715 20.0647 7.54299 19.8989 7.26958 19.6431C6.99617 19.3873 6.80583 19.025 6.66948 18.3406C6.52892 17.6349 6.46489 16.6971 6.37503 15.3493L5.91509 8.45015Z" />
                                  <path d="M9.42546 10.2538C9.83762 10.2125 10.2052 10.5133 10.2464 10.9254L10.7464 15.9254C10.7876 16.3376 10.4869 16.7051 10.0747 16.7463C9.66256 16.7875 9.29503 16.4868 9.25381 16.0747L8.75381 11.0747C8.7126 10.6625 9.01331 10.295 9.42546 10.2538Z" />
                                  <path d="M14.5747 10.2538C14.9869 10.295 15.2876 10.6625 15.2464 11.0747L14.7464 16.0747C14.7052 16.4868 14.3376 16.7875 13.9255 16.7463C13.5133 16.7051 13.2126 16.3376 13.2538 15.9254L13.7538 10.9254C13.795 10.5133 14.1626 10.2125 14.5747 10.2538Z" />
                                </svg>
                              </button>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                    <div className='text-center mt-1'>
                      <div className="">{city.day}</div>
                      <div className="text-lg font-bold">{city.date}</div>
                      <div className="text-sm font-semibold">{city.hours}</div>
                    </div>

                    <div className="flex justify-center items-center flex-col mb-2 ">
                      <img className="w-[4.5rem] h-[4.5rem]" src={city.icon} alt="" />

                      <div className="text-center mt-1">

                        <div className="text-lg relative inline-flex">
                          <div className="absolute -right-8 -top-1 bg-orange-500 px-[0.30rem] py-[0.1rem] rounded-md text-xs">{city.country}</div>
                          {city.name}
                        </div>
                        <div className="text-sm">{city.status}</div>
                      </div>
                    </div>
                    <div className="bg-gray-400 text-sm flex gap-x-1 justify-between text-center bg-opacity-40 rounded-md w-full p-1">
                      <div className="flex flex-col w-1/3 items-center justify-center">
                        <div>Sıcaklık</div>
                        <div className='text-xs font-bold'>{city.currentTemp} °C</div>
                      </div>
                      <div className="flex flex-col w-1/3 items-center justify-center">
                        <div>Hissedilen</div>
                        <div className='text-xs font-bold'>{city.feelTemp} °C</div>
                      </div>
                      <div className="flex flex-col w-1/3 items-center justify-center">
                        <div>Nem</div>
                        <div className='text-xs font-bold'>{city.humidity} %</div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-button-prev dark:!text-white !text-gray-950"></div>
          <div className="swiper-button-next dark:!text-white !text-gray-950"></div>
        </div>
      </div>
    </div>

  )

}


export default Home