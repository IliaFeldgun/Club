# Club Roadmap

### Cookies security
Cookies now run across different origins.
Need to investigate and make sure cookies don't make the app XSS vulnerable

### Redis cleanup
Game state destruction needs to be implemented. 
Use Key Value State Store to clean up objects that are no longer needed.

### Modulize
Decouple engine from its games

### Room list
A place to find a room to play

### OAuth
Sign in with facebook/google

### Normalize errors
Create error handling with standartized errors, perhaps Axios will assist with the client

### Log everything
Logging exists only for http requests on server

### Tests
Complete testing coverage, CI already exists

### More games
More games
