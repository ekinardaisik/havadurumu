import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import mountain from '~/assets/images/mountain.jpg'

function InfoModal({ isOpen, setIsOpen, data, city }) {

    function closeModal() {
        setIsOpen(false);
    }
    function formatDateToTR(dateString) {
        const dateParts = dateString.split(".");
        const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

        const formattedDate = date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long'
        });

        return formattedDate;
    }
    return (
        <>


            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="max-w-2xl w-full transform overflow-hidden rounded-2xl dark:text-white text-gray-900 dark:bg-gray-950 bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-extralight flex justify-between items-center leading-6 "
                                    >
                                        <div className='leading-8'>{city}&nbsp;<span className='font-semibold'>{data.date ? formatDateToTR(data.date) : ""}</span>&nbsp;için Hava&nbsp;Durumu&nbsp;Bilgisi</div>
                                        <button className='h-12 w-12 dark:hover:bg-white dark:hover:text-gray-950 hover:text-white rounded-md hover:bg-gray-950 transition-colors inline-flex justify-center items-center' onClick={closeModal}>
                                            <svg width="17" height="17" viewBox="0 0 32 32">
                                                <path fill='currentColor' d="M17.769 16l9.016-9.016c0.226-0.226 0.366-0.539 0.366-0.884 0-0.691-0.56-1.251-1.251-1.251-0.346 0-0.658 0.14-0.885 0.367v0l-9.015 9.015-9.016-9.015c-0.226-0.226-0.539-0.366-0.884-0.366-0.69 0-1.25 0.56-1.25 1.25 0 0.345 0.14 0.658 0.366 0.884v0l9.015 9.016-9.015 9.015c-0.227 0.226-0.367 0.539-0.367 0.885 0 0.691 0.56 1.251 1.251 1.251 0.345 0 0.658-0.14 0.884-0.366v0l9.016-9.016 9.015 9.016c0.227 0.228 0.541 0.369 0.888 0.369 0.691 0 1.251-0.56 1.251-1.251 0-0.347-0.141-0.661-0.369-0.887l-0-0z"></path>
                                            </svg>
                                        </button>
                                    </Dialog.Title>
                                    <div className='flex md:flex-row flex-col items-center my-6 gap-5'>
                                        <div style={{ backgroundImage: `url(${mountain}` }} className="cursor-pointer flex-shrink-0 w-80 h-80 bg-[center] bg-[cover] rounded-2xl text-white shadow-sm dark:shadow-gray-200 shadow-black">

                                            <div className="flex w-full h-full justify-between items-center flex-col relative p-4">

                                                <div className='text-center mt-2'>
                                                    <div className="">{data.day}</div>
                                                    <div className="text-lg font-bold">{data.date}</div>
                                                </div>

                                                <div className="flex justify-center items-center flex-col mb-2">
                                                    <img className="w-20 h-20" src={data.icon} alt="" />

                                                    <div className="text-center">

                                                        <div className="text-lg">{city}</div>
                                                        <div className="text-xl">{data.status}</div>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-400 text-sm flex gap-x-1 justify-between text-center bg-opacity-60 rounded-t-md w-full p-1">
                                                    <div className="flex flex-col w-1/3 items-center justify-center">
                                                        <div>Sıcaklık</div>
                                                        <div className='text-xs font-bold'>{data.tempDay} °C</div>
                                                    </div>
                                                    <div className="flex flex-col w-1/3 items-center justify-center">
                                                        <div>Hissedilen</div>
                                                        <div className='text-xs font-bold'>{data.tempFeel} °C</div>
                                                    </div>
                                                    <div className="flex flex-col w-1/3 items-center justify-center">
                                                        <div>Nem</div>
                                                        <div className='text-xs font-bold'>{data.humidity} %</div>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-400 text-sm flex gap-x-1 justify-between text-center bg-opacity-60 rounded-b-md w-full p-1">
                                                    <div className="flex flex-col w-1/2 items-center justify-center">
                                                        <div>En Düşük</div>
                                                        <div className='text-xs font-bold'>{data.tempMin} °C</div>
                                                    </div>
                                                    <div className="flex flex-col w-1/2 items-center justify-center">
                                                        <div>En Yüksek</div>
                                                        <div className='text-xs font-bold'>{data.tempMax} °C</div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex w-80 h-80 stroke-white flex-col justify-between">
                                            <div className='flex gap-x-6'>
                                                <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
                                                    <path d="M9.50929 4.66667C9.8755 4.2575 10.4077 4 11 4C12.1046 4 13 4.89543 13 6C13 7.10457 12.1046 8 11 8H2.00002M12.5093 19.3333C12.8755 19.7425 13.4077 20 14 20C15.1046 20 16 19.1046 16 18C16 16.8954 15.1046 16 14 16H2.00002M16.7639 7C17.3132 6.38625 18.1115 6 19 6C20.6569 6 22 7.34315 22 9C22 10.6569 20.6569 12 19 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div className='flex flex-col gap-y-2'>
                                                    <span className='text-lg font-light'>Rüzgar</span>
                                                    <span className='text-lg font-semibold'>Hız: {data.windSpeed} km/h</span>
                                                    <span className='text-lg font-semibold'>Yön: {data.windDeg} °</span>
                                                </div>
                                            </div>

                                            <div className='flex gap-x-6'>
                                                <svg viewBox="0 0 24 24" width="64" height="64">
                                                    <path d="M6,17,5,19m5-2L8,21m6-4-1,2m5-2-2,4" fill="none" stroke="currentColor" strokeLinecap=" round" strokeLinejoin=" round" strokeWidth=" 2" />
                                                    <path d="M21,9a4,4,0,0,1-4,4H6A3,3,0,1,1,7.08,7.21a5,5,0,0,1,9-2.09A4.08,4.08,0,0,1,17,5,4,4,0,0,1,21,9Z" fill="none" stroke=" currentColor" strokeLinecap=" round" strokeLinejoin=" round" strokeWidth=" 2" />
                                                </svg>
                                                <div className='flex flex-col gap-y-2'>
                                                    <span className='text-lg font-light'>Yağmur</span>
                                                    <span className='text-lg font-semibold'>Yüzde: {data.rain} %</span>
                                                </div>
                                            </div>

                                            <div className='flex gap-x-6'>

                                                <svg fill="currentColor" height="64" width="64" viewBox="0 0 485 485">
                                                    <path d="M485,214.04c0-39.199-28.706-71.819-66.201-77.947c-11.772-51.31-57.695-88.639-111.478-88.639 c-48.103,0-90.978,30.346-107.367,74.864c-55.911,12.776-100.346,57.227-112.082,114.524C38.375,243.191,0,285.59,0,336.783 c0,55.561,45.202,100.763,100.763,100.763h264.601c55.561,0,100.763-45.202,100.763-100.763c0-20.852-6.369-40.242-17.261-56.334 C471.077,266.202,485,241.528,485,214.04z M307.322,77.454c42.764,0,78.789,31.97,83.798,74.366l1.564,13.24h13.332 c27.01,0,48.984,21.973,48.984,48.98c0,18.897-10.598,35.657-27.05,43.832c-14.023-11.145-31.071-18.641-49.695-21.031 c-13.858-67.654-73.302-117.397-143.4-118.233C249.82,93.616,277.171,77.454,307.322,77.454z M365.364,407.546H100.763 C61.744,407.546,30,375.802,30,336.783s31.746-70.763,70.768-70.763H114.1l1.564-13.24c7.018-59.399,57.489-104.191,117.399-104.191 s110.381,44.792,117.399,104.191l1.564,13.24h13.332c39.021,0,70.768,31.744,70.768,70.763S404.383,407.546,365.364,407.546z" />
                                                </svg>
                                                <div className='flex flex-col gap-y-2'>
                                                    <span className='text-lg font-light'>Bulut</span>
                                                    <span className='text-lg font-semibold'>Yüzde: {data.cloud} %</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
export default InfoModal