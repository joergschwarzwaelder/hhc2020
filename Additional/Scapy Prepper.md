# Scapy Prepper

    >>> task.get()
    Welcome to the "Present Packet Prepper" interface! The North Pole could use your help preparing present packets for shipment.
    Start by running the task.submit() function passing in a string argument of 'start'.
    Type task.help() for help on this question.
    >>>
    >>> task.submit("start")
    Correct! adding a () to a function or class will execute it. Ex - FunctionExecuted()

    Submit the class object of the scapy module that sends packets at layer 3 of the OSI model.
    >>> task.submit(send)
    Correct! The "send" scapy class will send a crafted scapy packet out of a network interface.

    Submit the class object of the scapy module that sniffs network packets and returns those packets in a list.

    >>>
    >>> task.submit(sniff)
    Correct! the "sniff" scapy class will sniff network traffic and return these packets in a list.

    Submit the NUMBER only from the choices below that would successfully send a TCP packet and then return the first sniffed response packet to be stored in a variable named "pkt":
    1. pkt = sr1(IP(dst="127.0.0.1")/TCP(dport=20))
    2. pkt = sniff(IP(dst="127.0.0.1")/TCP(dport=20))
    3. pkt = sendp(IP(dst="127.0.0.1")/TCP(dport=20))

    >>>

    >>> task.submit(1)
    Correct! sr1 will send a packet, then immediately sniff for a response packet.

    Submit the class object of the scapy module that can read pcap or pcapng files and return a list of packets.

    >>>
    >>> task.submit(rdpcap)
    Correct! the "rdpcap" scapy class can read pcap files.

    The variable UDP_PACKETS contains a list of UDP packets. Submit the NUMBER only from the choices below that correctly prints a summary of UDP_PACKETS:
    1. UDP_PACKETS.print()
    2. UDP_PACKETS.show()
    3. UDP_PACKETS.list()

    >>>
    >>> task.submit(2)
    Correct! .show() can be used on lists of packets AND on an individual packet.

    Submit only the first packet found in UDP_PACKETS.

    >>>
    >>> task.submit(UDP_PACKETS[0])
    Correct! Scapy packet lists work just like regular python lists so packets can be accessed by their position in the list starting at offset 0.

    Submit only the entire TCP layer of the second packet in TCP_PACKETS.

    >>>
    >>> task.submit(TCP_PACKETS[1].getlayer(TCP))
    Correct! Most of the major fields like Ether, IP, TCP, UDP, ICMP, DNS, DNSQR, DNSRR, Raw, etc... can be accessed this way. Ex - pkt[IP][TCP]

    Change the source IP address of the first packet found in UDP_PACKETS to 127.0.0.1 and then submit this modified packet

    >>>
    >>> UDP_PACKETS[0][IP].src="127.0.0.1"

    >>> task.submit(UDP_PACKETS[0])
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    AttributeError: 'PawngTask' object has no attribute 'sumit'
   
    'PawngTask' object has no attribute 'sumit'
   
    >>> task.submit(UDP_PACKETS[0])
    Correct! You can change ALL scapy packet attributes using this method.
   
    Submit the password "task.submit('elf_password')" of the user alabaster as found in the packet list TCP_PACKETS.
   
    >> TCP_PACKETS[6].show()
    ###[ Ethernet ]###
      dst       = 00:15:f2:40:76:ef
      src       = 00:16:ce:6e:8b:24
      type      = IPv4
    ###[ IP ]###
         version   = 4
         ihl       = 5
         tos       = 0x0
         len       = 51
         id        = 42982
         flags     = DF
         frag      = 0
         ttl       = 128
         proto     = tcp
         chksum    = 0xd05a
         src       = 192.168.0.114
         dst       = 192.168.0.193
         \options   \
    ###[ TCP ]###
            sport     = 1137
            dport     = ftp
            seq       = 3753095950
            ack       = 3334930821
            dataofs   = 5
            reserved  = 0
            flags     = PA
            window    = 17357
            chksum    = 0xe96b
            urgptr    = 0
            options   = []
    ###[ Raw ]###
               load      = 'PASS echo\r\n'


    >>>
    >>> task.submit('echo')
    Correct! Here is some really nice list comprehension that will grab all the raw payloads from tcp packets:
    [pkt[Raw].load for pkt in TCP_PACKETS if Raw in pkt]

    The ICMP_PACKETS variable contains a packet list of several icmp echo-request and icmp echo-reply packets. Submit only the ICMP chksum value from the second packet in the ICMP_PACKETS list.

    >>>
    >>> task.submit(0x4c44)
    Correct! You can access the ICMP chksum value from the second packet using ICMP_PACKETS[1][ICMP].chksum .

    Submit the number of the choice below that would correctly create a ICMP echo request packet with a destination IP of 127.0.0.1 stored in the variable named "pkt"
    1. pkt = Ether(src='127.0.0.1')/ICMP(type="echo-request")
    2. pkt = IP(src='127.0.0.1')/ICMP(type="echo-reply")
    3. pkt = IP(dst='127.0.0.1')/ICMP(type="echo-request")

    >>>
    >>> task.submit(3)
    Correct! Once you assign the packet to a variable named "pkt" you can then use that variable to send or manipulate your created packet.

    Create and then submit a UDP packet with a dport of 5000 and a dst IP of 127.127.127.127. (all other packet attributes can be unspecified)

    >>>
    >>> task.submit(IP(dst='127.127.127.127')/UDP(dport=5000))
    Correct! Your UDP packet creation should look something like this:
    pkt = IP(dst="127.127.127.127")/UDP(dport=5000)
    task.submit(pkt)

    Create and then submit a UDP packet with a dport of 53, a dst IP of 127.2.3.4, and is a DNS query with a qname of "elveslove.santa". (all other packet attributes can be unspecified)

    >>>
    >>> task.submit(IP(dst='127.2.3.4')/UDP(dport=53)/DNS(qd=DNSQR(qname="elveslove.santa")))
    Correct! Your UDP packet creation should look something like this:
    pkt = IP(dst="127.2.3.4")/UDP(dport=53)/DNS(rd=1,qd=DNSQR(qname="elveslove.santa"))
    task.submit(pkt)

    The variable ARP_PACKETS contains an ARP request and response packets. The ARP response (the second packet) has 3 incorrect fields in the ARP layer. Correct the second packet in ARP_PACKETS to be a proper ARP response and then task.submit(ARP_PACKETS) for inspection.

    >>>
    >>> ARP_PACKETS[1].show()
    ###[ Ethernet ]###
      dst       = 00:16:ce:6e:8b:24
      src       = 00:13:46:0b:22:ba
      type      = ARP
    ###[ ARP ]###
         hwtype    = 0x1
         ptype     = IPv4
         hwlen     = 6
         plen      = 4
         op        = None
         hwsrc     = ff:ff:ff:ff:ff:ff
         psrc      = 192.168.0.1
         hwdst     = ff:ff:ff:ff:ff:ff
         pdst      = 192.168.0.114
    ###[ Padding ]###
            load      = '\xc0\xa8\x00r'


    >>> ARP_PACKETS[1][ARP].op=2

    >>> ARP_PACKETS[1].show()
    ###[ Ethernet ]###
      dst       = 00:16:ce:6e:8b:24
      src       = 00:13:46:0b:22:ba
      type      = ARP
    ###[ ARP ]###
         hwtype    = 0x1
         ptype     = IPv4
         hwlen     = 6
         plen      = 4
         op        = is-at
         hwsrc     = ff:ff:ff:ff:ff:ff
         psrc      = 192.168.0.1
         hwdst     = ff:ff:ff:ff:ff:ff
         pdst      = 192.168.0.114
    ###[ Padding ]###
            load      = '\xc0\xa8\x00r'
   
   
    >>> ARP_PACKETS[1][ARP].hwdst='00:16:ce:6e:8b:24'
   
    >>> ARP_PACKETS[1][ARP].hwsrc='00:13:46:0b:22:ba'
    >>> ARP_PACKETS[1].show()
    ###[ Ethernet ]###
      dst       = 00:16:ce:6e:8b:24
      src       = 00:13:46:0b:22:ba
      type      = ARP
    ###[ ARP ]###
         hwtype    = 0x1
         ptype     = IPv4
         hwlen     = 6
         plen      = 4
         op        = is-at
         hwsrc     = 00:13:46:0b:22:ba
         psrc      = 192.168.0.1
         hwdst     = 00:16:ce:6e:8b:24
         pdst      = 192.168.0.114
    ###[ Padding ]###
            load      = '\xc0\xa8\x00r'


    >>> task.submit(ARP_PACKETS)
    Great, you prepared all the present packets!

    Congratulations, all pretty present packets properly prepared for processing!



    >>>
