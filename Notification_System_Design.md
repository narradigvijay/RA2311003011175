# Notification System Design

## Stage 1 - Priority Inbox

### Scoring Formula
score = typeWeight x recencyFactor
typeWeight: Placement=3, Result=2, Event=1
recencyFactor: 1 / (1 + ageInHours)

### Data Structure: Min-Heap of size N
A min-heap of capacity N keeps the N best items at all times.
The root is always the worst of the top-N, making eviction O(log N).
New notifications insert in O(log N) with no full reprocessing.

| Operation | Complexity |
|-----------|------------|
| Build top-N | O(M log N) |
| Insert new | O(log N) |
| Space | O(N) |

## Stage 2 - Frontend

### Pages
- / : All Notifications with pagination and type filter
- /priority : Priority Inbox with adjustable top-N slider

### New vs Viewed
- Viewed IDs stored in localStorage
- Unread cards highlighted with colour border
- Viewed cards dimmed with reduced opacity

### API Flow
Next.js Frontend (localhost:3000) -> Express Backend (localhost:5000) -> Test Server