let listGetCtgry = ["Action", "Comedy", "Adventure", "Fantasy", "Mystery", "Drama", "Real life", "Horror", "Tragedy", "Musical"]

/* List storing category submit */
let listGotCtgry = []

/* div id="lsctgry" */
let selectCtgry = document.getElementById("lsctgry");

/* div id="lgctgry" */
let gotCtgry = document.getElementById("lgctgry")

let inputFieldCtgry = gotCtgry.nextElementSibling

/* Display list select category */
listGetCtgry.forEach(e => {
    let button_el = document.createElement("button")

    button_el.type = "button"
    button_el.className = "button-category"
    button_el.innerHTML = e
    button_el.onclick = function () {
        addToGot(this)
    }
    selectCtgry.appendChild(button_el)
});

/* Function to remove a item string in list string */
function removeItemAt(list, item_value) {
    let index = list.indexOf(item_value)

    if (index < 0) {
        return list
    }

    list.splice(index, 1)
    return list
}

/* Create icon htm */
function createRemoveIconCategory() {
    let i_el = document.createElement("i")
    i_el.className = "fa fa-minus-square";
    return i_el
}

function updateInputFieldCtgryPlaceholder() {
    if (listGotCtgry.length > 0) {
        inputFieldCtgry.placeholder = ""
        return
    }
    inputFieldCtgry.placeholder = "Category film"
}

/* Add item to list got and delete item in list get */
function addToGot(element) {
    /* Add item string to list string got */
    listGotCtgry.push(element.innerHTML)

    /* create element */
    let span_el = document.createElement("span")

    let i_el = createRemoveIconCategory()
    i_el.onclick = function () {
        addBackGet(this)
    }
    span_el.innerHTML = element.innerHTML

    span_el.appendChild(i_el)
    /* Add to list display - htm */
    gotCtgry.appendChild(span_el)

    /* Remove item from list get */
    selectCtgry.removeChild(element)

    /* Update placeholder category */
    updateInputFieldCtgryPlaceholder()
}


function addBackGet(element) {
    /* Select span node */
    let span_el = element.parentNode

    /* Remove icon clicked */
    span_el.removeChild(element)
    
    /* Remove data item from list got string */
    listGotCtgry = removeItemAt(listGotCtgry, span_el.innerHTML)

    /* Create element */
    let button_el = document.createElement("button")

    button_el.type = "button"
    button_el.className = "button-category"
    button_el.innerHTML = span_el.innerHTML
    button_el.onclick = function () {
        addToGot(this)
    }

    /* Add to list select */
    selectCtgry.appendChild(button_el)

    /* Remove item form list got */
    gotCtgry.removeChild(span_el)

    /* Update placeholder category */
    updateInputFieldCtgryPlaceholder()
}

