# Snowball Game
Location: Speaker Unprep

The objective of the Snowball game is to win the game on difficulty level "impossible".
Basically only "easy" and "impossible" were used to complete this objective.

On "easy" the user is able to provide a seed value which is used by the server to determine the board layout. Providing the same seed value does always lead to the same board layout.

On "impossible" it is not possible to provide this seed value. Instead there are in the HTML comments the last 624 random values, which were generated prior to creating the seed for the current game.

## Approach 1: Seed Prediction
In the hints for this game is a [talk of Tom Liston covering Mersenne Twister based PRNGs ](https://www.youtube.com/watch?v=Jo5Nlbqd-Vg) along with [sample Python code](https://github.com/tliston/mt19937) for predicting the next random values if you know the last 624 ones.
This script was slightly [modified](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Additional/mt19937-jsw.py) to consume the HTML comments in order to populate the Mersenne Twister PRNG with the last 624 values to restore the PRNG state prior to seed creation. The next random value is then printed out.

This next random value is the seed of the board layout.
Using this seed value on level "easy" in a new browser tab gives information about the board layout. Every hit on "easy" is then manually also replicated on the level "impossible".

## Approach 2: Web Socket Vulnerability
It seems that the secret for the board layout is hidden in the WhitewashCookie. So the following steps can be taken to win the game on "impossible":
 - Setup Burp suite to intercept your traffic to the Snowball game
 - Open two browser tabs with the Snowball game start page (to get the achievement the first tab has to be the in-game Snowball game).
 - On tab 1: Start the game on "impossible". When you see the HTTP request for establishing the Game panel `/game`, take note of the value of the `WhitewashCookie` like:
```
WhitewashCookie=.eJyVUctugzAQ_BeffVgbcCzOtEqlqoc2NysHK3EaJCARhINV9d9rBkIeSinVSiN7dlizM18sy3e7fNMWJ89S4uypcqV_tf7QnlhqDPG-BArnNR_Zq5rFXk8QI_OYpT9Z-oUVY0392XrY9WOfH5tuVaO5ClrNE2AMjIAyqI2JwSVABVwE7DqEG-FLClN6tYBaQC3ARXgh7hTh-ec6d9W2eOD2fF_nbMqN-Ad7mzhmT8y983rK7fO6F8PVYGUCVMAFUMMuCU6iL6GVIZCucx9SzxFu4iYyQggEw1dtXbGUHQvrXc34cHjJArdsP_fvtmoOZVb7ZmsLN_bfbOmCQkoVJaR1HLHvH9LexR0.X-tZMQ.cIwH76HVoT1cll7VMVZo1Nux3Uk
```
 - On tab 2: Start the game on "impossible". When you see the HTTP request for establishing the Web Socket, inject the cookie value of the previous step
 - Your two game sessions will now have the same board layout.
 - You can now systematically check all fields on tab 2 and replicate all hits to tab 1.
 - When you lose the game on tab 2, just restart the game injecting again the noted cookie and continue where you left off.

## Fun Zone

A [Tampermonkey script](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Additional/snowball1-tampermonkey.js) was created to automate approach 1. This script launches the second game on a new browser tab so that the progress can be tracked.
Here is a [video](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Additional/Holiday%20Hack%20Challenge%202020%20-%20Snowball%20-%20Marie.webm) of Marie in action solving the game on "impossible".
A [second Tampermonkey script](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Additional/showball3-tampermonkey.js) was created which does not launch a new game in a second browser tab. Instead the script itself establishes the second game Web Socket and plays in the background without being visible.


For approach 2 also a [Tampermonkey script](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Additional/snowball2-tampermonkey.js) is available. Also a [video](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Additional/Holiday%20Hack%20Challenge%202020%20-%20Snowball%20-%20Marie%20on%20Steroids.webm) of Marie in action is available for this second approach.
<!--stackedit_data:
eyJoaXN0b3J5IjpbNzg5NjQ0NTE1LC0xMjM2ODE3NzU2LDkxMz
gzODY4MiwtNjY1MDQ4MTU1LDE5NDQxMDc3NzgsLTE0MTQ3MTY1
OTAsLTU0Mjk5NTAsLTUwODk2MDE0LDM1OTYzMDU4MywtMTEyMT
kzOTU0LC0yMDE3MzE4MjY5LDczMDk5ODExNl19
-->