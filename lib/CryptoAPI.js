const axios = require('axios');
const colors = require('colors');

class CryptoAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.nomics.com/v1/currencies/ticker';
  }

  async getPriceData(coinOption, curOption) {
    try {
      //Currency Formatter
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: curOption
      })

      const res = await axios.get(`${this.baseURL}?key=${this.apiKey}&ids=${coinOption}&convert=${curOption}`);

      let output = '';

      res.data.forEach(coin => {
        output += `Coin: ${coin.symbol.yellow} (${coin.name.magenta}) | Price: ${formatter.format(coin.price).green} | Rank: ${coin.rank.blue} \n`;
      });

      return output;

    } catch (error) {
      handleAPIError(error);
    }
  }
}

function handleAPIError(error) {
  if (error.response.status === 401) {
    throw new Error('Your API key is invalid -- Go to https://nomics.com');
  } else if (error.response === 404) {
    throw new Error('Your API key is not responding');
  } else {
    throw new Error('Something might be broken')
  }
}

module.exports = CryptoAPI