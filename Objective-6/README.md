# Objective 6: Splunk Challenge

Splunk Training Questions:

1. How many distinct MITRE ATT&CK techniques did Alice emulate?
→ `| eventcount summarize=false index=* | dedup index | fields index`
**13**
2. What are the names of the two indexes that contain the results of emulating Enterprise ATT&CK technique 1059.003? (Put them in alphabetical order and separate them with a space)
t1059.003-main t1059.003-win
3. One technique that Santa had us simulate deals with 'system information discovery'. What is the full name of the registry key that is queried to determine the MachineGuid?
→ "system information discovery" is t1082 in the MITRA ATT&CK techniques
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Cryptography
4. According to events recorded by the Splunk Attack Range, when was the first2b7e151628aed2a6abf71589 OSTAP related atomic test executed? (Please provide the alphanumeric UTC timestamp.)
→ index=attack
→ 2020-11-30T17:44:15Z
<!--stackedit_data:
eyJoaXN0b3J5IjpbNDM0ODMwMzQ2LC0xOTUyMzUwNzU0LC0xNT
UxNjg1MTQyXX0=
-->