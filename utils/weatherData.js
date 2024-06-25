const request=require("request")

const weatherMap={
    BASE_URL:"https://api.openweathermap.org/data/2.5/weather?q=",
    SECURITY_KEY:"7c9a4ff1a84a0727fddad85f9b4d6597"
}

weatherData=(address,callback)=>{
    url=weatherMap.BASE_URL + encodeURIComponent(address) + "&APPID=" + weatherMap.SECURITY_KEY;
    console.log(url)
    request({url,json:true},(error,data)=>{
        if (error){
            callback(true,"Unable to fetch data please try again");
        }
        callback(false,data?.body);

    })

}

module.exports=weatherData;