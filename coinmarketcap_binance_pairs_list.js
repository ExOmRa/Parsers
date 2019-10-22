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
	fs.writeFileSync("R-coinmarketcap_binance_pairs_list.txt", '')
	console.log(res.statusCode)
	console.log('----------------')
	
	var $ = cheerio.load(res.body)
	$('#exchange-markets tbody tr').each(function(){
		let Name = $(this).children('td').eq(1).text().replace(' ', '').replace(/\n/g, '')
		let Tokken = $(this).children('td').eq(2).text().replace(' ', '').replace(/\n/g, '')
		let Price = $(this).children('td').eq(4).text().replace(' ', '').replace(/\n/g, '')
		console.log (Name + ' - ' + Tokken + ' - ' + Price)
		console.log ('- - - - - - - - - - - - - - - -')
		
		fs.appendFileSync("R-coinmarketcap_binance_pairs_list.txt", 'Name:' + Name + ' - Tokken:' + Tokken + ' - Price:' + Price + "\n")
	})
})
