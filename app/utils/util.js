var Util = function(){};

Util.keywordFromTweet = function(keywordsToFilter, tweetText) {
	if (keywordsToFilter!=null && tweetText!==null) {
		var filtered = keywordsToFilter.filter(function(value) {
			return (tweetText!=null && tweetText.toLowerCase().indexOf(value.toLowerCase()) >= 0)
		})
		if (filtered.length==1) {
			return filtered[0];
		}
	} else {
		return null;
	}
}

module.exports = Util;
