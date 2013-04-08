// ISCPA added search filter, home icon, updated CDN-Hosted links
// forked from sumukh1's "forked: RSS Reader with jQuery Mobile" http://jsdo.it/sumukh1/4Ton
/* configuration */
var maxLength = 20;
/* writing HTML */
document.write(
  '<div data-role="page" id="list">' +
  '  <div data-role="header" data-position="fixed">' +
  '    <h1><span id="widgetTitle">...</span> ' +
  '      <span style="font-size: x-small">(HTML)</span></h1>' +
  '  </div>' +
  '  <div data-role="content">' +
  '    <ul data-role="listview" data-filter="true" id="articleList">'
);
for(var i=1; i<=maxLength; i++){
  document.write(
    '<li id="list' + i + '"><a href="#article' + i + '" id="link' + i + '">&nbsp;</a></li>'
  );
}
document.write(
  '    </ul>' +
  '  </div>' +
  '</div>'
);
for(i=1; i<=maxLength; i++){
  document.write(
    '<div data-role="page" id="article' + i + '">' +
    '  <div data-role="header" data-position="inline">' +
    '    <a href="#list" data-role="button" data-icon="home" data-back="true">Home</a>' +
    '    <h1 id="articleHeader' + i + '">&nbsp;</h1>' +
    '    <a href="#" id="openButton' + i + '" data-role="button" data-icon="plus"' +
    '      class="ui-btn-right" rel="external">Open</a>' +
    '  </div>' +
    '  <div data-role="content">' +
    '    <div id="articleContent' + i + '" class="articleContent"></div>' +
    '    <div data-role="controlgroup" data-type="horizontal">' +
    '      <a href="#article' + String(i-1) + '" data-role="button" data-icon="arrow-l"' +
    '        data-inline="true" class="prevButton">Prev</a>' +
    '      <a href="#article' + String(i+1) + '" data-role="button" data-icon="arrow-r"' +
    '        data-inline="true" class="nextButton" data-iconpos="right">Next</a>' +
    '    </div>' +
    '  </div>' +
    '</div>'
  );
}
/* JSONP */
$(function(){
  // getOnlineFeed('http://www4.lehigh.edu/news/rss/LUnews_rss.xml');
  getOnlineFeed('http://feeds.feedburner.com/HenningsBlog');
  
/*
  getOnlineFeed('http://www.engadget.com/rss.xml');
  getOnlineFeed('http://www.fremont.k12.ca.us/site/RSS.aspx?DomainID=1&ModuleInstanceID=4613&PageID=1');
  getOnlineFeed('http://news.google.com/news?hl=ja&ned=us&ie=UTF-8&oe=UTF-8&output=atom&topic=h');
  getOnlineFeed('http://www.appbank.net/feed');
  getOnlineFeed('http://japanese.engadget.com/rss.xml');
  getOnlineFeed('http://www.bebit.co.jp/index.xml');  
  getOnlineFeed('http://www.ntt.com/rss/release.rdf?link_id=ostop_service_rss');
  getOnlineFeed('http://feeds.feedburner.com/gapsis');
  getOnlineFeed('http://octoba.net/feed');
  getOfflineFeed('google_news_jsonp.js');
*/
});
/* functions */
var listEntries = function(json) {
  if (!json.responseData.feed.entries) return false;
  $('#widgetTitle').text(json.responseData.feed.title);
  var articleLength =json.responseData.feed.entries.length;
  articleLength = (articleLength > maxLength) ? maxLength : articleLength;
  for (var i = 1; i <= articleLength ; i++) {
    var entry = json.responseData.feed.entries[i-1];
    $('#link' + i).text(entry.title);
    $('#articleHeader' + i).text(entry.title);
    $('#openButton' + i).attr('href', entry.link);
    $('#articleContent' + i).append(entry.content);
  }
  $('#article1 .prevButton').remove();
  $('#article' + articleLength + ' .nextButton').remove();
  if (articleLength < maxLength) {
    for (i = articleLength + 1; i <= maxLength; i++) {
      $('#list' + i).remove();
      $('#article' + i).remove();
    }
  }
};
var getOnlineFeed = function(url) {
  var script = document.createElement('script');
  script.setAttribute('src', 'http://ajax.googleapis.com/ajax/services/feed/load?callback=listEntries&hl=ja&output=json-in-script&q='
                      + encodeURIComponent(url)
                      + '&v=1.0&num=' + maxLength);
  script.setAttribute('type', 'text/javascript');
  document.documentElement.firstChild.appendChild(script);
};
var getOfflineFeed = function(url) {
  var script = document.createElement('script');
  script.setAttribute('src', url);
  script.setAttribute('type', 'text/javascript');
  document.documentElement.firstChild.appendChild(script);
};