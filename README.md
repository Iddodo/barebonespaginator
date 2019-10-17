# barebonespaginator
A Bare-Bones, very primitive JavaScript paginator.


## Default Functionality
* Takes an array of HTMLElements and the number of items per designated page.
* Outputs unstyled pagination bar to element.
* Changes page when you click pagination bar buttons, outputs paginated data to element.

## Settings Parameters
Setting | Usage
------------ | -------------
&#x1F53A; prevText | Text of the "previous" button.
&#x1F53A; nextText | Text of the "next" button.
&#x1F53A; numberOfItemsPerPage | Represents the limit for the number of items in a page.
&#x1F53A; data | The data which will be manipulated for pagination (Default: An array of HTMLElements).
&#x1F53A; pagingElement | The element where the relevant items per page will appear.
&#x1F53A; paginationBarElement | The element where the pagination bar will appear.
paginationFunction(pageData, pagingElement) *optional*| The default pagination function outputs HTMLElements to the paging element. If you would like to achieve different functionality, by all means.

```javascript
BareBonesPaginator({
  prevText: "Previous",
  nextText: "Next",
  data: [...HTMLElements],
  pagingElement: HTMLElement,
  paginationBarElement: HTMLElement
});
```
