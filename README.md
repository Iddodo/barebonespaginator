# barebonespaginator
A Bare-Bones, very primitive JavaScript paginator.


## Default Functionality
* Takes an array of HTMLElements and the number of items per designated page.
* Outputs unstyled pagination bar to element.
* Changes page when you click pagination bar buttons, outputs paginated data to element.

## Settings Parameters
Setting | Usage
------------ | -------------
**prevText** | Text of the "previous" button.
**nextText** | Text of the "next" button.
**numberOfItemsPerPage** | Represents the limit for the number of items in a page.
**data** | The data which will be manipulated for pagination (Default: An array of HTMLElements).
**pagingElement** | The element where the relevant items per page will appear.
**paginationBarElement** | The element where the pagination bar will appear.
paginationFunction() *optional*| Takes 2 parameters: *page data* and *paging element*. The default pagination function outputs HTMLElements to the paging element. If you would like to achieve different functionality, by all means.

```javascript
BareBonesPaginator({
  prevText: "Previous",
  nextText: "Next",
  data: [...HTMLElements],
  pagingElement: HTMLElement,
  paginationBarElement: HTMLElement,
  paginationFunction: Function
});
```
