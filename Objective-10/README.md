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

in the Browser it is possible to use the Santavator without having Santa's fingerprint.

![post-change](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-10/post-change.png)
## Approach 2
This is documented [here](https://github.com/joergschwarzwaelder/hhc2020/tree/master/Objective-4#approach-2).
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTkxMzY0NzM4LDgxNTY2Mzg3MiwtMTg0MT
kyNjM3MCw4NTg1NDY4ODEsLTE3NDk4OTY2N119
-->