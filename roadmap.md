# Club Roadmap

### Locking mechanism
The lobby is VERY likely to access and edit the same resource at the same time.
Lock should be managed in Redis or changed to work with a database
The games are turn based so it is unlikely cuncurrency problems will occur

### Room list
Player should be able to access all his rooms

### More games
More games

### Database
Persistent data, such as players and rooms need to be managed in a database, not in Redis

### Normalize errors
Create error handling with standartized errors

### Log everything
Logging isn't implemented