# Objective 11: Naughty/Nice List with Blockchain Investigation
Location: Santa's Office

The Blockchain to be investigated was provided by an Elf.
It uses MD5 as hashing algorithm. Some Elves saw that Jack Frost's entry in this Blockchain was set to "Naughty" in the past and now it is set to "Nice". They suppose that Jack tampered his Block on the Blockchain.
Each single block has this data structure:

![data structure ](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/Blockchain%20Definition.png)


## Objective 11a: Part 1

The provided Blockchain data contains the blocks with serials #128449-#129996. The objective is to predict the nonce of block #130000.
In the hints is a [talk of Tom Liston covering Mersenne Twister based PRNG ](https://www.youtube.com/watch?v=Jo5Nlbqd-Vg) along with [sample Python code](https://github.com/tliston/mt19937) for predicting the next random values if you know the last 624 ones (covering 32 Bit PRNG).
As the nonces in the Blockchain are 64 Bit it was found they were created by using two 32 Bit random values (first one for the lower 32 Bit, second one for the upper 32 Bit).
The prediction works just the same: The nonces of the last 312 blocks of the Blockchain were split into lower and upper half and pre-loaded into the Mersenne Twister.
The next 6 32 Bit random values out of this prepared PRNG are part of the nonces for #129997-#129999.
Then finally the next two are lower and upper half of the nonce for block #130000 -> **57066318 f32f729d**


## Objective 11b: Part 2

The objective is to modify Jack Frosts block back from Nice to Naughty and to make available the hidden PDF pages by changing only four bytes.
MD5 works using chunks of 64 bytes. It is possible increase a value at offset #n of block #m without changing the MD5 hash by also decreasing the value at offset #n of block #m+1 (entangled values) (this does not work in general; it is only possible for certain byte offsets and bit positions https://github.com/corkami/collisions/blob/master/unicoll.md)
With this information the naughty/nice value can be changed from "1" (Nice) to "0" (Naughty) and one specific value in the PDF document from "2" to "3" (to make the original naughty messages visible).
As compensating measure (to have the MD5 hash stay the same) the entangled values have to be changed accordingly.

Tampering the Naughty/Nice value
> 163070 66 66 66 66 66 **31** 66 66 30 30 30 30 30 30 36 63

> 163070 66 66 66 66 66 **30** 66 66 30 30 30 30 30 30 36 63

and the entangled value with an offset of 64 bytes:
> 1630b0 6f cb 0f 18 8d **d6** 03 88 bf 20 35 0f 2a 91 c2 9d

> 1630b0 6f cb 0f 18 8d **d7** 03 88 bf 20 35 0f 2a 91 c2 9d

Tampering the PDF making available the hidden content
> 163130 61 67 65 73 20 **32** 20 30 20 52 20 20 20 20 20 20

> 163130 61 67 65 73 20 **33** 20 30 20 52 20 20 20 20 20 20

and the entangled value with an offset of 64 bytes
> 163170 03 b9 ef 95 99 **1c** 5b 49 9f 86 dc 85 39 85 90 99

> 163170 03 b9 ef 95 99 **1b** 5b 49 9f 86 dc 85 39 85 90 99

Basically for tampering the PDF document it would also have been possible to use the position in the previous 64 byte block as entangled value. Unfortunately this position holds the lowest byte of the length field for the PDF document, so changing *only* this value (as an entangled value) would destroy the Blockchain.

The original and reverted files can be found in the below table.
In addition the [hex dump diff](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/blockchain-naughty-nice-diff.dump) is provided.

|Original (Nice)|Reverted (Naughty)  |
|--|--|
|[Blockchain](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/blockchain.dat)  |[Blockchain](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/blockchain-back-to-original.dat)  |
|[Blockchain Hexdump](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/blockchain.dump) |[Blockchain Hexdump](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/blockchain-back-to-original.dump) |
|[PDF](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/000000000001f9b3-1-nice.pdf) |[PDF](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/000000000001f9b3-1-naughty.pdf) |

The modified block (#129459) has the same MD5 hash (so that the Blockchain is still healthy) and a SHA256 hash of **fff054f33c2134e0230efb29dad515064ac97aa8c68d33c58c01213a0d408afb**.

## Fun Zone

A [toolbox](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/Frostys-Toolbox.html) for analyzing and tampering this Blockchain (which also allows the download of the full tampered Blockchain and every single evidence) is available.
Screenshot of the toolbox:
![toolbox](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/Frostys-Toolbox.png)
<!--stackedit_data:
eyJoaXN0b3J5IjpbMzYxMjQ3NzI2LC0xNzkzMzk3NDgwLDY4MD
I1OTIsNDY2Mjk0NzYwLDM0NzUzNDczNiw0NzMyOTA1NjAsMTQ2
ODk0NzE4MywtOTk5NzY0NTA3LDE4MDk3ODM2NiwxMTI3NzIyND
c2LDE3NTU4ODg1NzFdfQ==
-->