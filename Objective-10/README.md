# Objective 10: Defeat Fingerprint Sensor
Location: Santavator

## Approach 1
The objective is to enter Santa's office by defeating the fingerprint sensor in the Santavator.
The sensor status is evaluated in the browser in a Javascript:

![pre-change](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-10/pre-change.png)

By changing line 354 of app.js from

`if (btn4.classList.contains('powered') && hasToken('besanta')) {
`

to

`if (1) {
`

in the browser it is possible to use the Santavator without having Santa's fingerprint.

![post-change](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-10/post-change.png)
## Approach 2
This is documented as [approach 2 of Objective 4](https://github.com/joergschwarzwaelder/hhc2020/tree/master/Objective-4).

## Approach 3
This is documented as [approach 3 of Objective 4](https://github.com/joergschwarzwaelder/hhc2020/tree/master/Objective-4).
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIyNjgwNzU0NywtMTIzNDgyMzg5OSwxNj
Y2NTk0NTY2LDU5MTM2NDczOCw4MTU2NjM4NzIsLTE4NDE5MjYz
NzAsODU4NTQ2ODgxLC0xNzQ5ODk2NjddfQ==
-->