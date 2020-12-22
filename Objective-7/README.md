# Objective 7: Solve the Sleigh's CAN-D-BUS Problem
Locatio

Santa's sleigh behaves strange and is hard to operate.
The objective is to analyze the CAN-D-Bus messages and filter out messages which seem to be injected by Jack Frost.

By setting the filters and operating the sleigh it was possible to find the following legitimate message definitions:
|Type|ID  |Comment|
|--|--|--|
|Lock  | 19B#000000000000 ||
|Unlock  | 19B#00000F000000 ||
|Stop  | 02A#0000FF ||
|Start  | 02A#00FF00 ||
|Engine Revolutions  | 244#0000000000 |non negative hex values|
|Steering Wheel  | 019#00000000 |positive and negative hex values|
|Brake  | 080#000000 |non negative hex values |

In addition these unknown messages were seen on the bus:
|ID  |
|--|
| 19B#0000000F2057 |
| 188#00000000 |

Finally "Brake" messages with a negative value were seen on the bus.
By excluding the unknown "19B" message and the "080" messages with a negative value it was possible to get the Sleigh operational again.

![CAN Bus filter](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-7/can-bus-filter.png)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQzODQ4NTEyMiwtODE3ODAyNDcsNTY4Nj
AyMDU3XX0=
-->