# Objective 5: Open HID Lock
The Proxmark reader can be operated with the command "lf hid read" to read out badges in proximity.

The following badges were found in game:
|Elf  |Where  |Tag|
|--|--|--|
|Bow Ninecandle  | Talks |#db# TAG ID: 2006e22f0e (6023) - Format Len: 26 bit - FC: 113 - Card: 6023|
|Sparkle Redberry  | Entry  |#db# TAG ID: 2006e22f0d (6022) - Format Len: 26 bit - FC: 113 - Card: 6022|
|Holly Evergreen  |Kitchen |#db# TAG ID: 2006e22f10 (6024) - Format Len: 26 bit - FC: 113 - Card: 6024|
|Shinny Upatree  |outside  |#db# TAG ID: 2006e22f13 (6025) - Format Len: 26 bit - FC: 113 - Card: 6025|
|Noel Boetie  |Wrapping Room  |#db# TAG ID: 2006e22ee1 (6000) - Format Len: 26 bit - FC: 113 - Card: 6000|

The Proxmark device is then able to simulate a badge using 

    lf hid sim -r <id>

It was found that the badge of Bow Ninecandle opens the HID lock in the workshop.


<!--stackedit_data:
eyJoaXN0b3J5IjpbLTExMTI5NDg2ODIsLTE4MDU0NzQ5NjYsLT
QzNTY0ODQ5Niw2MjI5OTQ5NTVdfQ==
-->