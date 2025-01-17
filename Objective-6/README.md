# Objective 6: Splunk Challenge
Location: Great Room

Splunk Training Questions:

1. How many distinct MITRE ATT&CK techniques did Alice emulate?
→ `| eventcount summarize=false index=* | dedup index | fields index`
**13**
2. What are the names of the two indexes that contain the results of emulating Enterprise ATT&CK technique 1059.003? (Put them in alphabetical order and separate them with a space)
**t1059.003-main t1059.003-win**
3. One technique that Santa had us simulate deals with 'system information discovery'. What is the full name of the registry key that is queried to determine the MachineGuid?
→ "system information discovery" is t1082 in the MITRA ATT&CK techniques, `index=t1082-win *MachineGuid*`
**HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Cryptography**
4. According to events recorded by the Splunk Attack Range, when was the first OSTAP related atomic test executed? (Please provide the alphanumeric UTC timestamp.)
→ `index=attack *OSTAP* | sort 1 _time`
**2020-11-30T17:44:15Z**
5. One Atomic Red Team test executed by the Attack Range makes use of an open source package authored by frgnca on GitHub. According to Sysmon (Event Code 1) events in Splunk, what was the ProcessId associated with the first use of this component?
→ `index=* EventCode=1  *AudioDevice*`
**3648**
6. Alice ran a simulation of an attacker abusing Windows registry run keys. This technique leveraged a multi-line batch file that was also used by a few other techniques. What is the final command of this multi-line batch file used as part of this simulation?
The batch file can be found at [https://raw.githubusercontent.com/redcanaryco/atomic-red-team/master/ARTifacts/Misc/Discovery.bat](https://raw.githubusercontent.com/redcanaryco/atomic-red-team/master/ARTifacts/Misc/Discovery.bat)
The last command in this batch file is
**quser**
7. According to x509 certificate events captured by Zeek (formerly Bro), what is the serial number of the TLS certificate assigned to the Windows domain controller in the attack range?
→ `index=* "certificate.serial"="*" host=zeek *attackrange* *dc*`
**55FCEEBB21270D9249E86F4B9DC7AA60**

> Final question: This last one is encrypted using your favorite phrase!
> The base64 encoded ciphertext is: 7FXjP1lyfKbyDK/MChyf36h7 It's
> encrypted with an old algorithm that uses a key. We don't care about
> RFC 7465 up here! I leave it to the elves to determine which one! I
> can't believe the Splunk folks put it in their talk!

The reference to [RFC 7465](https://tools.ietf.org/html/rfc7465) (Prohibiting RC4 Cipher Suites) gives an idea on the used Cipher. The KringleCon [Splunk talk](https://youtu.be/RxVgEFt08kU?t=1121) shows the passphrase `Stay Frosty`.
[Decoding](https://github.com/joergschwarzwaelder/hhc2020/blob/master/Objective-6/CyberChef.png) in [CyberChef](https://gchq.github.io/CyberChef/) shows the solution: **The Lollipop Guild**

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE4MzU4NDkwOSw4NzAyMDc2NTcsMTg1MT
YyNTMyMCw0MTUxMjE5MjMsMTUwNDIzODY1Nyw0NTM1NDY2OTcs
LTQzMTE1MDg4MCw2MzY2MzMwODMsMjcwMjA3OTc3LC0xOTUyMz
UwNzU0LC0xNTUxNjg1MTQyXX0=
-->