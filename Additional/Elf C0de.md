# Elf C0de
The objective is to navigate the Elf using Javascript through each level.

## Level 1
```
elf.moveLeft(10)
elf.moveUp(10)
```
## Level 2
```
elf.moveLeft(6)
var s=elf.get_lever(0)+2
elf.pull_lever(s)
elf.moveLeft(4)
elf.moveUp(10)
```
## Level 3
```
elf.moveTo(lollipop[0])
elf.moveTo(lollipop[1])
elf.moveTo(lollipop[2])
elf.moveUp(1)
```
## Level 4
```
for (var i = 0; i < 2; i++) {
  elf.moveLeft(3)
  elf.moveUp(20)
  elf.moveTo(lollipop[0])
}
elf.moveTo(lollipop[0])
elf.moveUp(10)
```
## Level 5
```
elf.moveTo(lollipop[1])
elf.moveTo(lollipop[0])
var a = elf.ask_munch(0)
for (var i = 0; i < a.length;) {
  if (a[i] !== parseInt(a[i], 10)) {
    a.splice(i, 1);
  } else i++;
}
elf.tell_munch(a)
elf.moveUp(2)
```
## Level 6
```
for (i = 0; i < 4; i++) {
  elf.moveTo(lollipop[i]);
}
elf.moveTo(lever[0])
var a = elf.get_lever(0)
a.unshift("munchkins rule")
elf.pull_lever(a)
elf.moveDown(5)
elf.moveLeft(6)
elf.moveUp(4)
```
## Level 7
```
for (var i = 0; i < 2; i++) {
  step(elf.moveDown,4 * i + 1,4*i)
  step(elf.moveLeft,4 * i + 2,4*i+1)
  step(elf.moveUp,4 * i + 3,4*i+2)
  step(elf.moveRight,4 * i + 4,4*i+3)
}
elf.moveUp(2)
elf.moveLeft(4)
elf.tell_munch(s)
 elf.moveUp(1)

    function step(f,a,b) {
      f(a)
      elf.pull_lever(b)
    }

    function sm(total, a) {
      return (typeof(a) === "object") ? total + a.reduce(sm, 0) : total + (a === parseInt(a, 10) ? a : 0);
    }

    function s(a) {
      return a.reduce(sm, 0)
    }
```

## Level 8
    var lv = 0;
    for (var i = 0; i < 3; i++) {
      lv = me(lv, 2 * i, elf.moveRight, 4 * i + 1)
      lv = me(lv, 2 * i + 1, elf.moveLeft, 4 * i + 3)
    }
    var a = elf.ask_munch(0)
    elf.tell_munch(scan)
    elf.moveRight(11)

    function me(lv, i1, f, i2) {
      lv += elf.get_lever(i1)
      f(i2)
      elf.pull_lever(lv)
      elf.moveUp(2)
      return lv
    }

    function lp(val, a) {
      for (key in a) {
        if (a[key] === "lollipop") return key
      }
      return val
    }

    function scan(a) {
      return a.reduce(lp, undefined)
    }

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEyMTE3Mjg3MjEsOTc2OTIwODldfQ==
-->