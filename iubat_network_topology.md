# IUBAT – Network Topology

Below are two Mermaid diagrams showing the IUBAT network architecture. The first diagram illustrates the logical network topology, while the second shows the VLAN / Department mapping.

## A) Logical Topology (Core → Distribution → Access)
```mermaid
flowchart TB
  %% Styles
  classDef core fill:#003366,stroke:#001a33,color:#fff,font-weight:bold
  classDef dist fill:#0b6fa4,stroke:#043f5d,color:#fff
  classDef access fill:#1f9bb6,stroke:#0f6170,color:#fff
  classDef ap fill:#ffd166,stroke:#cc9a08,color:#000
  classDef server fill:#9b59b6,stroke:#5e3370,color:#fff
  classDef group fill:#f0f4f8,stroke:#9fb3c8,color:#000

  %% Core & Edge
  FW_EDGE[[FW/EDGE\nNAT + ACL + DMZ]]:::core
  R_CORE([R-CORE]):::core
  INTERNET[(Internet Cloud)]

  FW_EDGE --- INTERNET
  R_CORE --- FW_EDGE

  %% Distribution routers
  R_DIST_12_13([R-DIST-12_13\n(12th+13th Floors)]):::dist
  R_DIST_OTHERS([R-DIST-OTHERS\n(Other Floors)]):::dist
  R_CORE --- R_DIST_12_13
  R_CORE --- R_DIST_OTHERS

  %% 12th Floor – Distribution L3 Switch and Access Switches
  subgraph F12[12th Floor]
    direction TB
    SW12_DIST([SW12-DIST\n(L3 Switch, SVIs: 10/20/30/40)]):::dist
    R_DIST_12_13 --- SW12_DIST

    SW12_E([SW12-E\nAccess]):::access
    SW12_W([SW12-W\nAccess]):::access
    SW12_DIST --- SW12_E
    SW12_DIST --- SW12_W

    %% 12 Labs (6 on East, 6 on West) each ~40+ PCs
    subgraph LABS_E[East Zone Labs]
      direction TB
      L1([Lab-01 (~40 PCs)]):::group
      L2([Lab-02 (~40 PCs)]):::group
      L3([Lab-03 (~40 PCs)]):::group
      L4([Lab-04 (~40 PCs)]):::group
      L5([Lab-05 (~40 PCs)]):::group
      L6([Lab-06 (~40 PCs)]):::group
    end
    subgraph LABS_W[West Zone Labs]
      direction TB
      L7([Lab-07 (~40 PCs)]):::group
      L8([Lab-08 (~40 PCs)]):::group
      L9([Lab-09 (~40 PCs)]):::group
      L10([Lab-10 (~40 PCs)]):::group
      L11([Lab-11 (~40 PCs)]):::group
      L12([Lab-12 (~40 PCs)]):::group
    end

    SW12_E --- L1 & L2 & L3 & L4 & L5 & L6
    SW12_W --- L7 & L8 & L9 & L10 & L11 & L12

    %% DMZ/Server segment on 12th floor
    DMZ_SRV[[DMZ-SRV\nHTTP/DNS 10.12.40.20]]:::server
    SW12_DIST --- DMZ_SRV
  end

  %% 13th Floor – Library + Wi-Fi
  subgraph F13[13th Floor]
    direction TB
    SW13_DIST([SW13-DIST\nL2 Switch]):::access
    AP13([[AP-13\nSSID: Employee (VLAN60)\nSSID: Guest (VLAN50)]]):::ap
    LIB([Library Computer Section]):::group

    R_DIST_12_13 --- SW13_DIST
    SW13_DIST --- AP13
    SW13_DIST --- LIB
  end

  %% Other Floors – Teachers & Classrooms aggregate
  subgraph OF[Other Floors]
    direction TB
    TEACHERS([Teacher Rooms\n~5 PCs each]):::group
    CLASS([Classrooms\n1 PC per room]):::group

    R_DIST_OTHERS --- TEACHERS
    R_DIST_OTHERS --- CLASS
  end
```

**Legend:**  
- **FW/EDGE**: Firewall/NAT, Internet edge; DMZ publishing and policy enforcement.  
- **R-CORE**: Core routing; connects distribution routers.  
- **R-DIST-12_13**: Distribution for 12th & 13th floors.  
- **SW12-DIST**: L3 switch (SVIs for VLAN10/20/30/40).  
- **SW12-E / SW12-W**: Access switches for the 12th floor East/West zones.  
- **AP-13**: Dual SSID – Guest (VLAN50), Employee (VLAN60).  
- **R-DIST-OTHERS**: Uplinks teacher rooms and classrooms on other floors.

## B) VLAN / Department Mapping (Conceptual)
```mermaid
flowchart LR
  classDef vlan fill:#eef9f2,stroke:#8bd3a3,color:#0b3d2e
  classDef dept fill:#f7f7ff,stroke:#a3a3d3,color:#1a1a4f
  classDef wifi fill:#fff4e6,stroke:#e3a353,color:#5a3b00

  VLAN10([VLAN 10\nAdmin]):::vlan
  VLAN20([VLAN 20\nFaculty/Staff]):::vlan
  VLAN30([VLAN 30\nStudents\n(Labs 1–12)]):::vlan
  VLAN40([VLAN 40\nServers / DMZ]):::vlan
  VLAN50([VLAN 50\nGuest Wi‑Fi]):::wifi
  VLAN60([VLAN 60\nEmployee Wi‑Fi]):::wifi

  CSE([CSE Dept]):::dept
  EEE([EEE Dept]):::dept
  ME([Mechanical Dept]):::dept
  CE([Civil Dept]):::dept
  AG([Agriculture Dept]):::dept

  VLAN10 --- CSE & EEE & ME & CE & AG
  VLAN20 --- CSE & EEE & ME & CE & AG
  VLAN30 --- CSE & EEE & ME & CE & AG
  VLAN40 --- CSE & EEE & ME & CE & AG
  VLAN50 --- CSE & EEE & ME & CE & AG
  VLAN60 --- CSE & EEE & ME & CE & AG
```

**Notes:**  
- Departments consume services across VLANs depending on role: Admin/Faculty have broader access; Students primarily use **VLAN30** (labs).  
- **VLAN40** hosts shared services (e.g., authentication, DNS/HTTP for labs).  
- **Guest Wi‑Fi (VLAN50)** is internet‑only and isolated from internal networks.  
- **Employee Wi‑Fi (VLAN60)** has limited, policy-driven access to internal services.

## Export Tips (draw.io / diagrams.net)
1. Open **diagrams.net** → **Arrange → Insert → Advanced → Mermaid**.  
2. Paste the code blocks above.  
3. Use **Layout → Hierarchical** if you want auto-spacing.  
4. Replace labels/IPs as needed (e.g., add exact SVI addresses, link labels, or counts).  

## Next Edits You Might Want
- Add **exact port/channel labels** between R-DIST-12_13 ↔ SW13-DIST (trunk allowing VLANs 50/60).  
- Annotate **SVI gateway IPs** for VLAN10/20/30/40 on SW12-DIST.  
- Add **/30 inter-router links** (10.12.254.x/30) as edge labels for completeness.  
- If required by rubric, show **redundant uplinks** (spanning tree) and **QoS markers** (e.g., VoIP priority).