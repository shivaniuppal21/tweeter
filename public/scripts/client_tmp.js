/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
    const data = [
        {
          "user": {
            "name": "Newton",
            "avatars": "https://i.imgur.com/73hZDYK.png"
            ,
            "handle": "@SirIsaac"
          },
          "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
          },
          "created_at": 1461116232227
        },
        {
          "user": {
            "name": "Descartes",
            "avatars": "https://i.imgur.com/nlhLi3I.png",
            "handle": "@rd" },
          "content": {
            "text": "Je pense , donc je suis"
          },
          "created_at": 1461113959088
        }
      ]
    
    const renderTweets = function(data) {
      // loops through tweets
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      
      //clear the container before to read all tweets
      $("#tweets-container").empty();
    
      // loops through tweets
      for (let tweetObj of data) {
        // calls createTweetElement for each tweet
        const newTweet = createTweetElement(tweetObj);
        // takes return value and appends it to the tweets container
        $('#tweets-container').prepend(newTweet);
    }
    };
    
    const createTweetElement = function(tweet) {
        
      const dateCreated = new Date(data.created_at);
      const dateToday = new Date();
    
      const timeDiff = Math.abs(dateToday.getTime() - dateCreated.getTime());
      const diffDays = 2// Math.ceil(timeDiff / (1000 * 3600 * 24));
     
        let $tweet = $("<article>").addClass("tweet");/* Your code for creating the tweet element */
      // ...
      let html = (`<header>
                <img src="${tweet.user.avatars}"></img> 
                <h3>${tweet.user.name}</h3>
                <span class="light">${tweet.user.handle}</span>
              </header>
              <div class="body">${tweet.content.text}</div>
              <footer>
                <span class="daysAgo">${diffDays} days ago</span>
                <div>
                  <i class="fas fa-flag"></i>
                  <i class="fas fa-retweet"></i>
                  <i class="fas fa-heart"></i>
                </div>
              </footer>`);
      
            return $tweet.append(html);
    }
    
    
       $("#tweet-form").on('submit', function (event) {
        // prevent the default form submission
        event.preventDefault();
    
        const searchBox = $(this).closest("form").find("#tweet-text");
        
         //prepare data for Ajax calling
         const tweetElement = searchBox.val();
        // extract the information : serialise
        const content = $(this).serialise();
        
    
        const url = `http://localhost:8080/tweets` 
        
        $.ajax({
            url,
            method: 'POST',
          })
            .done(function(tweets) {
              // success case. getting the result of the api
              // this is the only block where you can access the result
              renderTweets(tweets);
            })
            .fail(() =>
              console.log('There was an error getting the info for that show')
            )
            .always(() => console.log('Request is completed.'));
        
    
    });
    
    loadTweets();
    
    });