# Speaker UNPrep
The objective is to find the passwords used by the scripts "lights" and "vending-machines".

## lights
The application lights shows this message after startup:

    >>> CONFIGURATION FILE LOADED, SELECT FIELDS DECRYPTED:

This is an indicator that this application does not hash the passwords - they are encrypted instead. And it seems that that password get unencrypted upon start, so that the password is in clear test in the process memory.

By using the script get_lights_password.sh is was possible to dump the process memory and to find the password in clear text.


> f8887c0c000-7f8887c0e000 rw-p 001ba000 08:01 2495947                    /lib/x86_64-linux
-gnu/libc-2.28.so
> 7f8887c
> main
> <no name provided>
> /home/elf/lab/lights.conf13b1f6898d4
> password
> ghts
> Computer-TurnLightsOnV
> b2f3f0118361de4d57752712c27c5316a95d9e5e5b124
> wRq,'
> e7a37d000 rw-p 00000000 00:0

So the password is **Computer-TurnLightsOn**

## vending-machines
The password which has to be used is stored encoded in the file "vending-machines.json": LVEdQPpBwr. When the file is deleted it is possible to set a new password and to learn about the encoding method.
It was found that:

 - The clear text and the encoded password always have the same length
 - Same characters on the same position are encoded to the same character in the same position
 - The encoding repeats after 8 characters, i.e. an "a" at position 1 is encoded in the way as an "a" in position 9:
 
|clear text|encoded|
|--|--|
| josh|ajPg|
|iosh|MjPg|
|ajosh| 98fno|
|joshi|ajPg4|
|aaaaaaaaaa|9Vbtacpg9V|
|eeeeeeeeee|wcZQAYuewc | 

To get hold of the clear text password the script
[vending-password.sh](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Additional/vending-password.sh) goes through all characters in scope on all positions of the encoded password and creates the encoded representation.
The script determined that the password is **CandyCane1**.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjQ4MjkzMDgwLC0zMDkyNjk2OTNdfQ==
-->