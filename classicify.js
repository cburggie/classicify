
function isTargetURL(url)
{
	var value = !url.includes("old.reddit.com") && url.includes("reddit.com");
	console.log("classicify.isTargetURL(): " + value);
	return value;
}

function eventHandler(e)
{
	//ignore if we're not clicking a link
	if (!e.target.hasAttribute("href"))
	{
		return;
	}
	
	var url = e.target.getAttribute("href");
	
	if (isTargetURL(url))
	{
		url = makeClassic(url);
		let msg = "classicify.eventHandler(): ";
		msg += "url changed to " + url;
		console.log(msg);

		e.target.setAttribute("href", makeClassic(url));
	}
}




//change a www.reddit.com url to a old.reddit.com url
function makeClassic(url)
{
	var target = "reddit.com";
	var classicURL = "https://old.reddit.com";

	//split at our target string, skip the prefix and join the remaining
	//chunks (if there are any)
	return classicURL.concat(url.split(target).slice(1).join(target));
}

//link the above methods to our page via mouse events
document.addEventListener("mousedown", eventHandler);
document.addEventListener("contextmenu", eventHandler);


console.log("classicify: page readystate: " + document.readyState);




/* The below code manually redirects the page as it loads.
 * It's a bit choppy, though, as much of the page is loaded and rendered
 * by thy time this code is executed. So this fires as a last resort if we
 * missed one of the bizarre link-shortened edge cases reddit has let slip
 * through the cracks.
 */


function redirector(e)
{
	console.log("classicify.redirector(): checking if redirect necessary");
	if (isTargetURL(window.location.href))
	{
		var url = makeClassic(window.location.href);
		console.log("classicify.redirector(): redirecting to " + url);
		window.location.replace(url);
	}
}

redirector();
