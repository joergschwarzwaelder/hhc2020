# Linux Primer
```
elf@39f874933907:~$ ls
HELP  munchkin_19315479765589239  workshop
elf@39f874933907:~$ cat munchkin_19315479765589239
munchkin_24187022596776786
elf@39f874933907:~$ rm munchkin_19315479765589239
elf@39f874933907:~$ pwd
/home/elf
elf@39f874933907:~$ ls -a
.  ..  .bash_history  .bash_logout  .bashrc  .munchkin_5074624024543078  .profile  HELP  workshop
elf@39f874933907:~$ history
    1  echo munchkin_9394554126440791
    2  ls
    3  cat munchkin_19315479765589239
    4  rm munchkin_19315479765589239
    5  pwd
    6  ls -a
    7  history
elf@39f874933907:~$ env | grep -i munchkin
z_MUNCHKIN=munchkin_20249649541603754
SESSNAME=Munchkin Wrangler
elf@39f874933907:~$ cd workshop
elf@39f874933907:~/workshop$ grep -i munchkin *
grep: electrical: Is a directory
toolbox_191.txt:mUnChKin.4056180441832623

elf@39f874933907:~/workshop$ ls -l lollipop_engine
-r--r--r-- 1 elf elf 5692352 Dec  9 20:08 lollipop_engine
elf@39f874933907:~/workshop$ chmod a+x lollipop_engine
elf@39f874933907:~/workshop$ ./lollipop_engine
munchkin.898906189498077
elf@ccd953526f61:~/workshop$ cd electrical/
elf@ccd953526f61:~/workshop/electrical$ mv blown_fuse0 fuse0
elf@ccd953526f61:~/workshop/electrical$ ln -s fuse0 fuse1
elf@ccd953526f61:~/workshop/electrical$ cp fuse1 fuse2
elf@ccd953526f61:~/workshop/electrical$ echo MUNCHKIN_REPELLENT >> fuse2
elf@ccd953526f61:~/workshop/electrical$ find /opt/munchkin_den -iname munchkin* -ls
  4456643      4 drwxr-xr-x   1 root     root         4096 Dec 10 18:20 /opt/munchkin_den
  4456607      0 -rw-r--r--   1 root     root            0 Dec 10 18:20 /opt/munchkin_den/apps/showcase/src/main/resources/mUnChKin.6253159819943018
elf@ccd953526f61:~/workshop/electrical$ find /opt/munchkin_den -user munchkin -ls
  4456629      0 -rw-r--r--   1 munchkin munchkin        0 Dec 10 18:20 /opt/munchkin_den/apps/showcase/src/main/resources/template/ajaxErrorContainers/niKhCnUm_9528909612014411
elf@ccd953526f61:~/workshop/electrical$ find /opt/munchkin_den -size +108k -size -110k -ls
  4456651    112 -rw-r--r--   1 root     root       111616 Dec 10 18:21 /opt/munchkin_den/plugins/portlet-mocks/src/test/java/org/apache/m_u_n_c_h_k_i_n_2579728047101724
elf@ccd953526f61:~/workshop/electrical$ ps -aef | grep -i munchkin
elf      22562 22559  0 18:18 pts/2    00:00:00 /usr/bin/python3 /14516_munchkin
elf      23325   296  0 18:19 pts/3    00:00:00 grep --color=auto -i munchkin
elf@ccd953526f61:~/workshop/electrical$ netstat -ltnp | grep 22562
(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
tcp        0      0 0.0.0.0:54321           0.0.0.0:*               LISTEN      22562/python3
elf@ccd953526f61:~/workshop/electrical$ curl http://localhost:54321
munchkin.73180338045875elf@ccd953526f61:/opt/munchkin_den$

elf@ccd953526f61:~/workshop/electrical$ curl http://localhost:54321
munchkin.73180338045875elf@ccd953526f61:~/workshop/electrical$ kill 22562
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTQzMjk4MzMwN119
-->