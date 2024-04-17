# README

This is a mock checkout flow for the bounce fullstack challenge

I decided to go with a ruby on rails app with a react frontend

To get the app up and running follow these steps/ run these commands in the terminal:

* install ruby 3.0.6 ( I usually use rbenv to manage my ruby versions)
    * brew install rbenv
    * rbenv install 3.0.6
    * rbenv local 3.0.6
    * add this to your shell profile: eval "$(rbenv init -)" and restart the terminal 
    * ruby -v should return 3.0.6

* gem install bundler:2.5.9

* bundle install (you might need to do brew install libpq first for pg dependancies)

* gem install rails

* brew install postgresql

* start postgres. To have it as a background service run: brew services start postgresql@14

* rake db:create 
* rake db:migrate

* rails server (If everything went well the app should be running)

* Open a diferent terminal tab and navigate to bounce-react dir inside the project

* brew install npm

* npm install

* npm start -> it will try to start in localhost:3000 but since the other server is already running on this port press Y to start it in 3001

* You can now open localhost:3001 to use the app

To have a request returning an error create a booking with no email

The modal that shows up when you successfully place a booking closes if you click anywhere on the screen.

The booking schema is simplified, considering what the app is about I believe it should in it's most basic form also have a date and duration, if the 
model is to sell rental blocks of 24h it would have the starting time, and an amount of days.

The items to store would probably have a separate table since you probably have diferent pricings regarding item size so it could have the parcel_id (parcel being the aggregation of items)

The pricing would probably be geographical so a table with prices per region or something similar would also make sense.

I've never delt with payment systems before so I don't really know the business logic on it, all my previous systems forced you to top off your account and then everything was managed with the balance.

I guess it can work in two ways. When it's not time sensitive you make a request to the payment api to validate the supplied details, they verify they are valid you create a booking associated with that transaction and then you
complete the payment asynchronously. Or you only want to create the booking once the payment transaction is completed and then you only finish the booking once it is successful.

This logic was completly ignored in this exercise.

Styling and UI was also disregarded.

The only action altered from the bookings controller is the create. You can view the created bookings tho by accessing localhost:3000/api/v1/bookings or checking the database directly

