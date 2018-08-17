const axios = require('axios')

const getExchange = (from, to) => {
   return axios.get(`https://api.exchangeratesapi.io/latest?base=${from}`)
        .then((res) => {
            return res.data.rates[to]
        })

}

const getCoutries = (countryCode)=>{
    return axios.get(`https://restcountries.eu/rest/v2/currency/${countryCode}`)
        .then((countries) => {
            return countries.data.map((country) => country.name)
        })
}

const convertCurrency = async (from, to, amount) =>{
    const countries = await getCoutries(to)
    const rate = await getExchange(from,to)
    const exchangeAmount = rate * amount

    return `${amount} ${from} is worth ${exchangeAmount} ${to}. ${to} can be used in the following 
    ${countries.join(', ')} `

}

convertCurrency('INR','USD',70).then((resp)=>{
    console.log(resp)
})