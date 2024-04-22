export function translateWeatherCode(code) {
  const codeTranslations = {
    200: "Hafif yağmurlu gök gürültülü fırtına",
    201: "Yağmurlu gök gürültülü fırtına",
    202: "Şiddetli yağmurlu gök gürültülü fırtına",
    210: "Hafif gök gürültülü fırtına",
    211: "Gök gürültülü fırtına",
    212: "Şiddetli gök gürültülü fırtına",
    221: "Düzensiz gök gürültülü fırtına",
    230: "Hafif çiseleyen gök gürültülü fırtına",
    231: "Çiseleyen gök gürültülü fırtına",
    232: "Şiddetli çiseleyen gök gürültülü fırtına",
    300: "Hafif şiddette çiseleme",
    301: "Çiseleme",
    302: "Şiddetli çiseleme",
    310: "Hafif çiseli yağmur",
    311: "Çiseli yağmur",
    312: "Şiddetli çiseli yağmur",
    313: "Sağanak yağmur ve çiseleme",
    314: "Şiddetli sağanak yağmur ve çiseleme",
    321: "Sağanak çiseleme",
    500: "Hafif yağmur",
    501: "Orta şiddetli yağmur",
    502: "Şiddetli yağmur",
    503: "Çok şiddetli yağmur",
    504: "Aşırı yağmur",
    511: "Dondurucu yağmur",
    520: "Hafif sağanak yağmur",
    521: "Sağanak yağmur",
    522: "Şiddetli sağanak yağmur",
    531: "Düzensiz sağanak yağmur",
    600: "Hafif kar",
    601: "Kar",
    602: "Yoğun kar",
    611: "Karla karışık yağmur",
    612: "Hafif karla karışık sağanak",
    613: "Karla karışık sağanak",
    615: "Hafif yağmur ve kar",
    616: "Yağmur ve kar",
    620: "Hafif kar sağanağı",
    621: "Kar sağanağı",
    622: "Yoğun kar sağanağı",
    701: "Sis",
    711: "Duman",
    721: "Pus",
    731: "Kum/rüzgar tufanı",
    741: "Sis",
    751: "Kum",
    761: "Toz",
    762: "Volkanik kül",
    771: "Fırtına",
    781: "Tornado",
    800: "Açık gökyüzü",
    801: "Az bulutlu",
    802: "Dağınık bulutlu",
    803: "Parçalı bulutlu",
    804: "Kapalı bulutlu",
  };

  return codeTranslations[code] || "Bilinmeyen hava durumu";
}
export function formatDateAndDay(timestamp) {
  const days = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];
  const date = new Date(timestamp * 1000);

  const day = days[date.getDay()];
  const formattedDate = date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return {
    formattedDate,
    day,
  };
}
export function formatTime(unixTimestamp, timezoneOffsetInSeconds) {
  // Unix zaman damgasını ve zaman dilimi farkını kullanarak Date nesnesi oluştur
  const date = new Date((unixTimestamp + timezoneOffsetInSeconds) * 1000);

  // Saati ve dakikayı elde et
  const hours = date.getUTCHours(); // UTC saati kullan
  const minutes = date.getUTCMinutes(); // UTC dakikayı kullan

  // Saat ve dakikayı iki basamaklı formatla
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  // Saat ve dakikayı "HH:MM" formatında birleştir
  return `${formattedHours}:${formattedMinutes}`;
}
