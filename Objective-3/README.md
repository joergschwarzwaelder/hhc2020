# Objective 3: Point-of-Sale Password Recovery
Location: Courtyard

The objective is to find the password for the Santa shop software.
The .exe-File for the Santa Shop can be downloaded from [here](https://download.holidayhackchallenge.com/2020/santa-shop/santa-shop.exe)
and was extracted using 7-ZIP just like the contained file $PLUGINSDIR/app-64.7z.
Then a `find . -exec grep -i password \{\} \; -ls` shows, that in `./app-64/resources/app.asar` something related might reside.
Finally a `strings app-64/resources/app.asar | grep -i password` finds the line:

    const SANTA_PASSWORD = 'santapass';
So the password is **santapass**.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTY4ODc4ODI3LC0yMDk0NjgwNzM1LDY3Nz
M4Nzg1M119
-->