# REST-ping
 Super Basic REST API wrapper for node-ping

This was created as a workaround for Docker instances under Pterrodactyl would not allow pinging from the inside.

This program has to be hosted outside of the Pterrodactyl Dockers.

---
## Running the code

The following commands will build ts to js and starts the application.

```
npm run build 
npm run start
```
It will output what ip address and port that it is hosted on.

---
## GET response

This program only supports a GET reuest to /ping/IP_OR_WEBSITE_TO_PING_TO

A valid 200 response will yield data that can be casted as a PingResponse object from node-ping.

---
## Config Options
```
{
	"probeSite": "https://jadestudios.uk", 
	"localhostOnly": false,
	"apiaddress": "",
	"apiport": 3123
}

```
**probeSite** : string - is the website that this program should create an outbound socket to in order to find a working ip address.

**localhostOnly** : boolean - whether or not to force use localhost

**apiaddress** : string - user inputted ip address for hosting the http server. Will default to localhost if invalid (i.e. address does not exist on any interface)

**apiport** : number - port to host the server on



---
# References
* geeksforgeeks.org
* Stack Overflow