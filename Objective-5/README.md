# Objective 5: Open HID Lock
Location: Workshop

The Proxmark reader can be operated with the command `lf hid read` to read out badges in proximity.

The following badges were found in game:
|Elf  |Where  |Tag|
|--|--|--|
|Shinny Upatree  |Front Lawn  |#db# TAG ID: 2006e22f13 (6025) - Format Len: 26 bit - FC: 113 - Card: 6025|
|Sparkle Redberry  | Front Lawn  |#db# TAG ID: 2006e22f0d (6022) - Format Len: 26 bit - FC: 113 - Card: 6022|
|Holly Evergreen  |Kitchen |#db# TAG ID: 2006e22f10 (6024) - Format Len: 26 bit - FC: 113 - Card: 6024|
|Angel Candysalt  |Great Room  |#db# TAG ID: 2006e22f31 (6040) - Format Len: 26 bit - FC: 113 - Card: 6040|
|Noel Boetie  |Wrapping Room  |#db# TAG ID: 2006e22ee1 (6000) - Format Len: 26 bit - FC: 113 - Card: 6000|
|Bow Ninecandle  | Talks |#db# TAG ID: 2006e22f0e (6023) - Format Len: 26 bit - FC: 113 - Card: 6023|


The Proxmark device is then able to simulate a badge using 

    lf hid sim -r <id>

It was found that the badge of Bow Ninecandle (ID: 2006e22f0e) opens the HID lock in the workshop.


<!--stackedit_data:
eyJoaXN0b3J5IjpbOTAxNjk1NzQ0LC0yMzk4MTUwMzUsLTYwNT
YzNDg0NywtMjA1NTczMDcwLC0xODA1NDc0OTY2LC00MzU2NDg0
OTYsNjIyOTk0OTU1XX0=
-->