/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




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
const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  
const createTweetElement = function(tweet) {
    const dateCreated = new Date(tweet.created_at);
      const dateToday = new Date();
    
      const timeDiff = Math.abs(dateToday.getTime() - dateCreated.getTime());
      const diffDays =  Math.ceil(timeDiff / (1000 * 3600 * 24));

    let $tweet = $("<article>").addClass("tweet");/* Your code for creating the tweet element */
  // ...
  let html = (`<header>
                <img src="${tweet.user.avatars}"></img> 
                <h3>${tweet.user.name}</h3>
                <span class="light">${tweet.user.handle}</span>
             </header>
                <div class="body">${escape(tweet.content.text)}</div>
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

const loadTweets = function () {
    // Make a request to the API and get the data back

    const url = `http://localhost:8080/tweets`

    $.ajax({
      url,
      method: 'GET',
    })
      .done((result) => {
        // success case. getting the result of the api
        // this is the only block where you can access the result
        renderTweets(result);
      })
      .fail(() =>
        console.log('There was an error getting the info for that show')
      )
      .always(() => console.log('Request is completed.'));
  };


  $(document).ready(function () {
      
    loadTweets();


    $("#tweet-form").on('submit', function (event) {

        //$(".new-tweet").find("textarea").focus();

    //event listener to toggle the new-tweetsection and enable the textarea
        


     // prevent the default form submission
     event.preventDefault();

    //get data from the form
    const searchBox = $(this).closest("form").find("#tweet-text")
    const message = $(this).closest("form").find(".errorMsg");
    
    //prepare data for Ajax calling
    const content = $(this).serialize();

    const tweetElement = searchBox.val();

    if (tweetElement === "" || tweetElement === null){
        $(".errorMsg").text("Your message is empty!");
        $(".errorMsg").slideDown( 500)
        //searchBox.focus();
    } else if(tweetElement.length > 140){
        $(".errorMsg").text("Your message is too long!");
        $(".errorMsg").slideDown( 500)
        //searchBox.focus();
    } else {
    const url = `http://localhost:8080/tweets`
    $.ajax({
        url,
        method: 'POST',
        data: content
    }) .done((result) => {
        
        // success case. getting the result of the api
        // this is the only block where you can access the result
        loadTweets();
        $("#tweet-text").val("");
        $(".errorMsg").slideUp( 500)
    })
    .fail(() =>
        console.log('Error')
    )
    .always(() => console.log('Request is completed.'));

    //hidden the message if it is shown, clear the textarea, and reset the char-counter
    //
    //searchBox.val("").focus();
    }
});   
loadTweets();
});