# URL Shortener Microservice

This microservice accepts requests to two endpoints https://www.mini-url.glitch.me/new/<link to shorten> and https://www.mini-url.glitch.me/<short code>

Example usage:
https://www.mini-url.glitch.me/new/https://www.google.com

Returns:
{"original_url":"https://www.google.com","short_url":"mini-url.glitch.me/ry5Wt8A8@"}

Once a url is saved if the short url is entered in the browser the service redirects to the original link

[GitHub Repo](https://www.github.com/whackdev/url-shortener)
