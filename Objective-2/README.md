# Objective 2: Investigate S3 Bucket
Location: Front Lawn

The objective is to unwrap an over-wrapped file and find the text string inside.
```
elf@7c1c2bcf55ec:~$ cd bucket_finder/
elf@7c1c2bcf55ec:~/bucket_finder$ ./bucket_finder.rb --log-file bucket.out wordlist
http://s3.amazonaws.com/kringlecastle
Bucket found but access denied: kringlecastle
http://s3.amazonaws.com/wrapper
Bucket found but access denied: wrapper
http://s3.amazonaws.com/santa
Bucket santa redirects to: santa.s3.amazonaws.com
http://santa.s3.amazonaws.com/
        Bucket found but access denied: santa
```
Using the hint to `Wrapper3000` and taking into consideration that AWS bucket names may only contain lower case characters
elf@7c1c2bcf55ec:~/bucket_finder$ echo wrapper3000 >> wordlist
elf@7c1c2bcf55ec:~/bucket_finder$ ./bucket_finder.rb --log-file bucket.out wordlist
http://s3.amazonaws.com/kringlecastle
Bucket found but access denied: kringlecastle
http://s3.amazonaws.com/wrapper
Bucket found but access denied: wrapper
http://s3.amazonaws.com/santa  
Bucket santa redirects to: santa.s3.amazonaws.com
http://santa.s3.amazonaws.com/
        Bucket found but access denied: santa
http://s3.amazonaws.com/wrapper3000
Bucket Found: wrapper3000 ( http://s3.amazonaws.com/wrapper3000 )
        <Public> http://s3.amazonaws.com/wrapper3000/package
elf@7c1c2bcf55ec:~/bucket_finder$ ./bucket_finder.rb --download --log-file bucket.out wordlist
http://s3.amazonaws.com/kringlecastle
Bucket found but access denied: kringlecastle
http://s3.amazonaws.com/wrapper
Bucket found but access denied: wrapper
http://s3.amazonaws.com/santa
Bucket santa redirects to: santa.s3.amazonaws.com
http://santa.s3.amazonaws.com/
        Bucket found but access denied: santa
http://s3.amazonaws.com/wrapper3000
Bucket Found: wrapper3000 ( http://s3.amazonaws.com/wrapper3000 )
        <Downloaded> http://s3.amazonaws.com/wrapper3000/package
elf@7c1c2bcf55ec:~/bucket_finder$ ls
README  bucket.out  bucket_finder.rb  wordlist  wrapper3000
elf@7c1c2bcf55ec:~/bucket_finder$ cd wrapper3000/
elf@7c1c2bcf55ec:~/bucket_finder/wrapper3000$ ls
package
elf@7c1c2bcf55ec:~/bucket_finder/wrapper3000$ file package
package: ASCII text, with very long lines
elf@7c1c2bcf55ec:~/bucket_finder/wrapper3000$ head -2 package
            
UEsDBAoAAAAAAIAwhFEbRT8anwEAAJ8BAAAcABwAcGFja2FnZS50eHQuWi54ei54eGQudGFyLmJ6MlVUCQADoBfKX6
AXyl91eAsAAQT2AQAABBQAAABCWmg5MUFZJlNZ2ktivwABHv+Q3hASgGSn//AvBxDwf/xe0gQAAAgwAVmkYRTKe1PV
M9U0ekMg2poAAAGgPUPUGqehhCMSgaBoAD1NNAAAAyEmJpR5QGg0bSPU/VA0eo9IaHqBkxw2YZK2NUASOegDIzwMXM
HBCFACgIEvQ2Jrg8V50tDjh61Pt3Q8CmgpFFunc1Ipui+SqsYB04M/gWKKc0Vs2DXkzeJmiktINqjo3JjKAA4dLgLt
PN15oADLe80tnfLGXhIWaJMiEeSX992uxodRJ6EAzIFzqSbWtnNqCTEDML9AK7HHSzyyBYKwCFBVJh17T636a6Ygyj
X0eE0IsCbjcBkRPgkKz6q0okb1sWicMaky2Mgsqw2nUm5ayPHUeIktnBIvkiUWxYEiRs5nFOM8MTk8SitV7lcxOKst
2QedSxZ851ceDQexsLsJ3C89Z/gQ6Xn6KBKqFsKyTkaqO+1FgmImtHKoJkMctd2B9JkcwvMr+hWIEcIQjAZGhSKYNP
xHJFqJ3t32Vjgn/OGdQJiIHv4u5IpwoSG0lsV+UEsBAh4DCgAAAAAAgDCEURtFPxqfAQAAnwEAABwAGAAAAAAAAAAA
AKSBAAAAAHBhY2thZ2UudHh0LloueHoueHhkLnRhci5iejJVVAUAA6AXyl91eAsAAQT2AQAABBQAAABQSwUGAAAAAA
EAAQBiAAAA9QEAAAAA
elf@7c1c2bcf55ec:~/bucket_finder/wrapper3000$ base64 -d package > package.bin
elf@7c1c2bcf55ec:~/bucket_finder/wrapper3000$ file package.bin
package.bin: Zip archive data, at least v1.0 to extract
elf@7c1c2bcf55ec:~/bucket_finder/wrapper3000$ unzip package.bin
Archive:  package.bin
 extracting: package.txt.Z.xz.xxd.tar.bz2
elf@7c1c2bcf55ec:~/bucket_finder/wrapper3000$ bzcat package.txt.Z.xz.xxd.tar.bz2 | tar xf -
elf@7c1c2bcf55ec:~/bucket_finder/wrapper3000$ xxd -r package.txt.Z.xz.xxd | xz -d | uncompress
North Pole: The Frostiest Place on Earth
elf@7c1c2bcf55ec:~/bucket_finder/wrapper3000$
```
So the text in the package is **North Pole: The Frostiest Place on Earth**

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTgyMTc2NjM3NSwxNzg2Nzg5ODEyXX0=
-->