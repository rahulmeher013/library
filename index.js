console.log("This is index.js");

//constructor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

//display constructor
function Display() {}

//Add methos to display prototype
Display.prototype.add = function (book) {
  console.log("adding to UI");
  tableBody = document.getElementById("tableBody");
  let uiString = `
    <tr>
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.type}</td>
  </tr>`;
  tableBody.innerHTML += uiString;
};
Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

Display.prototype.validate = function (book) {
    console.log('hello')
  if (book.name.length < 2 || book.author.length < 2) {
    return false;
  } else {
    return true;
  }
};

Display.prototype.show = function (type, displaymessage) {
  let message = document.getElementById("msg");
  message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message:</strong> ${displaymessage}.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
    setTimeout(function(){
        message.innerHTML = ''
    },2000)
};

//Add submit event to listener

let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(event) {
  event.preventDefault();
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;

  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");
  let type;

  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }

  let book = new Book(name, author, type);
  console.log(book);

  let display = new Display();

  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show("success", 'Your book has been succesfully added');
  } else {
 
    display.show('danger', 'Sorry you cannot add this book');
  }

  event.preventDefault()
}
