const express  = require('express');
const cheerio  = require('cheerio');
const notifier = require('node-notifier');
const request  = require('request');
const CronJob    = require('cron').CronJob;

var job = new CronJob({
  cronTime: '0 */45 * * * *',
  onTick: function() {
  	request('http://timesofindia.indiatimes.com', function (error, response, html) {
		if (!error && response.statusCode == 200) {
			console.log('Fetching latest news from Times of India');
 			var $ 		   = cheerio.load(html); //loading hrml content through cheerio
    		var ulList     = $('.list9').text(); //this ullist string contains list of latest news
   			var listArray  = ulList.split("\n"); //converting ulList string to array
    		var cleanArray = listArray.filter(function(e){ return e.replace(/(\r\n|\n|\r)/gm,"")}); //remove empty elements from news list array 
			//To dispaly notification in ubuntu
			notifier.notify({
    			title   : 'Latest News',
     			message : cleanArray[0],  //Fetching lastest news
				sound   : true, // Only Notification Center or Windows Toasters 
  				wait    : false // Wait with callback, until user action is taken against notification 
  			});
	    }
	}); 
  },
  start: false
});

job.start(); //cron for fetching lastest news every 45 minutes