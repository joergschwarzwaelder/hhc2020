#!/bin/bash
echo -n a  | ./lights & 
pid=$!
echo "$pid"
grep rw-p /proc/$pid/maps \
| sed -n 's/^\([0-9a-f]*\)-\([0-9a-f]*\) .*$/\1 \2/p' \
| while read start stop; do \
    gdb --batch --pid $pid -ex \
        "dump memory $pid-$start-$stop.dump 0x$start 0x$stop"; \
done
