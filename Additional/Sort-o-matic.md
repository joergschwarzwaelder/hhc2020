# Sort-o-matic
Location: Workshop

1. Matches at least one digit:
`\d`
2. Matches 3 alpha a-z characters ignoring case:
`[a-zA-Z]{3}`
3. Matches 2 chars of lowercase a-z or numbers:
`[a-z0-9]{2}`
4. Matches any 2 chars not uppercase A-L or 1-5:
`[^A-L1-5]{2}`
5: ^\d{3,}$
6: ^(0?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$
7: ^([A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2}$
8: ^([0][1-9]|[12][0-9]|3[01])[/\.-](0[1-9]|1[0-2])[/\.-]\d{4}$

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTUzNDM3NjU1OSwtMzY4OTc3NDQ2XX0=
-->