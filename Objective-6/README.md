# Objective 6: Splunk Challenge

Splunk Training Questions:

1. How many distinct MITRE ATT&CK techniques did Alice emulate?
→ `| eventcount summarize=false index=* | dedup index | fields index`
**13**
2. What are the names of the two indexes that contain the results of emulating Enterprise ATT&CK technique 1059.003? (Put them in alphabetical order and separate them with a space)
**t1059.003-main t1059.003-win**
3. One technique that Santa had us simulate deals with 'system information discovery'. What is the full name of the registry key that is queried to determine the MachineGuid?
→ "system information discovery" is t1082 in the MITRA ATT&CK techniques
**HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Cryptography**
4. According to events recorded by the Splunk Attack Range, when was the first2b7e151628aed2a6abf71589 OSTAP related atomic test executed? (Please provide the alphanumeric UTC timestamp.)
→ `index=attack`
**2020-11-30T17:44:15Z**
5. One Atomic Red Team test executed by the Attack Range makes use of an open source package authored by frgnca on GitHub. According to Sysmon (Event Code 1) events in Splunk, what was the ProcessId associated with the first use of this component?
→ `index=* EventCode=1  *AudioDevice*`
**3648**
6. Alice ran a simulation of an attacker abusing Windows registry run keys. This technique leveraged a multi-line batch file that was also used by a few other techniques. What is the final command of this multi-line batch file used as part of this simulation?
The batch file can be found at [https://raw.githubusercontent.com/redcanaryco/atomic-red-team/master/ARTifacts/Misc/Discovery.bat](https://raw.githubusercontent.com/redcanaryco/atomic-red-team/master/ARTifacts/Misc/Discovery.bat)
The last command in this batch file is
**quser**
7. According to x509 certificate events captured by Zeek (formerly Bro), what is the serial number of the TLS certificate assigned to the Windows domain controller in the attack range?
→ `index=* *serial*`
**55FCEEBB21270D9249E86F4B9DC7AA60**
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEzOTY0NDI0OTAsLTE5NTIzNTA3NTQsLT
E1NTE2ODUxNDJdfQ==
-->