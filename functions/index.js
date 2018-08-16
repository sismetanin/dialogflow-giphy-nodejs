// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues

'use strict';

const GIPHY_API_KEY = 'API_KEY';

const SEARCH_RESULTS_MORE = [
    'Вот ещё пара гифок!',
    'Надеюсь, эти тебе тоже понравятся.',
    'На, лови еще парочку. Если что, у меня ещё есть.'
];

const SEARCH_RESULTS = [
    'Хе-хе, сейчас покажу мои любимые.',
    'Лови, отличная подборка гифок.',
    'Смотри, что я нашел!'
];

// Import the Dialogflow module from the Actions on Google client library.
const { dialogflow, BrowseCarouselItem, BrowseCarousel, Suggestions, Image } = require('actions-on-google');
// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');
// Import the request-promise package for network requests.
const request = require('request-promise');

// Instantiate the Dialogflow client.
const app = dialogflow({ debug: true });

function getCarouselItems(data) {
    var carouselItems = [];
    data.slice(0, 10).forEach(function (gif) {
        carouselItems.push(new BrowseCarouselItem({
            title: gif.title || gif.id,
            url: gif.url,
            image: new Image({
                url: gif.images.downsized_medium.url,
                alt: gif.title || gif.id
            }),
        }));
    });
    return carouselItems;
}

function search(conv, query, offset) {
    // Send the GET request to GIPHY API.
    return request({
        method: 'GET',
        uri: 'https://api.giphy.com/v1/gifs/search',
        qs: {
            "api_key": GIPHY_API_KEY,
            'q': query,
            'limit': 10,
            'offset': offset,
            'lang': 'ru'
        },
        json: true,
        resolveWithFullResponse: true,
    }).then(function (responce) {
        // Handle the API call success. 
        console.log(responce.statusCode + ': ' + responce.statusMessage);
        console.log(JSON.stringify(responce.body));
        // Obtain carousel items from the API call response.
        var carouselItems = getCarouselItems(responce.body.data);
        // Validate items count.
        if (carouselItems.length <= 10 && carouselItems.length >= 2) {
            conv.data.query = query;
            conv.data.offset = responce.body.pagination.count + responce.body.pagination.offset;
            conv.data.paginationCount = conv.data.paginationCount || 0;
            conv.data.searchCount = conv.data.searchCount || 0;
            // Show successful response.
            if (offset == 0) {
                conv.ask(SEARCH_RESULTS[conv.data.searchCount % SEARCH_RESULTS.length]);
                conv.data.searchCount++;
            } else {
                conv.ask(SEARCH_RESULTS_MORE[conv.data.paginationCount % SEARCH_RESULTS_MORE.length]);
                conv.data.paginationCount++;
            }
            conv.ask(new BrowseCarousel({ items: carouselItems }));
            conv.ask(new Suggestions(`Ещё`));
        } else {
            // Show alternative response.
            conv.ask('Ничего не смог найти по такому запросу, может поищем что-то другое?)');
        }
    }).catch(function (error) {
        // Handle the API call failure. 
        console.log(error);
        conv.ask('Извини, кажется альбом с гифками потерялся.');
    });
}
// Handle the Dialogflow intent named 'Search Intent'.
// The intent collects a parameter named 'query'.
app.intent('Search Intent', (conv, { query }) => {
    return search(conv, query, 0);
});

// Handle the Dialogflow intent named 'Search Intent - more'.
app.intent('Search Intent - more', (conv) => {
    // Load more gifs from the privious search query
    return search(conv, conv.data.query, conv.data.offset);
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);