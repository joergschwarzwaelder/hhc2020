Objective 11: Naughty/Nice List with Blockchain Investigation

The Blockchain to be investigated was provided by an Elf.
It uses MD5 as hashing algorithm.



11b: Part 2

The objective is to modify Jack Frosts block back from Nice to Naughty and to make available the hidden PDF pages by changing only four bytes.
MD5 works using chunks of 64 bytes. It is possible increase a value at offset #n of block #m without 

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
eyJoaXN0b3J5IjpbMjkxNzQ3MzkxLC01OTQxOTA1MjEsOTM5ND
UzODc0LDM3MDI1MjY3NF19
-->