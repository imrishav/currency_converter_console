const axios = require('axios')

const getExchange = async (from, to) => {
    try {
        const response = await axios.get(`https://api.exchangeratesapi.io/latest?base=${from}`)
       const rate = res.data.rates[to]
        if (rate) {
            return rate
        } else {
            throw new Error();
        }

    } catch (e) {

        throw new Error(`Unable to get Exhange rate for ${from}`)
        
    }


    
        
}

const getCoutries = async (countryCode)=>{
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${countryCode}`)
                      return countries.data.map((country) => country.name)
    } catch (e) {
        throw new Error(`Unable to get Countries ${countryCode}`)    
    }

    
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
}).catch((e)=>console.log(e.message))