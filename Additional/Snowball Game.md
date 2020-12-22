# Snowball Game
Location: Speaker Unprep

The objective of the Snowball game is to win the game on difficulty level "impossible".
Basically only "easy" and "impossible" were used to complete this objective.

On "easy" the user is able to provide a seed value which is used by the server to determine the board layout. Providing the same seed value does always lead to the same board layout.

On "impossible" it is not possible to provide this seed value. Instead there are in the HTML comments the last 624 random values, which were generated prior to creating the seed for the current game.
In the hints for this game is a [talk of Tom Liston covering Mersenne Twister based PRNGs ](https://www.youtube.com/watch?v=Jo5Nlbqd-Vg) along with [sample Python code](https://github.com/tliston/mt19937) for predicting the next random values if you know the last 624 ones.
This script was slightly [modified](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Additional/mt19937-jsw.py) to consume the HTML comments in order to populate the Mersenne Twister PRNG with the last 624 values to restore the PRNG state prior to seed creation. The next random value is then printed out.

This next random value is the seed of the board layout.
Using this seed value on level "easy" in a new browser tab gives information about the board layout. Every hit on "easy" is then also replicated on the level "impossible".

## Fun Zone

A [Tampermonkey script](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Additional/snowball.tampermonkey) was created to automate this task.
Here is a [video](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Additional/Holiday%20Hack%20Challenge%202020%20-%20Snowball%20-%20Marie.webm) of Marie in action solving the game on "impossible".
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEzMDY4NjcyNjEsMzU5NjMwNTgzLC0xMT
IxOTM5NTQsLTIwMTczMTgyNjksNzMwOTk4MTE2XX0=
-->