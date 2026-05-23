# Delhi BRT System Analysis

The Delhi Bus Rapid Transit (BRT) System was implemented to provide a dedicated corridor for high-capacity public transit. This report reviews its design parameters, traffic capacity, and passenger throughput.

## System Capacity Equations

The maximum bus flow rate $Q$ through a corridor is governed by the average headway $H$ and bus capacity $C_{bus}$:

$$Q = \frac{3600}{H} \cdot C_{bus} \quad \text{(passengers/hour)}$$

Where:
- $H$ is the headway in seconds.
- $C_{bus}$ is the bus capacity (typically 120 passengers for standard articulated buses).

Given a target minimum headway $H = 45\text{ s}$, the theoretical corridor capacity is:

$$Q_{max} = \frac{3600}{45} \cdot 120 = 9,600 \text{ passengers/hour/direction}$$

## Operational Metrics Comparison

| Metric | Dedicated BRT Lane | Mixed Traffic Lane | Improvement |
| :--- | :--- | :--- | :--- |
| **Bus Speed (km/h)** | 22.4 | 11.2 | +100% |
| **Headway Variance (min)**| 1.2 | 5.8 | -79.3% |
| **Hourly Throughput (Pax)**| 8,400 | 1,800 | +366.7% |
| **Fuel Efficiency (km/L)** | 3.1 | 1.8 | +72.2% |

## Key Findings

1. **Dedicated Right-of-Way**: Reserving the central lanes for buses significantly reduced conflict with left-turning mixed traffic.
2. **Passenger Access**: Elevated island station platforms enabled level-boarding, minimizing dwell times.
3. **Traffic Enforcement**: Frequent intrusions by private vehicles into the dedicated lanes created localized bottlenecks.
