/**
 * @class 'load-custom-index' this will append the custom_index.html to the front page.
 * The custom_index.html can be found at doc/custom/custom_index.html
 *
 * @param  {String} [elementById] the element to append the custom_index.html page this is a element of type ID
 * @type {function}
 * @return -
 */
(function(elementById) {
  /**
   * This will append a html content to the id docs-main
   *
   * @method appendHtmlTextToPage
   * @param {String} [html] this is a text string that will be append to the html id of docs-main
   * @type {function}
   * @return -
   */
  var appendHtmlTextToPage =
    function(html) {
      var elementToAppendHtml = document.getElementById(elementById);
      var contentToAdd = document.createElement('div');
      contentToAdd.innerHTML = html;
      elementToAppendHtml.appendChild(contentToAdd);
    };


  /**
   * It will get the custom index and it will fires the callback if the get is successfully got with status 200
   *
   * @method getCustomIndex
   * @type {function}
   * @param {function} [callbackSuccess] this will do a callback if the custom content is get successfully. also it gives a parameter with
   * @async
   * @cunstruct
   * @return -
   */
  var getCustomIndex = function(callbackSuccess) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    } else {
      // code for IE6, IE5
      xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === XMLHttpRequest.DONE) {
        if (xmlhttp.status === 200) {
          callbackSuccess(xmlhttp.responseText);
        }
      }
    };
    xmlhttp.open('GET', '../custom/custom_index.html', true);
    xmlhttp.send();
  };
  getCustomIndex(appendHtmlTextToPage);
}('docs-main'));
