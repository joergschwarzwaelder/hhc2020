# Speaker UNPrep
The objective is to find the passwords used by the scripts "lights" and "vending-machines".

## lights
The application lights show this message after startup:

    >>> CONFIGURATION FILE LOADED, SELECT FIELDS DECRYPTED:

This is an indicator that this application does not hash the passwords - they are encrypted instead. And it seems that that password get unencrypted upon start, so that the password is in clear test in the process memory.

By using the script get_lights_password.sh is was possible to dump the process memory and to find the password in clear text.



## vending-machines

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTMwOTI2OTY5M119
-->