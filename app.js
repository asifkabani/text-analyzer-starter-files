'use strict';

// Create function to remove non-alphanumerice characters and spaces.
function removeNonAlpha(string) {
	/* From the string, make it all lower-case, replace it with
	a regEx which matches for: match any character that is not in the set,
	keep a-z, 0-9, match one or more of the preceeding token (+), global search.
	Insert a space between words. Trim the beginning and end, and get the length.
	*/
	return string.toLowerCase().replace(/[^a-z0-9-]+/g, " ").trim();
}

// Create a function so we can get our average word length. This function will
// specifically get the count of all letters so we can divide them by the number
// of words later.
function getCountOfWords(string) {
	// Create an array to hold our count of letters.
	var newArray = [];
	// Remove all the spaces between the items and push the result into the array.
	newArray.push(string.replace(/\s/g, ""));
	// Create a variable to hold the result of the push above, join all the strings into one,
	// and get the length.
	var total = newArray.join("").length;
	// Return the variable above.
	return total;
}

// Create a function to get the number to get the unique word count.
function findUniqueWordCount(string) {
	// Get the string and split it into words, making an array of items, then sort it.
	var originalArray = string.split(" ").sort();
	// Create an array to put the count of how many duplicates appear.
	var uniqueArray = [];
	// Loop over the original array and for every duplicate which is found
	// using the indexOf function, put it inside the uniqueArray.
	for (var i = 0; i < originalArray.length; i++) {
		// Create a variable to hold the iterating items.
		var temp = originalArray[i];
		// Create a variable to hold the indexOf each iterating item.
		var presentOrNot = originalArray.indexOf(temp);
		// If the indexOf each item do not match, put the one which does
		// not match into the new array.
		if (presentOrNot != i) {
			uniqueArray.push(temp);
		}
	}
	return uniqueArray.length;
}

// Event Listener
$('.js-form').submit(function(event) {
	event.preventDefault();
	// Set currentItems variables to target the value of the text area.
	var currentItems = $('#user-text').val();
	// Use the removeNonAlpha function to clean up the string.
	var removeItems = removeNonAlpha(currentItems);
	// Use the getWordCount function to get the result,
	// break the words with spaces, then get the count.
	// This is our 'word count' value.
	var getWordCount = removeItems.split(" ").length;
	// Use the getCountOfWords function to get the count of letters.
	var getAverageWordLength = getCountOfWords(removeItems);
	// Creat a variable to hold the value of the getAverageWordLength / getWordCount
	// to get our 'average word length', fixed to 2 decimal plcaes, and add the text.
	var getAverageWordLength = (getAverageWordLength/getWordCount).toFixed(2) + ' characters';
	// Use the function findUniqueWordCount to return a value into a variable.
	// The variable is taking the getWordCount and subtracting it against the result of
	// the number of items which are duplicates. This is our 'unique word count'.
	var getUniqueWordCount = getWordCount - findUniqueWordCount(removeItems);

	// Push the getWordCount into the class.
	var wordCount = $('.js-word-count').html(getWordCount);
	// Push the getAverageWordLength into the class.
	var averageWordLength = $('.js-average').html(getAverageWordLength);
	// Push the getUniqueWordCount into the class.
	var uniqueWordCount = $('.js-unique').html(getUniqueWordCount);

	// Display all the results by removing the hidden class.
	$('.hidden').removeClass();
});
