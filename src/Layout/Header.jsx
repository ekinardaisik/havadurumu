import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { pages } from '~/Router';
import { Link } from 'react-router-dom';

function Header() {

    const [open, setOpen] = useState(false);
    useEffect(() => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []); // Sadece bir kere çalışması için boş bağımlılık dizisi kullanıyoruz

    const darkMode = (theme) => {
        console.log(theme);
        localStorage.theme = theme;
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };
    return (
        <div className='shrink-0'>
            <div className="w-100 bg-blue-100 dark:bg-gray-900 py-5">
                <div className="container px-3 flex mx-auto justify-between items-center">
                    <Link to={"/"} className='font-bold dark:text-white'>Hava Durumu Sorgulama</Link>
                    <button onClick={() => setOpen(true)} className='bg-blue-950 dark:bg-white p-3 rounded-md'>
                        <div className="w-4 h-3 flex flex-col justify-between items-end">
                            <div className="w-full h-0.5 bg-white dark:bg-gray-900"></div>
                            <div className="w-2/3 h-0.5 bg-white dark:bg-gray-900"></div>
                            <div className="w-1/3 h-0.5 bg-white dark:bg-gray-900"></div>
                        </div>
                    </button>
                </div>
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

                    <div className="fixed  z-10 right-0 h-full top-0 ">
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
                                <Dialog.Panel className="relative transform p-5 h-full w-full flex flex-col items-end overflow-hidden rounded-md bg-white dark:bg-gray-900 shadow-xl transition-all">

                                    <Dialog.Title as="h3" className="w-full text-base flex justify-between items-center font-semibold leading-6 text-gray-900 dark:text-white">
                                        <span>Hava Durumu Sorgulama</span>
                                        <div className='inline-flex items-center'>
                                            <button className='p-2 dark:hidden inline-block' onClick={() => darkMode("dark")}>
                                                <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
                                                    <path className="fill-transparent" fillRule="evenodd" clipRule="evenodd" d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"></path>
                                                    <path className="fill-gray-900 dark:fill-gray-900" d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"></path>
                                                    <path className="fill-gray-900 dark:fill-gray-900" fillRule="evenodd" clipRule="evenodd" d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"></path>
                                                </svg>

                                            </button>
                                            <button className='p-2 hidden dark:inline-block' onClick={() => darkMode("light")}>
                                                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                                                    <path className="stroke-white dark:stroke-white" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                                                    <path className="stroke-white dark:stroke-white" d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"></path>
                                                </svg>
                                            </button>
                                            <button className='p-2' onClick={() => setOpen(false)}>
                                                <svg width="17" height="17" viewBox="0 0 32 32">
                                                    <path fill='currentColor' d="M17.769 16l9.016-9.016c0.226-0.226 0.366-0.539 0.366-0.884 0-0.691-0.56-1.251-1.251-1.251-0.346 0-0.658 0.14-0.885 0.367v0l-9.015 9.015-9.016-9.015c-0.226-0.226-0.539-0.366-0.884-0.366-0.69 0-1.25 0.56-1.25 1.25 0 0.345 0.14 0.658 0.366 0.884v0l9.015 9.016-9.015 9.015c-0.227 0.226-0.367 0.539-0.367 0.885 0 0.691 0.56 1.251 1.251 1.251 0.345 0 0.658-0.14 0.884-0.366v0l9.016-9.016 9.015 9.016c0.227 0.228 0.541 0.369 0.888 0.369 0.691 0 1.251-0.56 1.251-1.251 0-0.347-0.141-0.661-0.369-0.887l-0-0z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </Dialog.Title>
                                    <div className='w-full mt-7 flex flex-col text-gray-900 dark:text-white'>
                                        {pages && pages.map((page, index) =>
                                            page.title && (
                                                <Link onClick={() => setOpen(false)} to={page.path} key={index} className='my-4 border-b-sky-900 border-b-2 w-full text-right py-2'>
                                                    {page.title}
                                                </Link>
                                            )
                                        )}
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}

export default Header