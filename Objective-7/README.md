# Objective 7: Solve the Sleigh's CAN-D-BUS Problem

Santa's sleigh behaves strange and is hard to operate.
The objective is to analyze the CAN-D-Bus messages and filter out messages which seem to be injected by Jack Frost.

By setting the filters and operating the sleigh it was possible to find the following legitimate message definitions:
|Type|ID  |Comment|
|--|--|--|
|Lock  | 19B#000000000000 ||
|Unlock  | 19B#00000F000000 ||
|Stop  | 02A#0000FF ||
|Start  | 02A#00FF00 ||
|Engine Revolutions  | 244#0000000000 ||
|Steering Wheel  | 019#00000000 |positiv|
|Brake  | 080#000000 |non negative values |


<!--stackedit_data:
eyJoaXN0b3J5IjpbMTgwMzA4MDA3Niw1Njg2MDIwNTddfQ==
-->