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
  getOnlineFeed('https://itunes.apple.com/us/rss/topfreeapplications/limit=25/xml');
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