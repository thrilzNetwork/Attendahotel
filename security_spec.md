# HotelDine Security Specification

## 1. Data Invariants
- An order must have at least one item.
- An order's total must be the sum of item prices * quantities.
- A guest can only read and create their own guest profile.
- A guest can only read their own orders.
- Only admins (verified via `/admins/{uid}`) can update order statuses.
- Restaurant data is read-only for guests.
- Timestamps must be server-generated (`request.time`).

## 2. The Dirty Dozen Payloads (Rejection Targets)
1. Creating an order for another guest (`guestId` spoofing).
2. Updating an order status as a guest (privilege escalation).
3. Injecting a 1MB string into the `roomNumber` field.
4. Setting a negative price on a menu item (if guest had write access).
5. Placing an order with a past timestamp (`createdAt`).
6. Reading the list of all guests as a regular guest.
7. Modifying a restaurant's discount percent as a guest.
8. Deleting an order after it has been "prepared".
9. Creating a guest profile with someone else's UID.
10. Adding items to an order with non-existent `menuItemId`.
11. Updating an order's `total` without changing items (integrity violation).
12. Scanning the `/admins` collection.

## 3. Test Runner (Conceptual)
All the above must return `PERMISSION_DENIED`.
