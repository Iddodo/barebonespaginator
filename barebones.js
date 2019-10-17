function BareBonesPaginator(inputSettings) {
  const settings = {
	  ...inputSettings
  };
  
  const makePaginationButton =  (txt, val) =>  `<button class="bb-pagination-button" value="` + (val ? val : txt) + `">` + txt + `</button>`;
  const getAllPaginationButtonElements = () => [...settings.paginationBarElement.getElementsByClassName('bb-pagination-button')];
  
  const originalData = settings.data;

  const numberOfItems = originalData.length;
  const numberOfItemsPerPage = settings.numberOfItemsPerPage;

  const numberOfPages = Math.ceil(numberOfItems / numberOfItemsPerPage);

  const paginatingByReduce = (arr, currentItem, currentIndex) => {
    const indexOfCurrentPage =  parseInt(currentIndex / numberOfItemsPerPage);
    const indexOfItemOnPage = currentIndex % numberOfItemsPerPage;
    arr[indexOfCurrentPage] = arr[indexOfCurrentPage] || [];

    arr[indexOfCurrentPage][indexOfItemOnPage] = currentItem;
    return arr;
  }
  const paginatedData = originalData.reduce(paginatingByReduce, []);


  const pageElement = settings.pagingElement;
  let globalPageIndex = 0;
  pageElement.innerHTML = [...paginatedData[globalPageIndex]].map(elm => elm.outerHTML).join('');
	
  const bbPaginationButtonClick = (event) => {
  		const x = event.target.value;
      if (parseInt(x) === globalPageIndex) {
        return;
      }
      if (x == 'p' && globalPageIndex > 0) {
        globalPageIndex = globalPageIndex - 1;
      } else
      if (x == 'n' && globalPageIndex < numberOfPages - 1) {
        globalPageIndex = globalPageIndex + 1;
      } else
      if (!isNaN(x)) {
        globalPageIndex = parseInt(x);
      }
    if (!settings.paginationFunction) {
	pageElement.innerHTML = [...paginatedData[globalPageIndex]].map(elm => elm.outerHTML).join('');
    } else {
    	settings.paginationFunction(paginatedData[globalPageIndex], pageElement);
    }
  }
  const paginationBarInnerHTML = [
    makePaginationButton(settings.prevText, "p"),
    ...Array.from({length: numberOfPages}, (x,i) => makePaginationButton(i)),
    makePaginationButton(settings.nextText, "n")
  ].join('\n');
  
  settings.paginationBarElement.innerHTML = paginationBarInnerHTML;
 	getAllPaginationButtonElements().forEach(button => button.addEventListener("click", bbPaginationButtonClick));
  

}
