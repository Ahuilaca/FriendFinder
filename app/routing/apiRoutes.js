var friends = require('../data/friends.js');

module.exports = function (app) {

    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function (req, res) {

        // Looping through friends
        var friendMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        // Parsing user input
        var userData = req.body;
        var userScores = userData.scores;

        // Calculating difference between user scores and possible friends
        var totalDifference = 0;

        // Looping through friends data to get scores
        for (var i = 0; i < friends.length - 1; i++) {
            console.log(friends[i].name);
            totalDifference = 0;

            // Looping through friend scores and user scores. Calculating differences.
            for (var j = 0; j < 10; j++) {

                // Calculate differences and adding to totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                // If differences in scores is less then the differences of the current friend match.
                if (totalDifference <= friendMatch.friendDifference) {

                    // Closest match becomes new friend. 
                    friendMatch.name = friends[i].name;
                    friendMatch.photo = friends[i].photo;
                    friendMatch.friendDifference = totalDifference;
                }
            }
        }

        // Pushing user data to the database
        friends.push(userData);

        res.json(friendMatch);
    });
};