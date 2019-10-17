# barebonespaginator
A Bare-Bones, very primitive JavaScript paginator.


## Default Functionality
* Takes an array of HTMLElements and the number of items per designated page.
* Outputs unstyled pagination bar to element.
* Changes page when you click pagination bar buttons, outputs paginated data to element.

## Settings Parameters
Setting | Type | Usage
------------ | ------------- | -------------
**prevText** | String | Text of the "previous" button.
**nextText** | String | Text of the "next" button.
**itemsPerPage** | Integer | Represents the limit for the number of items in a page.
**data** | Array | The data which will be manipulated for pagination (Default: An array of HTMLElements).
**pagingElement** | HTMLElement | The element where the relevant items per page will appear.
**paginationBarElement** | HTMLElement | The element where the pagination bar will appear.
paginationFunction *optional*| Function | Takes 2 parameters: *page data* and *paging element*. The default pagination function outputs HTMLElements to the paging element. If you would like to achieve different functionality, by all means.
firstPageIsOne *optional* | Boolean | Makes it so that the visual representation of page numbers would start from 1 rather than 0.


## Available properties
Property | Type | Usage
------------ | ------------- | -------------
paginatedData | Array[][] | The original data divided by a 2D array.
currentPage | Integer | Get the active page index.
itemNumber | Integer | Get the total number of items.
pagesNumber | Integer | Get the total number of pages.
itemsPerPage | Integer | Get the number of items per page.
paginationBarHTML | String | Get the pagination bar HTML.

## Available functions
Function | Return Type | Usage
------------ | ------------- | -------------
getCurrentPageData() | Array | Fetch items of active page.
getPageData(Integer n) | Array | Fetch items of a certain page.
page(Integer n) | -- | Change the page.
gotoPrevPage() | -- | Go to the previous page.
gotoNextPage() | -- | Go to the next page.
setPaginationFunction(Function f) | -- | Set the pagination function.




```javascript
const bb = BareBonesPaginator({
  itemsPerPage: 3;
  data: [HTMLElement, HTMLElement, HTMLElement, HTMLElement, HTMLElement, HTMLElement],
  firstPageIsOne: true;
});

bb.setPaginationFunction((data) => console.log(data));
bb.page(2); // Set page to 2.
document.getElementById('bar').innerHTML = bb.paginationBarHTML;

```
