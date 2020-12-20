# Objective 3: Point-of-Sale Password Recovery
The objective is to find the password for the Santa shop software.
The .exe-File for the Santa Shop can be downloaded from [here](https://download.holidayhackchallenge.com/2020/santa-shop/santa-shop.exe)
The file was installed in a VM and it was found that the password was in clear text in file santa-shop/resources/app.asar:

    const SANTA_PASSWORD = 'santapass';
So the password is **santapass**.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIwOTQ2ODA3MzUsNjc3Mzg3ODUzXX0=
-->