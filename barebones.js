function BareBonesPaginator(inputSettings) {
    let pageIndex = 0;
    const settings = {
        ...inputSettings
    };
    if (!settings.data) {
    	throw "Required parameter 'data' is missing.";
    }
    if (!(settings.data instanceof Array)) {
    	throw "Wrong type received for 'data' parameter: Expected Array, got " + settings.data.constructor.name + " instead.";
    }
    if (!settings.itemsPerPage) settings.itemsPerPage =  1;
    if (!settings.prevText) settings.prevText = "Prev";
    if (!settings.nextText) settings.nextText = "Next";

    const makePaginationButton = (txt, val) => `<button class="bb-pagination-button" value="` + (val ? val : txt) + `">` + txt + `</button>`;
    const onPageChange = (d) => { // Recieves array of current page item
        if (!settings.paginationFunction && settings.pagingElement) {
            settings.pagingElement.innerHTML = d.map(elm => elm.outerHTML).join('');
        } else {
            settings.paginationFunction(d, (settings.pagingElement || null)); // [...paginatedData[pageIndex]]
        }
    }
    

    const numberOfItems = settings.data.length;
    const itemsPerPage = settings.itemsPerPage;
    const numberOfPages = Math.ceil(numberOfItems / itemsPerPage);

    const paginatingByReduce = (arr, currentItem, currentIndex) => {
        const indexOfCurrentPage = parseInt(currentIndex / itemsPerPage);
        const indexOfItemOnPage = currentIndex % itemsPerPage;
        arr[indexOfCurrentPage] = arr[indexOfCurrentPage] || [];

        arr[indexOfCurrentPage][indexOfItemOnPage] = currentItem;
        return arr;
    }
    const paginatedData = settings.data.reduce(paginatingByReduce, []);

    const getCurrentPageData = () => [...paginatedData[pageIndex]]; // [...] <-- in case it's not actually an array. It might be an HTMLCollection.
    const changePage = (x) => {
        if (!isNaN(x)) {
            pageIndex = parseInt(x);
        }
        onPageChange(getCurrentPageData());
    }
    const gotoPrevPage = () => {
	    if (pageIndex > 0) changePage(pageIndex - 1);
    }
    const gotoNextPage = () => {
	    if (pageIndex < numberOfPages - 1) changePage(pageIndex + 1);
    }

    changePage(0); // Initialize paging

        
    const bbPaginationButtonClick = (event) => { // Event on pagination button click
        const x = event.target.value;
        if (parseInt(x) == pageIndex) {
            return;
        }
        if (x == 'p') {
            gotoPrevPage();
        } else
        if (x == 'n') {
            gotoNextPage();
        } else
        if (isNaN(x)) {
            return;
        } else {
            changePage(x);
        }
    }
    
    const getAllPaginationButtonElements = () => [...settings.paginationBarElement.getElementsByClassName('bb-pagination-button')];
    const activatePaginationButtonsEventListener = () => {
    	getAllPaginationButtonElements().forEach(button => button.addEventListener("click", bbPaginationButtonClick)); 
    }
    
    const paginationBarHTML = [ // Prepare pagination bar
        makePaginationButton(settings.prevText, "p"),
        ...Array.from({
            length: numberOfPages
        }, (x, i) => makePaginationButton((settings.firstPageIsOne ? (i + 1) : i).toString(), i.toString())),
        makePaginationButton(settings.nextText, "n")
    ].join('\n');

    if (settings.paginationBarElement) {
        settings.paginationBarElement.innerHTML = paginationBarHTML; // Output to pagination bar element if it exists
        activatePaginationButtonsEventListener();
    }
    return {
        currentPage: pageIndex,
        page: changePage,
        setPaginationFunction: (f) => {
            if (typeof f === 'function') {
                settings.paginationFunction = f;
                return true;
            }
            return false;
         },
        paginationBarHTML: paginationBarHTML,
        getCurrentPageData: getCurrentPageData,
        gotoPrevPage: gotoPrevPage,
        gotoNextPage: gotoNextPage,
        paginatedData: paginatedData,
        itemNumber: numberOfItems,
        itemsPerPage: itemsPerPage,
        pagesNumber:numberOfPages,
        activatePaginationButtons: activatePaginationButtonsEventListener
    };
}
