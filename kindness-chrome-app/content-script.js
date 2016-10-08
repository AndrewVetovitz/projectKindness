$(document).ready(function() {
  console.log("page ready.");
  findTextAreas();

  $(document).on("DOMNodeInserted", function(e) {
    if ($(e.target).is("textarea")) {
      console.log("new textarea available");
       setupTextArea(e.target);
    }
  });
});

function findTextAreas() {
  // Add an icon to all input fields of class text
  console.log("finding textareas");
  var textAreas = document.getElementsByTagName("textarea");
  for (var i = 0; i < textAreas.length; i++) {
    setupTextArea(textAreas[i]);
  }
}

function setupTextArea(textArea) {
  if (textArea.readOnly == false) {
    // var elem = document.createElement("img");
    // elem.setAttribute("src", "icon.png");
    // inputField.parentElement.appendChild(elem);
    var oldParent = textArea.parentElement;

    // make a new container for the textarea and bar
    var newContainer = document.createElement("div");
    $(newContainer).addClass("kindness-content");

    // make the bar
    var bar = document.createElement("div");
    $(bar).addClass("kindness-bar")

    // add content to the bar
    var toolbarText = document.createElement("p");
    $(toolbarText).text("Welcome to the Kindness Project.");

    // insert everything needed
    oldParent.insertBefore(newContainer, textArea);
    newContainer.appendChild(bar);
    newContainer.appendChild(textArea);
    bar.appendChild(toolbarText);

    // We have to check for modifications to these fields
    $('textarea').bind('input propertychange', function() {
      inputChanged($('textarea'));
    });
  }
}

var charCount = 0;
function inputChanged(textBox) {
	console.log("input changed " + charCount);
	charCount++;
	if(charCount % 7 == 0)
		sendInput(textBox);
}
function sendInput(textBox) {
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    text = encodeURIComponent(textBox.value);
    url = "http://ec2-54-163-44-93.compute-1.amazonaws.com:1320/?text=" + text;
    console.log(url);
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}
