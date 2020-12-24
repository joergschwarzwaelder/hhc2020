# Speaker UNPrep
Location: Talks Lobby

The objective is to find the passwords used by the applications `door`, `lights` and `vending-machines`.

## door
The password for the application is stored in clear text in the application binary:
```
elf@fb8c0d254251 ~ $ strings ./door | grep -i password
/home/elf/doorYou look at the screen. It wants a password. You roll your eyes - the 
password is probably stored right in the binary. There's gotta be a
Be sure to finish the challenge in prod: And don't forget, the password is "Op3nTheD00r"
Beep boop invalid password
```
So this password is **Op3nTheD00r**.

## lights
**Approach 1**
Following the hint of the Elf to check what happens if the name in the config file gets changed to an encrypted value the name was replaced with the encrypted password in the lab environment:
```
elf@6f3d31105c18 ~/lab $ cat lights.conf 
password: E$ed633d885dcb9b2f3f0118361de4d57752712c27c5316a95d9e5e5b124
name: E$ed633d885dcb9b2f3f0118361de4d57752712c27c5316a95d9e5e5b124
#name: elf-technician
```
Starting the `lights` process then displays the password as username `The terminal just blinks: Welcome back, Computer-TurnLightsOn`
So the password is **Computer-TurnLightsOn**.

**Approach 2**
The application lights shows this message after startup:

    >>> CONFIGURATION FILE LOADED, SELECT FIELDS DECRYPTED:

This is an indicator that this application does not hash the passwords - they are encrypted instead. And it seems that the password gets unencrypted upon start, so that the password is in clear text in the process memory.

By using the script [get_lights_password.sh](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Additional/get_lights_password.sh) it was possible to dump the process memory and to find the password in clear text.

```
7f8887c0c000-7f8887c0e000 rw-p 001ba000 08:01 2495947                    /lib/x86_64-linux
-gnu/libc-2.28.so
7f8887c
main
<no name provided>
/home/elf/lab/lights.conf13b1f6898d4
password
ghts
Computer-TurnLightsOnV
b2f3f0118361de4d57752712c27c5316a95d9e5e5b124
wRq,'
e7a37d000 rw-p 00000000 00:0
```
So the password is **Computer-TurnLightsOn**.

**Approach 3**
The program was started in GDB with a breakpoint set to the `read` syscall:
```


## vending-machines
The password, which has to be used, is stored encoded in the file "vending-machines.json": LVEdQPpBwr. When the password file is deleted it is possible to set a new password and to learn about the encoding method.
It was found that:

 - The clear text and the encoded password always have the same length
 - Same characters on the same position are encoded to the same character in the same position
 - The encoding repeats after 8 characters, i.e. an "a" at position 1 is encoded in the same way as an "a" in position 9:
 
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
eyJoaXN0b3J5IjpbOTAwMTQxMzc0LDQ0ODQxMzAwNCwxOTUzMj
A4MTU4LC00MTgyODE4NjMsLTE2NTcxNzg1NDAsNDA3MzM4NzQs
LTY4MTg4NTIyMiwtMzA5MjY5NjkzXX0=
-->