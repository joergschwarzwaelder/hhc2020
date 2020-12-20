# Objective 2: Investigate S3 Bucket
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
elf@7c1c2bcf55ec:~/bucket_finder$
Bucket santa redirects to: santa.s3.amazonaws.com
http://santa.s3.amazonaws.com/
        Bucket found but access denied: santa
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
            

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTUwMTU0MDc2Ml19
-->