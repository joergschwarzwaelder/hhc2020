# Speaker UNPrep
The objective is to find the passwords used by the scripts "lights" and "vending-machines".

## lights
The application lights show this message after startup:

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

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTEzMjA0ODUxMywtMzA5MjY5NjkzXX0=
-->