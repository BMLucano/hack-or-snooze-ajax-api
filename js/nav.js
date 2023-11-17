"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
  // $loginForm.hide();
  // $submitForm.hide();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  evt.preventDefault();
  // hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  // $loginForm.hide();
  // $signupForm.hide();
  $navUserProfile.text(`${currentUser.username}`).show();
}

$("#nav-submit").on("click", navSubmitClick);

/** Show submit form when clicking "SUBMIT" in navbar. */

function navSubmitClick(evt) {
  evt.preventDefault();
  $submitForm.show();
}

$("#nav-favorites").on("click", navFavoritesClick);

/**Handles favorites link in nav when clicked.
 * Calls function to put stories on page.  */

function navFavoritesClick(evt){
evt.preventDefault();
// $signupForm.hide();
// $loginForm.hide();
hidePageComponents();
console.log("navbarFavoritesClick worked")
putFavoriteStoriesOnPage();

}
