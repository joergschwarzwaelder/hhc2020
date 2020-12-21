# Snowball Game
The objective of the Snowball game is to win the game on difficulty level "impossible".
Basically only "easy" and "impossible" were used to complete this objective.

On "easy" the user is able to provide a seed value which is used to determine the board layout. Providing the same seed value does always leads to the same board layout.
On "impossible" it is not possible to provide this seed value. In the HTML comments are the 624 random values, which were generated prior to create the seed for the current game.
In the hints for this game is a [talk of Tom Liston covering Mersenne Twister based PRNG ](https://www.youtube.com/watch?v=Jo5Nlbqd-Vg) along with [sample Python code](https://github.com/tliston/mt19937) for predicting the next random values if you know the last 624 ones (covering 32bit PRNG).
This script was use to populate a Mersenne Twister PRNG with the last 624 value to restore the PRNG state on the server side.
Then the next random value is the seed of the board layout.
Using this seed value on level "easy" in a new browser tab gives information about the board layout. Every hit on "easy" is then also performed on the level "impossible".

A Tampermonkey script
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTQ3NjM5MzU0MSwtMjAxNzMxODI2OSw3Mz
A5OTgxMTZdfQ==
-->