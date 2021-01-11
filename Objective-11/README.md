# Objective 11: Naughty/Nice List with Blockchain Investigation
Location: Santa's Office

The [Blockchain](https://download.holidayhackchallenge.com/2020/blockchain.dat) to be investigated can be obtained in Santa's office.
It uses MD5 as hashing algorithm. Some Elves saw that Jack Frost's entry in this Blockchain was set to "Naughty" in the past and now it is set to "Nice". They suppose that Jack tampered his Block on the Blockchain.
Each single block has this data structure:

![data structure ](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/Blockchain%20Definition.png)
Interestingly all the data fields in the blocks, except the documents and the hashes) are hex numbers 

## Objective 11a: Part 1

The provided Blockchain data contains the blocks with serials #128449-#129996. The objective is to predict the nonce of block #130000.

In the hints is a [talk of Tom Liston covering Mersenne Twister based PRNG ](https://www.youtube.com/watch?v=Jo5Nlbqd-Vg) along with [sample Python code](https://github.com/tliston/mt19937) for predicting the next random values if you know the last 624 ones (covering 32 Bit PRNG).
As the nonces in the Blockchain are 64 Bit it was found they were created by using two 32 Bit random values (first one for the lower 32 Bit, second one for the upper 32 Bit).
The prediction works just the same as in the [Snowball Game](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Additional/Snowball%20Game.md): The nonces of the last 312 blocks of the Blockchain were split into lower and upper half and pre-loaded into the Mersenne Twister (so in total these are the required 624 random values).
The next 6 32 Bit random values out of this prepared PRNG are part of the nonces for #129997-#129999.
Then finally the next two are lower and upper half of the nonce for block #130000 -> **57066318 f32f729d**

A [Perl script](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/decode.pl) for analyzing and tampering the Blockchain is provided.
It reads the file `blockchain.dat`, dumps out all information in ASCII, dumps out the original and modified PDFs for Jack Frost into the subdirectory `content` and performs MD5 and SHA256 hash recalculations.
It also dumps out the nonce halves for the nonce prediction.
The nonce prediction can be performed with the modified [mt19937 script](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/mt19937-reader.py) using: `./decode.pl | ./mt19937-reader.py`

## Objective 11b: Part 2

The objective is to modify Jack Frosts block back from Nice to Naughty and to make available the hidden PDF pages by changing only four bytes.

MD5 works using chunks of 64 bytes. It is possible increase a value at offset #9 of MD5 block #m without changing the MD5 hash by also decreasing the value at offset #9 of MD5 block #m+1 (entangled positions) (this does not work in general; https://github.com/corkami/collisions#unicoll-md5 and https://www.mdeditor.tw/pl/2YZs)
With this information the naughty/nice value can be changed from "1" (Nice) to "0" (Naughty) (offset #9 in MD5 block #1) and one specific value in the PDF document from "2" to "3" (to make the original naughty messages visible; PDF Page Catalog) (offset #9 in MD5 block #4).
Luckily both changes are at position #9 of an MD5 block, so that as compensating measure (to have the MD5 hash stay the same) the entangled positions can simply be changed accordingly (position #9 in MD5 blocks #2 and #5).

Tampering the Naughty/Nice value (shown index relative to the full Blockchain, start of Jacks's block is at index 0x16302c):
> 163070 66 66 66 66 66 **31** 66 66 30 30 30 30 30 30 36 63

> 163070 66 66 66 66 66 **30** 66 66 30 30 30 30 30 30 36 63

and the entangled position with an offset of 64 bytes:
> 1630b0 6f cb 0f 18 8d **d6** 03 88 bf 20 35 0f 2a 91 c2 9d

> 1630b0 6f cb 0f 18 8d **d7** 03 88 bf 20 35 0f 2a 91 c2 9d

Tampering the PDF making available the hidden content
> 163130 61 67 65 73 20 **32** 20 30 20 52 20 20 20 20 20 20

> 163130 61 67 65 73 20 **33** 20 30 20 52 20 20 20 20 20 20

and the entangled position with an offset of 64 bytes
> 163170 03 b9 ef 95 99 **1c** 5b 49 9f 86 dc 85 39 85 90 99

> 163170 03 b9 ef 95 99 **1b** 5b 49 9f 86 dc 85 39 85 90 99

The original and reverted files can be found in the below table.
In addition the [hex dump diff](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/blockchain-naughty-nice-diff.dump) is provided.

|Original (Nice)|Reverted (Naughty)  |
|--|--|
|[Blockchain](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/blockchain.dat)  |[Blockchain](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/blockchain-back-to-original.dat)  |
|[Blockchain Hexdump](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/blockchain.dump) |[Blockchain Hexdump](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/blockchain-back-to-original.dump) |
|[PDF](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/000000000001f9b3-1-nice.pdf) |[PDF](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/000000000001f9b3-1-naughty.pdf) |

The modified block (#129459) has the same MD5 hash (so that the Blockchain is still healthy) and a SHA256 hash of **fff054f33c2134e0230efb29dad515064ac97aa8c68d33c58c01213a0d408afb**.

A Perl script automating all this work is described in part one.

**Comment:**
Interestingly the Elf states that the Jack's score is 4.294.935.958 (0xffff8596) whereas in the Blockchain the score is 0xffffffff. I assume that this is just a mistake.

## Fun Zone

A browser based [toolbox](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/Frostys-Toolbox.html) for analyzing and tampering this Blockchain (which also allows the download of the full tampered Blockchain and every single evidence) is available [here](https://joergschwarzwaelder.github.io/Frostys-Toolbox.html).
Screenshot of the toolbox:
![toolbox](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/Frostys-Toolbox.png)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIwNzI1NTYzMSwxNzM1ODYxMTMxLC0yMD
gzNzc4MDI2LDQyMDMwMjQ5MywtMTU2Mzg5MTAxMCwyMzI2MzUw
MSwtNjk3ODU1MDMzLDE5OTgwOTI0NTEsLTIxMTY1MTk0OTIsLT
IwNjQwODc2ODQsLTU5NTExMDA5OCw4OTU5ODk3NzgsMTE5OTIy
MTg2NiwzNjEyNDc3MjYsLTE3OTMzOTc0ODAsNjgwMjU5Miw0Nj
YyOTQ3NjAsMzQ3NTM0NzM2LDQ3MzI5MDU2MCwxNDY4OTQ3MTgz
XX0=
-->