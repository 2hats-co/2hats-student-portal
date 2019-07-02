Displays a grid of cards. Uses the `route` prop to show either all the cards or
a preview (1–2 rows of all available cards, max 5).

### Logic – done on every render

1. Compare `route` and `location` to see if `showPreviewOnly`
2. Filter out cards by ID
3. If `deprioritiseByIndustry`, moves user’s deprioritised industries to the end
4. Calculates number of cards to display if `showPreviewOnly`
5. Calculate animation delay for each card
6. Generate [`OneCardTwo`](#onecardtwo-1) components or
   [`LoadingCard`s](#loadingcard)
7. Generate actual elements of `CardGrid`, depending on `loading` and
   `showPreviewOnly`, empty state, and `deprioritiseByIndustry`

See source code for details

### Separation of concerns

Unlike the old `Cards` component, this will **not** call `useCollection` and you
need to pass down the card props themselves to render anything. This is because
the logic to sort and get cards is more complicated—we need to use multiple
queries and combine them into one section.

### Why split deprioritised cards instead of just putting them at the end?

We use only one query to get all the cards of that type, regardless of which
cards are deprioritised. This is instead of using three separate queries for
each industry and filtering using that.

But, in the future when we have to load more cards via `InfiniteScroll`, the
cards would appear in the middle of the list and the user might not see that the
new cards are loaded. It’s easier to see if the two sections are separated.

### TODO

Allow for `InfiniteScroll` to load more items. Currently just increased the
default `useCollection` limit from 20 to 30.
