/*
	Parsing list of pairs from https://coinmarketcap.com/ru/exchanges/binance/

	~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
	Author - TeoWay
	License - CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)
	Site - http://TeoWay.com
	Repository - https://gitlab.com/TeoWay/
	~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
*/

var URL = 'https://coinmarketcap.com/ru/exchanges/binance/'

var needle = require('needle')
var fs = require('fs')
var cheerio = require ('cheerio')

needle.get(URL, function(err, res){
	if (err) throw err
	fs.writeFileSync("R-coinmarketcap_binance_pairs_list.txt")
	console.log(res.statusCode)
	console.log('----------------')
	
	var $ = cheerio.load(res.body)
	var elem = $('#exchange-markets tbody tr')
	
	elem.each(function(){
		console.log('----------------')
		var out = $(this).text().replace(/\n/gi, ' ')
		out = out.replace(/,/gi,' ')
		console.log(out)
		console.log('----------------')
		
		fs.appendFileSync("R-coinmarketcap_binance_pairs_list.txt", out)
		fs.appendFileSync("R-coinmarketcap_binance_pairs_list.txt", "\n")
	})
})
