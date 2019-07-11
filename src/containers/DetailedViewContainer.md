Based on the route, renders either [`Job`](#job) or [`Assessment`](#assessment).
If job or assessment ID not found, renders [`FourOhFour`](#fourohfour).

### Switchover to new route format: `/type/:id`

This container will redirect any /type?id=<id> routes to /type/:id format.
