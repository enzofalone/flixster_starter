## Week 1 Assignment: Flixster

Submitted by: **Enzo Falone**

Estimated time spent: **10** hours spent in total

Deployed Application: [Flixster Deployed Site](https://enzofalone.github.io/flixster_starter/)

### Application Features

#### CORE FEATURES

- [x] User can view a list of current movies from The Movie Database API as a grid view
  - The grid element should have an id of `movies-grid`
  - Each movie wrapper element should have a class of `movie-card`
- [x] For each movie displayed, user can see the following details:
  - Title - the element should have a class of `movie-title`
  - Image - the `img` element should have a class of `movie-poster`
  - Votes - the element should have a class of `movie-votes`
- [x] User can load more current movies by clicking a button at the bottom of the list
  - The button should have an id of `load-more-movies-btn`.
  - When clicked, the page should not refresh.
  - New movies should simply be added to the bottom
- [x] Allow users to search for movies and display them in a grid view
  - There should be a search input element with an id of `search-input`
  - Users should be able to type into the input
  - When a user hits 'Enter', it should send a search request to the movies API
  - The results from the search should be displayed on the page
  - There should be a close icon with an id of `close-search-btn` that exits the search, clears results, and shows the current movies displayed previously
- [x] Website accounts for basic HTML/CSS accessibility features
- [x] Website should be responsive

#### STRETCH FEATURES

- [x] Deploy website using GitHub Pages. 
- [x] Allow user to view more details about a movie within a popup.
- [x] Improve the user experience through CSS & animation.
- [x] Allow movie video trailers to be played using [embedded YouTube](https://support.google.com/youtube/answer/171780?hl=en)
- [x] "Go to top" button implemented
- [x] "End of page" alert if the user request retrieves no movies or if reached to the end of the page
- [x] Added a design to movie popup (rating stars, dimmed background image using the backdrop image of each movie)
- [x] Placeholder image for API results that do not contain a poster
- [x] Star rating system in popup where it fills the stars based on whats given by API

### Walkthrough Video

<img src="https://github.com/enzofalone/flixster_starter/blob/main/Animation.gif" width="860px" height="640px">

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

I had a long time since I practiced my skills in web development; however, this week really helped me to refresh my knowledge and learn more about async functions and promises and to always learn little but important things about web development in general. Additionally, explanations were exceptional and at lab 3 and this project I did not need to look up more information about making API requests as I learned a lot. I did not know how important were the parameters and paths in API request links and how did they work and I would have realized it in a really later stage in my career if it was not for these topic lessons.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
I would have done an infinite scrolling feature which did not work at first but have different approaches in mind. I would as well created a more robust top navigation bar with the use of the wide variety of API GET requests available by MovieDB, and a close approach to checkboxes to alter parameters (language, +PG18 movies) of queries

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

I put a lot of after-hours into creating the YouTube embed as I know I would encounter a problem; however, it took a lot of time to get through it as I wanted to do all the stretch features. Nevertheless, I would have focused in adding more features per se but wanted to make the actual required features as polished as possible which is the main goal of the projects.

I loved the wide use of the MovieDB API and how robust my peers made the website look. Next time I would love to sacrifice the minimalistic design I like to always implement in my webpages to have more risky design choices that for turned out to be excellent!

### Open-source libraries used

- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [FontAwesome](https://fontawesome.com/)

### Shout out

As always shout out to instructor Doug giving really good explanations for us all and making everything as clear and simple as possible for us to keep working in our projects.

Huge shout out to TA Snigdha as she helped me to troubleshoot why my YouTube embed was not working with a detailed explanation of the ongoing problem, and TA Tatiana that made sure I had no problems constantly and helped me to search for resources in order to solve the problems I was encountering to help by hinting solutions and where to look!
