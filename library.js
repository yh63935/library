let myLibrary = [];
const bookTable = document.querySelector('table');
const dialog = document.querySelector('dialog');
const tableBody = document.querySelector('tbody');
// Is it bad to be using allNameInput to get the names and populate the table? Is there a better way to do this
// or make the variable private but still reuse
let allNameInput = Array.from(document.querySelectorAll('input[name]'));
let allNames = [];
for (let i=0; i<allNameInput.length; i++) {
    allNames.push(allNameInput[i].getAttribute('name'))
}

setTableHeader();


function Book(arr) {
    for(let i =0; i<arr.length;i++) {
        this[allNames[i]] = arr[i].value;
    }
    this.readCount = 0;
    this.hasRead = false;
}

Book.prototype.toggleRead = function() {
    if (this.readCount === 0) {
        this.readCount = 1;
        this.hasRead = true;
    } else {
        this.readCount = 0;
        this.hasRead = false;
    }
 };
 

function addBookToLibrary() {
    const submit = document.querySelector('input[type="submit"]');
    const form = document.querySelector('form');
    const errorMessage = Array.from(document.querySelectorAll('.error'))

    submit.addEventListener('click', (e)=> {
        e.preventDefault();
        if (form.checkValidity()) {
            const newBook = new Book(allNameInput);
            myLibrary.push(newBook);
            clearInputs();
            displayBook();
        }
        else { 
            for (let [key,input] of Object.entries(allNameInput)) {
                errorMessage[key].innerText = input.validationMessage;
            }
        }
    
    })
}

function setTableHeader() {
    const tableHeader = document.querySelector('theader')
    const headerRow = document.createElement('tr');
    for(let name of allNames) {
        const headerEl = document.createElement('th');
        headerEl.innerText = name;
        headerRow.appendChild(headerEl)
    }
    tableHeader.appendChild(headerRow);
}

function formValidation() {
        
        //get all the input values with the name attribute
        // loop through the properties of the input array
        //if the property is title, author, it should be type of string
            //error message
        // const submit = document.querySelector('input[type="submit"]');
        // const errorMessage = Array.from(document.querySelectorAll('.error'))
        // submit.addEventListener('click', ()=> {
        //     for (let [key,input] of Object.entries(allNameInput)) {
        //         if ((input.getAttribute('name') === 'author' || input.getAttribute('name') === 'title') && !isNaN(parseInt(input.value)))  {
        //                 errorMessage[key].innerText = 'Please enter a string';
        //                 console.log('Please enter a string')
    
        //         }
        //         if ((input.getAttribute('name') === 'pages' || input.getAttribute('name') === 'rating') && isNaN(parseInt(input.value))) {
        //             errorMessage[key].innerText = 'Please enter a number';
        //             console.log('Please enter a number')
        //             console.log(isNaN(parseInt(input.value)))
        //         }
        //         if (input.getAttribute('name') === 'read' && input.value.toLowerCase()!=='yes' && input.value.toLowerCase()!=='no') {
        //             errorMessage[key].innerText = 'Please enter "yes" or "no"';
        //         }
        //     }
        // })
        // if the name is pages or rating, it should be type of num
        // if the name is read, it should be boolean? or yes/no
        // add code inside submit event listener, should grab input values when submit is pressed
}
formValidation()
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
