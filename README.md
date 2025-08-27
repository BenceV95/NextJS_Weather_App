# NextJS_Weather_App
A simple weather app using nextjs, tailwind and openweathermap api.

# Requirements:
- [x] Create, Scaffold NextJS project
- [x] Based on geolocation display weather(if i understand correctly???)
- [x] Display weather info on /city/
- [x] readme.md about how to run it and other info
- [x] Error handling
- [x] Loading states
- [x] Search bar
- [x] Max 3 hrs

# Notes
- Started 16:00 - 19:00
- #1 commit: Scaffolded and added footer, i should be able to start working now
- #2 commit: Ok, so i have managed to read up on the api, tested it , got it working and a very basic weather app is now functioning.
However there is still plenty to do and unfortionally i have spent way to much time on this to figure out the api. at around half time now
- #3 commit: /city/{name} added and refactored code into seperate folders like types and fetching, new component for weather data display
- #4 commit: tiding up a bit
- #5 commit: added search
- #6 commit: added automatic weather fetching on geo access.
I think this should be it for the MVP.

# General notes
- Site is not ugly , is user and mobile friendly. 
    Obviosly this could be improved but the purpose was to demo my skills.
- 3 simple ways to test functionality: search budapest, search anything, go to /city/{name}
- loading and error handling added, test with search for "asdqwe123"
- only basic weather data is displayed, but it is trivial to add more


# How to run?
0. ```git clone https://github.com/BenceV95/NextJS_Weather_App.git```
1. Create a .env.local file in /weather-app with "NEXT_PUBLIC_OPENWEATHER_API_KEY=" and insert your api key
2. run ```npm install```
3. run ```npm run dev```
4. that should be it