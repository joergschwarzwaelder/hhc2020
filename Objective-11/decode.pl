#!/usr/bin/perl

use Digest::MD5 qw(md5_hex);
use Digest::SHA qw(sha256_hex);

use Crypt::OpenSSL::RSA;
use strict;

my $cmd=shift @ARGV;

mkdir "content";
open my $fh, '<:raw','blockchain.dat';
my $bytes_read=read $fh,my $bytes,3000000;
my $i=0;
my $start;
while(length($bytes)>0){
  $bytes=dump_block2($bytes);
  $i++;
}

sub dump_block2{
  my $block=shift @_;
  my $start=0;
  my $serial=substr($block,$start+0,16);
  my $nonce=substr($block,$start+16,16);
  my $pid=substr($block,$start+32,16);
  my $rid=substr($block,$start+48,16);
  my $dcount=substr($block,$start+64,1);
  my $score=substr($block,$start+65,8);
  my $nice=substr($block,$start+73,1);
  printf "%d(#%d): Serial: %s\n",$i,hex($serial),$serial;
  printf "%d(#%d): nonce: %s\n",$i,hex($serial),$nonce;
  printf "%d(#%d): nonce lo: %s %d\n",$i,hex($serial),substr($nonce,8,8),hex(substr($nonce,8,8));
  printf "%d(#%d): nonce hi: %s %d\n",$i,hex($serial),substr($nonce,0,8),hex(substr($nonce,0,8));
  printf "%d(#%d): PID: %s, RID: %s\n",$i,hex($serial),$pid,$rid;
  printf "%d(#%d): DCount: %s\n",$i,hex($serial),$dcount;
  printf "%d(#%d): Score: %s, Nice: %s\n",$i,hex($serial),$score,$nice;
  $start+=74;
  for(my $j=0;$j<$dcount;$j++){
    my $type=substr($block,$start+0,2);
    my $length=substr($block,$start+2,8);
    printf "%d(#%d): Evidence #%d: Type: %s, Length: %s\n",$i,hex($serial),$j,$type,$length;
if($j==1){
    my $content=substr($block,$start+10,hex($length));
    open(my $writer, '>:raw',"content/$i-$j-$nice.pdf");
    printf $writer "%s",$content;
    close $writer;
}
    $start+=10+hex($length);
  }
  my $month=substr($block,$start+0,2);
  my $day=substr($block,$start+2,2);
  my $hour=substr($block,$start+4,2);
  my $minute=substr($block,$start+6,2);
  my $second=substr($block,$start+8,2);
  my $previoushash=substr($block,$start+10,32);
  printf "%d(#%d): (\@$start) added %s.%s %s:%s:%s\n",$i,hex($serial),$day,$month,$hour,$minute,$second;
  printf "%d(#%d): prev hash %s\n",$i,hex($serial),$previoushash;
  my $hash=substr($block,$start+42,32);
  my $sig=substr($block,$start+74,344);
  printf "%d(#%d): (\@%d) Hash: %s\n",$i,hex($serial),$start+42,$hash;
  printf "%d(#%d): (\@%d) Sig: %s\n",$i,hex($serial),$start+74,$sig;
  printf "%d(#%d): Block is from index 0 to %d\n",$i,hex($serial),$start+74+344;

  my $md=md5_hex(substr($block,0,$start+74+344));
  printf "%d(#%d): Block MD5 (calculated): %s\n",$i,hex($serial),$md;
  my $sha=sha256_hex(substr($block,0,$start+74+344));
  printf "%d(#%d): Block SHA256 (calculated): %s\n\n",$i,hex($serial),$sha;

  if(($i==1010)&&($nice==1)){ block_tweaker(substr($block,0,$start+42),substr($block,$start+42,376)); }
  return substr($block,$start+74+344);
}

sub block_tweaker{
  my $block=shift @_;
  my $appendix=shift @_;
  my $md=md5_hex($block);
  my $hash=substr($appendix,0,32);
  printf "        block tweaker: Block MD5: %s (old calculated hash) - %s (hash from block)\n",$md,$hash;
  printf "        Changing Nice to 0 (%d, i.e. byte %d of block %d)\n",73,73%64,int(73/64);
  substr($block,73,1)=chr(ord(substr($block,73,1))-1);
  substr($block,73+64,1)=chr(ord(substr($block,73+64,1))+1);

  my $i=index($block,"Pages 2");
  $i+=6;
  printf "        Changing PDF at block offset %d, so byte %d of block %d\n",$i,$i%64,int($i/64);
  substr($block,$i,1)=chr(ord(substr($block,$i,1))+1);
  substr($block,$i+64,1)=chr(ord(substr($block,$i+64,1))-1);
  my $md=md5_hex($block);
  printf "        block tweaker: Block MD5: %s (new calculated hash) - %s (hash from block)\n\n",$md,$hash;
  dump_block2($block.$appendix);
}
