# RTIMovieDemo
In the project directory, you can run:

**yarn start**

It will start the Metro Bundler


**Press a -- To run app in Android device**


**Press i -- To run app in IOS device**


**Press w --  To run app in Web**


To run the test cases:


**yarn test**


To get the test coverage:

**yarn test --coverage**


The app will reload if you make edits.
You will also see any lint errors in the console.

TO run the api succesfully, first you need to create a token This is also explained explicitly in the below API documentation.
https://developer.themoviedb.org/docs/image-basics

If you don’t already have an account, you will need to create one in order to request an API Key. 
In your request for a key, state that your usage will be for educational/non-commercial use. You will also need to provide some personal information to complete the request. Once you submit your request, you should receive your key via email shortly after. 

Once you generate your token, you need to place that token in MovieAPI.ts file under api/src folder like below.

**
headers: {
    Authorization: `Bearer ${"Put your API key here"}`,
},**

Once you follow these steps, that you will see the movie list

Learn More
You can learn more in the Create React App documentation.

To learn React, check out the React documentation.
