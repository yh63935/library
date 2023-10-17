let myLibrary = [];
const bookTable = document.querySelector('table');
const dialog = document.querySelector('dialog');
const tableBody = document.querySelector('tbody');
const allNameInput = Array.from(document.querySelectorAll('input[name]')); // Get all inputs with any name attribute
let allNames = [];
allNames = allNameInput.map(elem=>elem.getAttribute('name'))

function getBookProperties() {

    const uniqueNames = allNames.filter((elem, index, array)=> array.indexOf(elem)===index)
    return uniqueNames;
}

setTableHeader();

// Construct new book instances
function Book(arr) {
    for(let i =0; i<arr.length;i++) {
        this[allNames[i]] = arr[i].value.toLowerCase();
    }
    this.hasRead = false;
}

// Set book to read or not read
Book.prototype.toggleRead = function() {
    if (this.hasRead === false) {
        this.hasRead = true;
        this.read = "yes"
    } else {
        this.hasRead = false;
        this.read= "no";
    }
 };
 

function addBookToLibrary() {
    const submit = document.querySelector('input[type="submit"]');
    const form = document.querySelector('form');
    const errorMessage = Array.from(document.querySelectorAll('.error'))

    submit.addEventListener('click', (e)=> {
        e.preventDefault();
        let validInput = true;
        if(!form.checkValidity()) {
            validInput = false;
        }
            for (let [key,input] of Object.entries(allNameInput)) {
                errorMessage[key].innerText = input.validationMessage;
                if (form.checkValidity()) {
                    if ((input.getAttribute('name') === 'author' || input.getAttribute('name') === 'title') && !isNaN(parseInt(input.value))) {
                        errorMessage[key].innerText += 'Please enter a string'; 
                        validInput = false;   
                    }
                    if (input.value !=="" && input.getAttribute('name') === 'read' && input.value.toLowerCase()!=='yes' && input.value.toLowerCase()!=='no') {
                        errorMessage[key].innerText = 'Please enter "yes" or "no"';
                        validInput = false;
                    }           
                }
            }
            if (validInput) {
                const newBook = new Book(allNameInput);
                myLibrary.push(newBook);
                clearInputs();
                displayBook();
        }
    })
}

function setTableHeader() {
    const tableHeader = document.querySelector('theader')
    const headerRow = document.createElement('tr');
    for(let name of getBookProperties()) {
        const headerEl = document.createElement('th');
        headerEl.innerText = name;
        headerRow.appendChild(headerEl)
    }
    tableHeader.appendChild(headerRow);
}

function clearLibrary() {
    myLibrary = [];
    tableBody.innerHTML = "";
}

const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', clearLibrary);

const newBook = document.querySelector('.new-book')

newBook.addEventListener('click', () => {
    dialog.showModal();
})

const closeForm = document.querySelector('.close-form');

closeForm.addEventListener('click', () => {
    dialog.close();
})



// Display each book in the table
function displayBook() {
    tableBody.innerHTML = "";
    for(let [key,book] of Object.entries(myLibrary)) {
        let bookRow = bookTable.insertRow();

        for (let name of allNames) {
            let bookData = bookRow.insertCell();
            bookData.append(book[name]);
            tableBody.appendChild(bookRow);
        }

        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove book'
        bookRow.insertCell().appendChild(removeButton);

        const readButton = document.createElement('button');
        readButton.innerText = 'Read'
        bookRow.insertCell().appendChild(readButton);
        readButton.dataset.index = key;
        readButton.addEventListener('click', (e) => {
            myLibrary[e.target.dataset.index].toggleRead();
            displayBook();
         });
         


        removeButton.dataset.index = key;
        removeButton.addEventListener('click', (e)=> {
            const index = parseInt(e.target.dataset.index);
            myLibrary.splice(index, 1)
            tableBody.removeChild(bookRow)
        })


    }
}

function clearInputs() {
    for(let i=0; i<allNameInput.length; i++) {
        allNameInput[i].value = "";
    }
} 
addBookToLibrary();
