# barebones paginator
A Bare-Bones, very primitive JavaScript pagination tool.

##(TODO)
- [ ] POTENTIAL ITEM COUNT
- [ ] POTENTIAL PAGE NUMBER
- [ ] OPTION TO LOAD MORE DATA ON PAGE CHANGE

## Default Functionality
* Takes an array (default: of HTMLElements) and the number of items per designated page.
* Outputs unstyled pagination bar to element.
* Changes page when you click pagination bar buttons, outputs paginated data to element.

## Settings Parameters
Setting | Type | Usage
------------ | ------------- | -------------
prevText *(optional)* | String | Text of the "previous" button. (Default: "*Prev*")
nextText *(optional)* | String | Text of the "next" button. (Default: "*Next*")
itemsPerPage *(optional)* | Integer | Represents the limit for the number of items in a page. (Default: "*1*")
data **(required**) | Array | The data which will be manipulated for pagination (Default: An array of HTMLElements).
pagingElement *(optional)* | HTMLElement | The element where the relevant items of a page will appear. (**No paging element means you'd need a paging function**)
paginationBarElement *(optional)* | HTMLElement | The element where the pagination bar will appear.
paginationFunction(pageData, pagingElement) *(optional)*| Function |This function will be executed on page change. The default pagination function outputs HTMLElements to the paging element.
firstPageIsOne *(optional)* | Boolean | Makes it so that the visual representation of page numbers would start from 1 rather than 0. (Default: *turned off*)


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
activatePaginationButtons() | -- | You can use this to easily activate all pagination buttons (those with the class "bb-pagination-button"). Useful if you, i.e., made custom ones.




```javascript
// === STANDARD EXAMPLE ===
const bb1 = BareBonesPaginator({
  itemsPerPage: 3;
  data: [
    "<div>can</div>",
    "<div>you</div>",
    "<div>feel</div>",
    "<div>it</div>",
    "<div>Mr.</div>",
    "<div>Krabs?</div>"
  ],
  pagingElement: document.getElementById('page-goes-here'),
  paginationBarHTML: document.getElementById('bar-goes-here')
});

// ==== CUSTOM EXAMPLE ===
const bb2 = BareBonesPaginator({
  itemsPerPage: 2;
  data: ['a', 'y', 'y', 'y', 'l', 'm', 'a', 'o']
  firstPageIsOne: true;
});

bb2.setPaginationFunction((data) => console.log(data));
bb2.page(2); // Set page to 2.
document.getElementById('bar').innerHTML = bb2.paginationBarHTML;

```
