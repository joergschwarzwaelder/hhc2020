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
This is documented as [approach 2 of Objective 4](https://github.com/joergschwarzwaelder/hhc2020/tree/master/Objective-4).

## Approach 3
This is documented as [approach 3 of Objective 4](https://github.com/joergschwarzwaelder/hhc2020/tree/master/Objective-4).
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEyMzQ4MjM4OTksMTY2NjU5NDU2Niw1OT
EzNjQ3MzgsODE1NjYzODcyLC0xODQxOTI2MzcwLDg1ODU0Njg4
MSwtMTc0OTg5NjY3XX0=
-->