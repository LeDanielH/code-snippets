var isBigScreen = window.matchMedia && window.matchMedia("(min-width: 1365px)").matches;
var $searchWhisperer = $('#searchWhisperer');
var $searchWhispererLeft = $('#searchWhispererLeft');
var $searchWhispererRight = $('#searchWhispererRight');
var $searchInput = $('#searchInput');
var timerId = 0;
let itemsTotal = null;
let currentIndex = -1; // nothing is selected by default
let selectorActive = false;
let selectedItem = false;
let $listWrapper;
let selectedLink;
let listScrollHeight;
let listVisibleHeight;
let listScrollTop;
let listOffsetTop;
let selectedOffsetTop;
let currentOffsetHeight;
let scrollBy;

function moveSelected(position) {
    let $autocompleteItems = $searchWhispererLeft.find('li');
    $autocompleteItems.each(function (item) {
        $(this).removeClass('is-highlighted');
    });
    let $selectedItem = $($autocompleteItems[position]);
    $selectedItem.addClass('is-highlighted');
}

function getAutocompleteCount() {
    let $autocompleteItems = $searchWhispererLeft.find('li');
    return $autocompleteItems.length;
}
/* prevent cursor from changing position when highlighting is active */
$searchInput.on('keydown keyup', function (e) {
    if(selectorActive && (e.keyCode === 38 || e.keyCode === 40)){
        e.preventDefault();
    }
});
// init fulltext search
$searchInput.on('keyup', function (e) {
    let thisVal = $(this).val();
    if (timerId > 0) {
        clearTimeout(timerId);
        timerId = 0;
    }
    itemsTotal = getAutocompleteCount();
    let $selectedItem = $('li.is-highlighted');

    selectorActive = itemsTotal > 0;
    selectedItem = $selectedItem.length > 0;

    if(selectedItem) {
        $listWrapper = $selectedItem.parent();
        listScrollHeight = $listWrapper[0].scrollHeight;
        listScrollTop = $listWrapper[0].scrollTop;
        listVisibleHeight = $listWrapper[0].offsetHeight;
        listOffsetTop = $listWrapper[0].offsetTop;
        selectedOffsetTop = $selectedItem[0].offsetTop;
        currentOffsetHeight = listScrollHeight - listVisibleHeight;
        scrollBy = currentOffsetHeight/itemsTotal;
        // console.table([ // nefunguje v IE
        //     ['$selectedItem', $selectedItem],
        //     ['listScrollHeight:', listScrollHeight],
        //     ['listScrollTop:', listScrollTop],
        //     ['listVisibleHeight:', listVisibleHeight],
        //     ['listOffsetTop:', listOffsetTop],
        //     ['selectedOffsetTop:', selectedOffsetTop],
        //     ['currentOffsetHeight', currentOffsetHeight],
        // ]);
    }

    if((!selectorActive)) {
        switch (e.keyCode) {
            case 13:
                if (thisVal.length > 1) {
                    Kosmas.Fulltext.RunQuery(thisVal);
                }
                return;
                break;
            default:
                currentIndex = -1;
                moveSelected(currentIndex);
                if (selectedItem) $listWrapper[0].scrollTop = 0;

        }
    } else if (selectorActive) {
        switch (e.keyCode) {
            case 38: // move up
                e.preventDefault();
                currentIndex--;
                if(currentIndex < 0) currentIndex = itemsTotal - 1;
                moveSelected(currentIndex);
                if (selectedItem && listScrollHeight > listVisibleHeight) {
                    if(selectedOffsetTop > listScrollHeight/2 || listOffsetTop === selectedOffsetTop) {
                        $listWrapper[0].scrollTop = currentOffsetHeight;
                    } else {
                        $listWrapper[0].scrollTop = 0;
                    }
                }
                return;
                break;
            case 40: // move down
                e.preventDefault();
                currentIndex++;
                if(currentIndex > itemsTotal - 1) currentIndex = 0;
                moveSelected(currentIndex);
                if (selectedItem && listScrollHeight > listVisibleHeight) {
                    if(selectedOffsetTop > listScrollHeight/2 && (selectedOffsetTop + scrollBy < listScrollHeight)) {
                        $listWrapper[0].scrollTop = currentOffsetHeight;
                    } else {
                        $listWrapper[0].scrollTop = 0;
                    }
                }

                return;
                break;
            case 13: // enter
                if (selectedItem) {
                    let selectedValue = $selectedItem.text().trim();
                    if (selectedValue.length > 1) {
                        selectedLink = $selectedItem.find('a').attr('href');
                        window.location.href = selectedLink;
                    }
                } else {
                    Kosmas.Fulltext.RunQuery(thisVal);
                }
                return;
                break;
            case 27: // esc
                currentIndex = -1;
                moveSelected(currentIndex);
                if (selectedItem) $listWrapper[0].scrollTop = 0;
                break;

            default:
                currentIndex = -1;
                moveSelected(currentIndex);
                if (selectedItem) $listWrapper[0].scrollTop = 0;
        }
    }
    //$('.product__annotation h2').html($('.product__annotation h2').html() + 'X');
});