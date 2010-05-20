$(document).ready(function()
{

var allTags = document.body.getElementsByTagName('div');
var ids = [];
for (var tg = 0; tg< allTags.length; tg++) {
    var tag = allTags[tg];
    if (tag.id) {
    	if(tag.id.indexOf("module") > -1) {
            ids.push(tag.id);
        }
     }   
}

function drawListOfModules() {
	var listSet = "";
	while (ids.length > 0) {
		listSet += "<li style=\"float: left; padding-right: 0.5em;\">" + ids.shift().substr(6) + "</li>";
	}
	return listSet;
}



	$('#container').prepend(
		'<div id=\"devTools\" style="z-index: 100; position: fixed; bottom: 0; width: 100%; background-color: #000; color: #fff;"><div style="float: left; margin: 0 1.0em; height: 20px; line-height: 20px;"><strong>Dev Bar:</strong></div><ul style="float: left; cursor: pointer; height: 20px; line-height: 20px; list-style: inside disc; font-size: 0.9em;">'+drawListOfModules()+'<li style="float: left; padding-right: 0.5em; border-left: 1px solid #ccc; padding-left: 1.0em;"><a href="http://validator.w3.org/check?uri=http%3A%2F%2F72.167.43.64%2Fsitedev%2F&charset=%28detect+automatically%29&doctype=Inline&group=0&user-agent=W3C_Validator%2F1.767">XHTML</a></li><li style="float: left; padding-right: 0.5em;"><a href="http://jigsaw.w3.org/css-validator/validator?uri=http%3A%2F%2F72.167.43.64%2Fsitedev%2F%23&profile=css3&usermedium=all&warning=1&lang=en">CSS</a></li></ul></div>');
	
	
	$('#devTools li').live('click',
		function(){
			$('#module'+$(this).html()).toggle('slow');
			$(this).toggleClass('red');			
	});
});