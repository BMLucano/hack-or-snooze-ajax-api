"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  console.debug("generateStoryMarkup", story);

  const showStar = currentUser;


  // FIXME:

  // if (showStart) {

    // if there is a user, show star in HTML
    // if there is NOT a user, do NOT show star in HTML

    // afterwards, check if that storyId matches a storyId in the
    // currentUser's favorites

    // If it matches in the currentUser's favorites, then we get a filled star
    // on story.

    // If it doesn't match, then we get an open-filled star.


  // }

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <button type="click" data-favorite="false"
        id ="favorite-button">Favorite/Unfavorite</button>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

$submitForm.on("submit", getDataFromStoryFormAndDisplay);

/**
 * Handles submit form.
  Sends new story data to addStory and retrieves new story markup.
  Displays new story on page.
 */

async function getDataFromStoryFormAndDisplay() {
  const author = $("#submit-author").val();
  const title = $("#submit-title").val();
  const url = $("#submit-url").val();

  const newStory = await storyList.addStory(currentUser, { author, title, url });

  const $newStory = generateStoryMarkup(newStory);

  $allStoriesList.prepend($newStory);

}

/**Puts favorites list on page */
function putFavoriteStoriesOnPage() {
  $allStoriesList.empty();

  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }
  $allStoriesList.show();
}

/**Handles favoriting/unfavoriting a story */
$allStoriesList.on("click", "#favorite-button", toggleStoryFavorite);

function toggleStoryFavorite(evt) {
  evt.preventDefault();

  const $favoriteButton = $("#favorite-button");

  console.log('toggleStoryFavoriteButton worked!');

  let statusOfToggleButton = $favoriteButton.attr("data-favorite");

  console.log("This is statusOfToggleButton =", statusOfToggleButton);

  if (statusOfToggleButton === "true") {
    statusOfToggleButton = false;
  } else {
    statusOfToggleButton = true;
  }

  $favoriteButton.attr("data-favorite", statusOfToggleButton);

  console.log('Status of favorite button data-favorite', $favoriteButton);

  console.log("This is new status of statusOfToggleButton", statusOfToggleButton);

  // if( $("#favorite-button[data-favorite]")){

  }