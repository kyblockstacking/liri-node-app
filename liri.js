require("dotenv").config();
var Spotify = require("node-spotify-api")
var moment = require("moment");
var request = require("request");
var api = require("./keys");
var spotify = new Spotify(api.spotify);

switch (process.argv[2]) {
    case "concert-this":
        // User input
        var artist = process.argv.slice(3);
        // Query URL for bandsintown
        request('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp', function (error, response, data) {
            if (error) {
                return console.log(error);
            }

            var data = JSON.parse(data);
            var venueName = data[0].venue.name;
            var venueLocation = data[0].venue.city + ", " + data[0].venue.region;
            var eventDate = data[0].datetime;
            eventDate.split('');
            var month = eventDate.slice(5, 7);
            var day = eventDate.slice(8, 10);
            var year = eventDate.slice(0, 4);
            // Display to user
            console.log("Venue name: " + venueName);
            console.log("Venue location: " + venueLocation);
            console.log("Date of event: " + month + "/" + day + "/" + year);
        });

    case "spotify-this-song":
        // User input
        var songName = process.argv.slice(3);

        var spotify = new Spotify({
            id: '018a592b2a7e4e55a133d871bd8a6fda',
            secret: '8cb7143c95a944fb806a5779c3d81a4a'
        });
        // Query URL for spotify
        spotify.search({ type: 'track', query: songName, limit: 1 }, function (error, data) {
            if (error) {
                return console.log(error);
            }
            var artist = data.tracks.items[0].artists[0].name
            var previewLink = data.tracks.items[0].preview_url
            var album = data.tracks.items[0].album.name
            // Display to user
            console.log("Song name: " + songName);
            console.log("Artist: " + artist);
            console.log("Preview link: " + previewLink)
            console.log("Album: " + album)
        });

    case "movie-this":
        // User input
        var search = process.argv.slice(3);
        if (search === "") {
            var search = "Mr. Nobody"
        };
        // Query URL for OMDB
        request("http://www.omdbapi.com/?apikey=trilogy&t=" + search, function (error, response, data) {
            // if (error) {
            //     return console.log(error);
            // }
            var data = JSON.parse(data);
            var title = data.Title;
            var year = data.Year;
            var IMDB_rating = data.Rated;
            var RottenTomatoes_rating = data.Ratings[1].Value;
            var country = data.Country;
            var language = data.Language;
            var plot = data.Plot;
            var actors = data.Actors;
            // Display to user
            console.log("Title: " + title);
            console.log("Year: " + year);
            console.log("IMDB rating: " + IMDB_rating);
            console.log("Rotten Tomatoes rating: " + RottenTomatoes_rating);
            console.log("Country: " + country);
            console.log("Language: " + language);
            console.log("Plot: " + plot);
            console.log("Actors: " + actors);
        });
    case "do-what-it-says":
        var fs = require("fs")
        fs.readFile("./random.txt", "utf8", function(error, data) {
            if(error) {
                throw error;
            }
            var spotThis = data.slice(0, 17);
            var songName2 = data.slice(19, data.length -1);
        })
}