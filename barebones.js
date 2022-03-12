function BareBonesPaginator(inputSettings) {
	const defaults = {
		prevText: "Prev",
		nextText: "Next",
		prevButtonValue: "bb-action-prev",
		nextButtonValue: "bb-action-next"

	};

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

	if (!settings.pagingElement === undefined) {
		throw "No paging element has been passed as argument to BareBonesPaginator object.";
	}
	
	if (!settings.pagingElement || !(settings.pagingElement instanceof HTMLElement)) {
		throw "A paging element was passed to BareBonesPaginator, but it's either undefined or not an HTMLElement.";
	}


	if (!settings.itemsPerPage) settings.itemsPerPage =  1;
	if (!settings.prevText) settings.prevText = defaults.prevText;
	if (!settings.nextText) settings.nextText = defaults.nextText;

	// Set default pagination function in case such function does not exist
	// pagingElement needs to be an HTMLElement, whereas $d is an array of HTMLElements.
	if (!settings.paginationFunction) {
		settings.paginationFunction = function(d, pagingElement) {
			pagingElement.innerHTML = d.map(elm => elm.outerHTML).join('');
		}
	}

	const makePaginationButton = (txt, val) => `<button class="bb-pagination-button" value="` + (val ? val : txt) + `">` + txt + `</button>`; 

	const numberOfItems = settings.data.length;
	const itemsPerPage = settings.itemsPerPage;
	const numberOfPages = Math.ceil(numberOfItems / itemsPerPage);

	// This function will pad text with div element in case of non-HTMLElement argument being passed
	const divElement = (text) => {
		var div = document.createElement('div');
		div.innerHTML = text.trim();
		return div.firstChild;
	};

	// Change this to return non-HTML types
	const paginatingByReduce = (arr, currentItem, currentIndex) => {
		const indexOfCurrentPage = parseInt(currentIndex / itemsPerPage);
		const indexOfItemOnPage = currentIndex % itemsPerPage;
		arr[indexOfCurrentPage] = arr[indexOfCurrentPage] || [];

		// Handle case where plain text is passed
		if (!(currentItem instanceof HTMLElement)) {

			if (typeof currentItem == 'string') {
				currentItem = divElement(currentItem);
			} else {
				throw "A non-HTMLElement / string  value has been passed to BareBonesPaginator.";
			}
		}
		arr[indexOfCurrentPage][indexOfItemOnPage] = currentItem;
		return arr;
	};

	const paginatedData = settings.data.reduce(paginatingByReduce, []);
	
	const getCurrentPageData = () => paginatedData[pageIndex]; 
	
	const changePage = (pageNumber) => {
		if (isNaN(pageNumber) || !Number.isInteger(pageNumber)) {
			throw "Non-integer value '" + pageNumber + "' of type '" + typeof pageNumber + "' in 'changePage()' function of BareBonesPaginator.";
		}

		pageIndex = pageNumber;
		settings.paginationFunction(getCurrentPageData(), settings.pagingElement); // [...paginatedData[pageIndex]]
	}

	const gotoPrevPage = () => {
		if (pageIndex > 0) changePage(pageIndex - 1);
	}
	const gotoNextPage = () => {
		if (pageIndex < numberOfPages - 1) changePage(pageIndex + 1);
	}


		
	const bbPaginationButtonClick = (event) => { // Event on pagination button click
		const x = event.target.value;
		const num = parseInt(x);

		// No page change needed
		if (num == pageIndex) {	
			return;
		}
		if (x == defaults.prevButtonValue) {
			gotoPrevPage();
			return;
		}
		if (x == defaults.nextButtonValue) {
			gotoNextPage();
			return;
		}

		// Not a previous/next command, throw error if casting to Integer has failed
		if (isNaN(num)) {
			throw "Non-integer value '" + x + "' in 'bbPaginationButtonClick()' function of BareBonesPaginator.";
		}

		changePage(num);
	}
	
	const getAllPaginationButtonElements = () => [...settings.paginationBar.getElementsByClassName('bb-pagination-button')];
	const activatePaginationButtonsEventListener = () => {
		getAllPaginationButtonElements().forEach(button => button.addEventListener("click", bbPaginationButtonClick)); 
	}
	
	const paginationBarHTML = [ // Prepare pagination bar
		makePaginationButton(settings.prevText, defaults.prevButtonValue),
		...Array.from({
			length: numberOfPages
		}, (x, i) => makePaginationButton((settings.firstPageIsOne ? (i + 1) : i).toString(), i.toString())),
		makePaginationButton(settings.nextText, defaults.nextButtonValue)
	].join('\n');

	if (settings.paginationBar) {
		settings.paginationBar.innerHTML = paginationBarHTML; // Output to pagination bar element if it exists
		activatePaginationButtonsEventListener();
	}

	changePage(0); // Initialize paging

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
		paginationBar: settings.paginationBar,
		getCurrentPageData: getCurrentPageData,
		gotoPrevPage: gotoPrevPage,
		gotoNextPage: gotoNextPage,
		paginatedData: paginatedData,
		itemNumber: numberOfItems,
		itemsPerPage: itemsPerPage,
		pagesNumber:numberOfPages,
		activatePaginationButtons: activatePaginationButtonsEventListener,
		pagingElement: settings.pagingElement
	};
}
