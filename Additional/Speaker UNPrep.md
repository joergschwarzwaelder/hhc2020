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
**Approach 1**:
Following the hint of the Elf to check what happens if the name in the config file gets changed to an encrypted value the name was replaced with the encrypted password in the lab environment:
```
elf@6f3d31105c18 ~/lab $ cat lights.conf 
password: E$ed633d885dcb9b2f3f0118361de4d57752712c27c5316a95d9e5e5b124
name: E$ed633d885dcb9b2f3f0118361de4d57752712c27c5316a95d9e5e5b124
#name: elf-technician
```
Starting the `lights` process then displays the password as username: `The terminal just blinks: Welcome back, Computer-TurnLightsOn`
So the password is **Computer-TurnLightsOn**.

**Approach 2**:
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

**Approach 3**:
The program was started in GDB with a breakpoint set to the `read` syscall:
```
(gdb) catch syscall 0
Catchpoint 1 (syscall 'read' [0])
(gdb) run
```
After several stops it is visible that the `lights.conf` file is read into memory:
```
Catchpoint 1 (call to syscall read), 0x00007ffff7ebe142 in __GI___libc_read (fd=3, buf=0x555555599d90, nbytes=8192) at ../sysdeps/unix/sysv/linux/read.c:26
26	in ../sysdeps/unix/sysv/linux/read.c
(gdb) x/20s 0x555555599d90
0x555555599d90:	"password: E$ed633d885dcb9b2f3f0118361de4d57752712c27c5316a95d9e5e5b124\nname: elf-technician\n"
```
Lateron the breakpoint is reached again when the program is waiting for the user input. At this time at exactly the same memory location the decrypted password can be found:

```
(gdb) x/20s 0x555555599d90
0x555555599d90:	"Computer-TurnLightsOnU"
0x555555599da7:	""
```

**Approach 4**
It was found that it is possible to provide clear text password in the `lights.conf` file - but the user has only write access to the `lab` directory.
Using  a tailored library providing an alternative system call `read` through `LD_PRELOAD` it is possible to call `/home/elf/lights` and inject the customized config file into that.

```
elf@7e18ebefca11 ~ $ cd lab
elf@7e18ebefca11 ~/lab $ cat read.c
#define _GNU_SOURCE
#include <dlfcn.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

static ssize_t (*real_read)(int fd, void *buf, size_t count);

ssize_t read(int fd, void *buf, size_t count){
  int ret;
  real_read=dlsym(RTLD_NEXT,"read");
  ret=real_read(fd,buf,ret);
  if(memcmp("password: E$",buf,12)==0){
    int fd2;
    fd2=open("lights.conf",O_RDONLY);
    dup2(fd2,fd);
    ret=real_read(fd,buf,ret);
  }
  return ret;
}
elf@7e18ebefca11 ~/lab $ gcc -fPIC -shared -o read.so read.c -ldl
elf@7e18ebefca11 ~/lab $ cat lights.conf 
password: abc123
name: elf-technician
elf@7e18ebefca11 ~/lab $ LD_PRELOAD=$PWD/read.so ../lights
The speaker unpreparedness room sure is dark, you're thinking (assuming
you've opened the door; otherwise, you wonder how dark it actually is)

You wonder how to turn the lights on? If only you had some kind of hin---

 >>> CONFIGURATION FILE LOADED, SELECT FIELDS DECRYPTED: /home/elf/lights.conf

---t to help figure out the password... I guess you'll just have to make do!

The terminal just blinks: Welcome back, elf-technician

What do you enter? > abc123

Checking......

Lights on!
elf@7e18ebefca11 ~/lab $ 
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
eyJoaXN0b3J5IjpbMTE5NzkyMzM1NSwxNzg1Mzc1MTAzLC01ND
MwNjk5NTksLTE0NjI3OTUyMjUsNDQ4NDEzMDA0LDE5NTMyMDgx
NTgsLTQxODI4MTg2MywtMTY1NzE3ODU0MCw0MDczMzg3NCwtNj
gxODg1MjIyLC0zMDkyNjk2OTNdfQ==
-->