MyIP - geolocate by IP
======================

This little app shows your external IP and then uses uses the [IPInfoDB](http://ipinfodb.com/) API to provide geolocation data, based on that IP.
Currently, results are offered in JSON format only.

Motivation
----------
I'm on the road quite a lot, and many times I need to know my external IP. Oftentimes, it's good to know where web sites think I'm calling from.
I wrote a version of this in PHP, that still works great, but I wanted to try a simple Node.js app. The idea was to try writing this as simple as possible, with no external modules or dependencies. After finishing the server side, I wrote a simple Chrome extension (see below) that consumes the JSON and shows it in a browser.  
You can find the full story on [my code blog](http://code.travelingtechguy.com/2013/04/whats-my-ip.html).

Usage
-----
 1. Clone the repo (if you're here, you know how to do that :))
 2. Go to [IPInfoDB API](http://ipinfodb.com/register.php) and register for the free API key
 3. Paste the API key into the [config.json](https://github.com/TravelingTechGuy/myip/blob/github/config.json) file
 4. Run the app using `node app` - tested on node 0.10 and higher


You can test a running version at [http://MyIP.TravelingTechGuy.com](http://myip.travelingtechguy.com/) (hosted on Heroku).

Chrome extension
----------------
You can check out the Chrome extension that uses the service to show the info in the Chrome browser.
 - Find the repository here [https://github.com/TravelingTechGuy/myipextension](https://github.com/TravelingTechGuy/myipextension) 
 - Download from the [Chrome app store](https://chrome.google.com/webstore/detail/my-ip/lejbibljgiojigkpkhmdgdhmiaddgidd?hl=en-US&gl=US).

Created by **Guy Vider** [http://www.TravelingTechGuy.com](http://www.TravelingTechGuy.com)