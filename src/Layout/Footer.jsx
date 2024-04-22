function Footer() {
    return (
        <div className="shrink-0 border-t dark:border-white border-black">
            <div className="container px-3 flex-col md:flex-row mx-auto py-4 flex items-center justify-between dark:text-white">
                <div className="py-1">Hava Durumu Sorgulama © {new Date().getFullYear()} </div>
                <div className="py-1">Tüm Hakları Saklıdır</div>
            </div>
        </div>
    )
}

export default Footer