#!/usr/bin/perl
use strict;

my $file="vending-machines.json";

my $password=`grep password ../$file`;
($password)=($password=~/^.*: "(.*)"/);

my $solved=" " x length($password);

foreach my $i ('0'..'9','a'..'z','A'..'Z'){
  unlink $file;
  open(F,"|./vending-machines > /dev/null 2>&1");
  printf F "%s\n",$i x 8;
  printf F "%s\n",$i x 8;
  printf F "\n";
  close F;
  my $t=`grep password $file`;
  ($t)=($t=~/^.*: "(.*)"/);
  printf "%s - %s",$i,$t;

  for(my $c=0;$c<length($password);$c++){
    if(substr($password,$c,1) eq substr($t,$c%8,1)){
      substr($solved,$c,1)=$i;
      substr($password,$c,1)=" ";
    }
  }
  printf " - *$solved*\r";
  last unless($solved=~/ /);
}

 print "\n\nFinally: *".$solved."*\n";
