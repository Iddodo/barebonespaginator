# barebonespaginator
A Bare-Bones, very primitive JavaScript paginator.

## Settings Parameters
Setting | Usage
------------ | -------------
prevText | Text of the "previous" button.
nextText | Text of the "next" button.
numberOfItemsPerPage | Represents the limit for the number of items in a page.
data | The data which will be manipulated for pagination (Will have to be an array of HTMLElements).
pagingElement | The element where the relevant items per page will appear.
paginationBarElement | The element where the pagination bar will appear.

```javascript
BareBonesPaginator({
  prevText: "Previous",
  nextText: "Next",
  data: [...HTMLElements],
  pagingElement: HTMLElement,
  paginationBarElement: HTMLElement
});
```
