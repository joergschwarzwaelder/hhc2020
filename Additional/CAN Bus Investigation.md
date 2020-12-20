## CAN Bus Investigation
Using cut it is possible to determine that " 19B" is the LOCK/UNLOCK signal which is supposed to appear three times in the log .


    elf@7b2ad8c74795:~$ grep ' 19B' candump.log**
    (1608926664.626448) vcan0 19B#000000000000
    (1608926671.122520) vcan0 19B#00000F000000
    (1608926674.092148) vcan0 19B#000000000000

As the objective says that there are one UNLOCK and two LOCK signals, the decimal portion to be submitted is **122520**.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTkyMDAzNTAxMywtODEyNjA4NjgzLDE1Nz
YwNjc1MTBdfQ==
-->