import React from 'react';
import { toast, Toaster } from 'react-hot-toast';

function ToastComponent({ t, text, status }) {

    return (
        <>
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    }  z-50 dark:bg-gray-900 bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 dark:ring-white ring-black ring-opacity-5`}
            >
                <div className="p-4">
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900">
                            {status === "success" ? (
                                "✅"
                            ) : status === "error" ? (
                                "❌"
                            ) : null}
                        </p>

                        <p className="text-sm dark:text-white text-gray-900">
                            {text}
                        </p>
                    </div>
                </div>
                <div className="flex border-l border-gray-200">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium dark:text-white text-gray-900 "
                    >
                        Kapat
                    </button>
                </div>
            </div>

        </>

    )
}
function Alert(status, text) {
    toast.custom((t) => (
        <ToastComponent t={t} text={text} status={status} />
    ))
}

export default Alert