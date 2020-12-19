# Objective 11: Naughty/Nice List with Blockchain Investigation

The Blockchain to be investigated was provided by an Elf.
It uses MD5 as hashing algorithm. Some Elves saw that JAck Frosts entry in this Blockchain was set to "Naughty" in the past and now it is "Nice". They suppose that Jack tampered his Block on the Blockchain.
The provided Blockchain data contains the blocks with serials #128449-#129996. The objective is to predict the nonce of block #

## 11a: Part 1
The objective is to predict

## 11b: Part 2

The objective is to modify Jack Frosts block back from Nice to Naughty and to make available the hidden PDF pages by changing only four bytes.
MD5 works using chunks of 64 bytes. It is possible increase a value at offset #n of block #m without changing the MD5 hash by also decreasing the value at offset #n of block #m+1 (entangled values).
With this information the naughty/nice value can be changed from "1" (Nice) to "0" (Naughty) and one specific value in the PDF document from "2" to "3".
As compensating measure (to have the MD5 hash stay the same) the entangled values have to be changed accordingly.

A [toolbox](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-11/Frostys-Toolbox.html) for analyzing and tampering this Blockchain (which also allows the download of the full tampered Blockchain and every single evidence) is available; also hosted [here](https://joergschwarzwaelder.github.io/d93ad9aa555b3b01a32fb0d102509bae8f3080072892b667298c089c0baa1244/Objective11/Frostys-Toolbox.html) for easy use.

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

<!--stackedit_data:
eyJoaXN0b3J5IjpbNzQ0ODYyMTQ0LDM2MTUwNDMyMCwtNTk0MT
kwNTIxLDkzOTQ1Mzg3NCwzNzAyNTI2NzRdfQ==
-->