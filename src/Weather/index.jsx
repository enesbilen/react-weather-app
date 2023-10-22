import React, { useEffect, useState } from "react";
import { fetchData } from "../Api"; // Api dosyasını içe aktarın

function Weather() {
  const [city, setCity] = useState("Türkiye"); // Başlangıç şehir değeri ayarlayın
  const [weatherData, setWeatherData] = useState(null);
  const [image, setImage] = useState("/images/clear.png"); // Başlangıçta varsayılan bir resim ayarlayın

  const handleInputChange = (e) => {
    setCity(e.target.value); // İnput değerini güncelleyin
  };

  const handleFetchData = async () => {
    try {
      // Şehir adını fetchData fonksiyonuna iletmek için kullanın
      const data = await fetchData(city);
      setWeatherData(data);
      updateWeatherImage(data); // Hava durumuna göre resmi güncelle
    } catch (error) {
      console.error("API isteği başarısız: ", error);
    }
  };

  const updateWeatherImage = (data) => {
    const weatherMain = data.weather[0].main;
    let newImage = "/images/default.png";

    switch (weatherMain) {
      case "Clear":
        newImage = "/images/clear.png";
        break;
      case "Rain":
        newImage = "/images/rain.png";
        break;
      case "Snow":
        newImage = "/images/snow.png";
        break;
      case "Clouds":
        newImage = "/images/cloud.png";
        break;
      case "Mist":
        newImage = "/images/mist.png";
        break;
      case "Haze":
        newImage = "/images/haze.png";
        break;
      // Diğer hava durumları için de gerekli durumları ekleyebilirsiniz.
    }

    setImage(newImage);
  };

  useEffect(() => {
    async function fetchDataFromApi() {
      try {
        const data = await fetchData(city); // city değişkenini kullanarak API isteği yapın
        setWeatherData(data);
        updateWeatherImage(data); // Hava durumuna göre resmi güncelle
      } catch (error) {
        console.error("API isteği başarısız: ", error);
      }
    }

    fetchDataFromApi();
  }, [city]); // useEffect'i sadece city değiştiğinde çağır

  return (
    <div className=" flex items-center justify-center min-h-screen flex-col">
      {weatherData ? (
        <div className="w-[400px] bg-[#00000045] backdrop-blur-md p-10 rounded-xl border-2 border-blue-200 ">
          <div className="relative w-full h-[55px] flex items-center">
            <div className="absolute left-3">
              <svg viewBox="0 0 24 24" width={28} height={28}>
                <path
                  fill="#fff"
                  d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"
                />
              </svg>
            </div>
            <input
              className=" absolute uppercase bg-transparent text-white rounded border-2 border-blue-200 w-full h-full py-2 px-11"
              type="text"
              placeholder="KONUM GİRİN"
              value={city}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div className="flex items-center justify-center flex-col">
              <img src={image} alt="" className="w-[60%] object-cover my-6" />
              <p className="text-[64px] text-[#fff] font-bold leading-snug ">
                {weatherData.main.temp}°C
              </p>
              <p className="text-2xl text-[#fff] font-bold uppercase">
                {weatherData.weather[0].description}
              </p>
            </div>
            <div className="flex items-center justify-between mt-8">
              <div className="text-[#fff] text-bold flex items-center">
                <div>
                  <svg viewBox="0 0 24 24" height={56} width={56}>
                    <path
                      fill="currentColor"
                      d="M9.019 15.404c-.194 0-.335-.121-.422-.364-.087-.242-.131-.61-.131-1.102s.044-.858.131-1.097c.087-.238.228-.358.422-.358.372 0 .558.485.558 1.454 0 .979-.186 1.467-.558 1.467zm5.957.477c-.194 0-.335.119-.422.358-.087.239-.131.604-.131 1.097s.044.86.131 1.102c.087.242.228.364.422.364.372 0 .558-.489.558-1.466 0-.97-.186-1.455-.558-1.455zm5.024.194c0 4.378-3.579 7.925-8 7.925-4.421 0-8-3.547-8-7.925 0-5.887 5.667-7.117 8-16.075 2.333 8.958 8 10.188 8 16.075zm-10.993.533c.667 0 1.173-.224 1.518-.672.345-.448.518-1.118.518-2.01 0-.853-.175-1.51-.526-1.969-.351-.46-.854-.689-1.51-.689-1.338 0-2.007.886-2.007 2.659 0 .869.174 1.533.524 1.992.349.46.843.689 1.483.689zm6.038-5.218h-1.396l-4.718 8.505h1.396l4.718-8.505zm1.955 5.934c0-.853-.176-1.51-.527-1.969-.351-.46-.854-.689-1.51-.689-1.338 0-2.007.886-2.007 2.658 0 .865.174 1.527.523 1.987.35.459.845.689 1.485.689.667 0 1.173-.224 1.518-.672.345-.448.518-1.116.518-2.004z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[22px]">{weatherData.main.humidity}%</p>
                  <p className="text-[14px]">Nem</p>
                </div>
              </div>
              <div className="text-[#fff] text-bold flex items-center">
                <div>
                  <svg width={56} height={56} viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M18 20c0-1.656-1.344-3-3-3h-15v2h15c.552 0 1 .448 1 1s-.448 1-1 1c-.403 0-.747-.242-.905-.587l-1.749.956c.499.965 1.494 1.631 2.654 1.631 1.656 0 3-1.344 3-3zm1.014-7.655c.082-.753.712-1.345 1.486-1.345.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5h-20.5v2h20.5c1.932 0 3.5-1.568 3.5-3.5s-1.568-3.5-3.5-3.5c-1.624 0-2.977 1.116-3.372 2.617l1.886.728zm-11.014-9.345c3.213 0 3.367 3.293 3.185 4.281.977-.036 2.815.22 2.815 2.052 0 1.004-.869 1.667-1.854 1.667h-8.312c-.985 0-1.834-.663-1.834-1.667 0-1.818 1.779-2.116 2.815-2.052-.08-.901-.134-4.281 3.185-4.281zm0-2c-2.671 0-4.845 2.093-4.986 4.729-1.713.307-3.014 1.803-3.014 3.604 0 2.024 1.642 3.667 3.667 3.667h8.666c2.025 0 3.667-1.643 3.667-3.667 0-1.801-1.301-3.297-3.014-3.604-.141-2.636-2.315-4.729-4.986-4.729z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-[22px]">
                    {parseInt(weatherData.wind.speed)} Km/h
                  </p>
                  <p className="text-[14px]">Rüzgar Hızı</p>
                </div>
              </div>
            </div>

            {/* Diğer verileri de görüntülemek için uygun HTML elementlerini ekleyebilirsiniz */}
          </div>
        </div>
      ) : (
        <div>Yükleniyor...</div>
      )}
    </div>
  );
}

export default Weather;
