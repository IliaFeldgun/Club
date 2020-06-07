# Club Roadmap

### Branch from 0.1

### Redis cleanup
Game state destruction needs to be implemented. Use Key Value State Store to clean up objects that are no longer needed

### Locking mechanism
The lobby is VERY likely to access and edit the same resource at the same time.
Lock should be managed in Redis or changed to work with a database
The games are turn based so it is unlikely cuncurrency problems will occur

### Modulize
Decouple engine from its games

### Room list
A place to find a room to play

### Database
Persistent data, such as players and rooms need to be managed in a database, not in Redis

### OAuth
Sign in with facebook/google

### Normalize errors
Create error handling with standartized errors

### Log everything
Logging isn't implemented

### Tests
Add unit tests and end-to-end tests

### More games
More games
