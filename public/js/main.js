const submitBtn = document.getElementById('submitbtn');
const city_name = document.getElementById('city_name');
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');

const getInfo = async(e) =>{
    e.preventDefault();
    let cityval = cityName.value;
    if(cityval === ""){
        city_name.innerText = `Please Enter City Name`;
        datahide.classList.add("data_hide");
    }else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&appid=7debc8041de175cd9b8fdbcf96150eae`
            const response = await fetch(url);
            const data = await response.json();
            const arr = [data];
            console.log(arr);
            city_name.innerHTML = `${arr[0].name} , ${arr[0].sys.country}`
            temp.innerText = arr[0].main.temp;
           // temp_status.innerText = arr[0].weather[0].main;
           const tempmood = arr[0].weather[0].main;
           datahide.classList.remove("data_hide");
           if(tempmood === "Clear"){
               temp_status.innerHTML = "<i class='fas fa-sun'></i>";
           }else if(tempmood === "Clouds"){
            temp_status.innerHTML = "<i class='fas fa-cloud'></i>";
           }else if(tempmood === "Rain"){
            temp_status.innerHTML = "<i class='fas fa-cloud-rain'></i>";
           }else{
            temp_status.innerHTML = "<i class='fas fa-sun'></i>";
           }
           
        }catch{
            city_name.innerText = `Please Enter a Valid Name`;
            datahide.classList.add("data_hide");
        }

    }
}

submitBtn.addEventListener('click', getInfo)