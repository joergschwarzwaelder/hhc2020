# Objective 10: Defeat Fingerprint Sensor

The objective is to enter Santa's office by defeating the fingerprint sensor in the Santavator.
The sensor status is evaluated in the browser in a Javascript:

![pre-change](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-10/pre-change.png)
By changing line 354 of app.js in the Browser it is possible to use the Santavator without having Santa's fingerprint.
`if (btn4.classList.contains('powered') && hasToken('besanta')) {
`
to
`if (1) {
`

![post-change](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-10/post-change.png)
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTQ0MjU3ODY2Miw4NTg1NDY4ODEsLTE3ND
k4OTY2N119
-->