var friends = require("../data/friends.js");
var path = require("path");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {

        var friendMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        console.log(req.friends);

        // Here we take the result of the users survey and parse it.
        var userData = req.body;
        var userScores = userData.scores;

        console.log(userScores);

        // Calculating difference between users scores and scores of each use in database
        var totalDifference = 0;

        // Looping through all friends in the database.
        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i]);
            totalDifference = 0;

            // Looping through similarities and differences
            for (var j = 0; j < friends.length; j++) {

                // Calculating differecne between scores and summing them into totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                // If the sum of differences is less than the difference of the current friend match
                if (totalDiffenece <= friendMatch.friendDifference) {

                    // Reset the friend match to be the new friend
                    friendMatch.name = friends[i].name;
                    friendMatch.photo = friends[i].photo;
                    friendMatch.friendDifference = totalDifference;

                }
            }
        }

        // Push users data to the database
        friends.push(userData);

        // Return a json with the users friend match. (To be used by the HTML in the next page)
        res.json(friendMatch);
    });
}