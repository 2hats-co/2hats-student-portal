Updated version of OneCard. Handles some display logic, such as displaying the
corresponding gradient colour(s) and icons for industry(s) supplied in props.

Uses **fixed heights** in child components to ensure entire card has fixed
height.

### Generating props

Use the `generate<Type>Card` utility functions in `utilities/cards`. Moved from
`constants/oneCardMappings`

### Constants

| Name           | Value                                     |
| -------------- | ----------------------------------------- |
| `CARD_WIDTH`   | `320`                                     |
| `CARD_PADDING` | `16`                                      |
| `MEDIA_HEIGHT` | `CARD_WIDTH * 0.5625` (16:9 aspect ratio) |
