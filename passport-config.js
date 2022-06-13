// imports needed for making login work
const LocalStrategy = require("passport-local").Strategy;
const {db} = require("./database");
const bcrypt = require("bcrypt");

// creating function which check for user email and compare password , if eveything correct log user in other wise dispalyes error message
function initialize(passport) {
    console.log("Initialized");

    const authenticateUser = (email, password, done) => {
        console.log(email, password);
        // pool query to check user email
        db.all(
            `SELECT * FROM users WHERE Email = ?`,
            [email],
            (err, results) => {
                if (err) {
                    throw err;
                }
                console.log(results);

                if (results.length > 0) {
                    const user = results[0];
                    console.log(user)
                     // comparing user password                               
                    bcrypt.compare(password, user.Password, (err, isMatch) => {
                        if (err) {
                            console.log(err);
                        }
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            //password is incorrect
                            return done(null, false, { message: "Password is incorrect" });
                        }
                    });
                } else {
                    // No user
                    return done(null, false, {
                        message: "No user with that email address"
                    });
                }
            }
        );
    };
    // telling passport that the login is called in our html file
    passport.use(
        new LocalStrategy(
            { usernameField: "email", passwordField: "password" },
            authenticateUser
        )
    );
    // Stores user details inside session. serializeUser determines which data of the user
    // object should be stored in the session. 
    passport.serializeUser((user, done) => done(null, user.Id));

    // In deserializeUser that key is matched with the in  database or any data resource.
    // Used to destroy session cookie when user logs out

    passport.deserializeUser((Id, done) => {
        db.all(`Select * from users Where id = ?`, [Id], (err, results) => {
            if (err) {
                return done(err);
            }
            console.log(`ID is ${results[0].Id}`);
            return done(null, results[0].Id);
        });
    });
}

module.exports = initialize;