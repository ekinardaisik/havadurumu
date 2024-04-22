import background from '~/assets/images/background.jpg';
import mountain from '~/assets/images/mountain.jpg'
import { useParams } from 'react-router-dom';
import { fetchWeatherForWeek } from '~/services/weather/WeatherWeekService';
import { useEffect, useState } from 'react';
import { fetchWeatherForCities } from '~/services/weather/WeatherService';
import Alert from '~/Layout/Alert';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation'
import InfoModal from './InfoModal';

function City() {
    const { id } = useParams();
    const [localCities, setLocalCities] = useState(JSON.parse(localStorage.getItem("cities")) || []);
    const [city, setCity] = useState('');
    const [cityData, setCityData] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const updateCityWeather = async () => {
            const city = localCities.find(city => city.cityId == id);
            if (city) {
                const cityWeatherDataArray = await fetchWeatherForCities([city]);

                const cityWeatherData = cityWeatherDataArray[0];
                setCity(cityWeatherData)
                if (cityWeatherData && cityWeatherData.lat && cityWeatherData.lon) {
                    const cityData = await fetchWeatherForWeek(cityWeatherData.lat, cityWeatherData.lon);
                    setCityData(cityData);
                } else {
                    console.log("Latitude ve Longitude bilgisi bulunamadı.");
                }
            }
        };

        updateCityWeather();
    }, [id, localCities]);


    const removeCity = (id) => {
        const storedCities = JSON.parse(localStorage.getItem('cities')) || [];

        const updatedCities = storedCities.filter(city => city.id !== id);

        localStorage.setItem('cities', JSON.stringify(updatedCities));
        setLocalCities(prevCities => prevCities.filter(city => city.id !== id));

        Alert("success", "Şehir başarıyla kaldırıldı.");
        setTimeout(() => {
            navigate("/")
        }, 1500);
    };

    const openModal = (date) => {
        const data = cityData.find(city => city.date === date);
        if (data) {
            setModalData(data);
            setIsOpen(true);
        } else {
            Alert("error", "Hata, bilgi getirilemedi.");
        }
    }

    return (
        <>
            {
                city ? (
                    <div className="flex-auto">

                        <div style={{ backgroundImage: `url(${background})` }} className="w-100 h-[400px] bg-[cover] bg-[center] bg-blend-overlay">
                            <div className="container px-3 mx-auto flex flex-col justify-center gap-4 text-white h-full">
                                <div className='text-3xl font-bold'>{city.name}</div>
                                <div className='text-3xl font-medium'>İçin <b>7 Günlük</b> Hava Durumu</div>
                                <button onClick={() => removeCity(city.id)} className='bg-white dark:bg-blue-800 dark:text-white text-black px-3 py-1 rounded-md w-fit hover:bg-blue-950 hover:text-white duration-300 transition-colors'>Bu Şehri Kaldır</button>
                            </div>
                        </div>

                        <div className="container px-3 mx-auto items-center gap-y-7 flex-col my-8 dark:text-white flex gap-x-4 py-4">
                            <div className='w-full md:text-left text-center'>
                                <div className='text-xl'>
                                    Hava durumu detayları için kartların üstüne tıklayın.
                                </div>
                            </div>

                            <div className="w-full relative">


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
                                    {cityData && cityData.length > 0 && (


                                        <SwiperSlide key={0} style={{ padding: "10px 0" }}>
                                            <div onClick={() => openModal(cityData[0].date)} style={{ backgroundImage: `url(${mountain}` }} className="cursor-pointer flex-shrink-0 w-64 h-96 bg-[center] bg-[cover] rounded-2xl text-white shadow-sm dark:shadow-gray-200 shadow-black">

                                                <div className="flex w-full h-full justify-between items-center flex-col relative p-4">

                                                    <div className='text-center mt-2'>
                                                        <div className="">{cityData[0].day}</div>
                                                        <div className="text-lg font-bold">{cityData[0].date}</div>
                                                    </div>

                                                    <div className="flex justify-center items-center flex-col mb-4">
                                                        <img className="w-24 h-24" src={cityData[0].icon} alt="" />

                                                        <div className="text-center">

                                                            <div className="text-lg">{cityData[0].status}</div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-gray-400 text-sm flex gap-x-1 justify-between text-center bg-opacity-40 rounded-md w-full p-1">
                                                        <div className="flex flex-col w-1/3 items-center justify-center">
                                                            <div>Sıcaklık</div>
                                                            <div className='text-xs font-bold'>{cityData[0].tempDay} °C</div>
                                                        </div>
                                                        <div className="flex flex-col w-1/3 items-center justify-center">
                                                            <div>En Düşük</div>
                                                            <div className='text-xs font-bold'>{cityData[0].tempMin} °C</div>
                                                        </div>
                                                        <div className="flex flex-col w-1/3 items-center justify-center">
                                                            <div>En Yüksek</div>
                                                            <div className='text-xs font-bold'>{cityData[0].tempMax} °C</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )}
                                    {cityData && cityData.length > 0 && cityData.slice(1, 7).map((city, index) => (
                                        <SwiperSlide key={index} style={{ padding: "10px 0" }}>
                                            <div onClick={() => openModal(city.date)} style={{ backgroundImage: `url(${mountain}` }} className="cursor-pointer mx-auto md:mx-0 flex-shrink-0 w-64 h-72 bg-[center] bg-[cover] rounded-2xl text-white shadow-sm dark:shadow-gray-200 shadow-black">

                                                <div className="flex w-full h-full justify-between items-center flex-col relative p-4">

                                                    <div className='text-center mt-2'>
                                                        <div className="">{city.day}</div>
                                                        <div className="text-lg font-bold">{city.date}</div>
                                                    </div>

                                                    <div className="flex justify-center items-center flex-col mb-4">
                                                        <img className="w-24 h-24" src={city.icon} alt="" />

                                                        <div className="text-center">

                                                            <div className="text-lg">{city.status}</div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-gray-400 text-sm flex gap-x-1 justify-between text-center bg-opacity-40 rounded-md w-full p-1">
                                                        <div className="flex flex-col w-1/3 items-center justify-center">
                                                            <div>Sıcaklık</div>
                                                            <div className='text-xs font-bold'>{city.tempDay} °C</div>
                                                        </div>
                                                        <div className="flex flex-col w-1/3 items-center justify-center">
                                                            <div>En Düşük</div>
                                                            <div className='text-xs font-bold'>{city.tempMin} °C</div>
                                                        </div>
                                                        <div className="flex flex-col w-1/3 items-center justify-center">
                                                            <div>En Yüksek</div>
                                                            <div className='text-xs font-bold'>{city.tempMax} °C</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                <div className="swiper-button-prev 2xl:!-left-7 md:!-left-3 dark:!text-white !text-gray-950"></div>
                                <div className="swiper-button-next 2xl:!-right-7 md:!-right-3 dark:!text-white !text-gray-950"></div>
                            </div>

                        </div>
                    </div>

                ) : (
                    <div className='flex-auto items-center justify-center flex text-3xl dark:text-white'>
                        Şehir bulunamadı
                    </div>
                )
            }
            <InfoModal data={modalData} isOpen={isOpen} setIsOpen={setIsOpen} city={city.name} />
        </>
    )
}
export default City