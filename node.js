const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const student = new Map();

function askCommand(){
    console.log("Welcome to data base System");
    console.log("Available commands: add ,remove, search, update, summary, exit");
    rl.question("Enter a Command: ", function(command){
        switch(command.trim().toLowerCase()){
            case 'add':
                addItemPrompt();
                break;
            case 'remove':
                removeItemPrompt();
                break;
            case 'search':
                searchItemsPrompt();
                break;
            case 'update':
                updateItemPrompt();
                break;
            case 'summary':
                printSummary();
                askCommand();
                break;
            case 'exit':
                rl.close();
                break;
            default:
                console.log("Invalid details. Please try again!");
                askCommand();
                break;
        }
    });
}

// function to add data prompt
function addItemPrompt(){
    rl.question("Enter name of student: ", function(name){
        rl.question("Enter student id: ", function(id){
            rl.question("Enter the grade: ", function(grade){
                addItem(id, name, grade);
                askCommand();
            });
        });
    });
}

// function to add data
function addItem(id, name, grade){
    if(student.has(id)){
        console.log(`Error: student with ID ${id} already exists.`);
    } else{
        student.set(id, {name, grade});
        console.log(   `Student with ID ${id} added.`);
    }
}

// Function to remove data
function removeItemPrompt() {
    rl.question("Enter student id to remove: ", function(id) {
        removeItem(id);
        askCommand();
    });
}

// function to remove data
function removeItem(id){
    if(student.has(id)){
        student.delete(id);
        console.log(`Student with ID ${id} removed.`);
    } else{
        console.log(`Error: Student with ID ${id} not found.`);
    }
}

// Function to search for data
function searchItemsPrompt() {
    rl.question("Enter search term: ", function(searchTerm) {
        searchItems(searchTerm);
        askCommand();
    });
}

// function to search for items
function searchItems(searchTerm){
    const results = [];
    for(const [id, item] of student){
        if(id.includes(searchTerm) || item.name.includes(searchTerm) || item.grade.includes(searchTerm)){
            results.push({id, ...item});
        }
    }
    if(results.length > 0){
        console.log('Search Results:', results);
    } else{
        console.log('No items found!');
    }
}

// function to update item prompt
function updateItemPrompt(){
    rl.question("Enter student id: ", function(id){
        rl.question("Enter new student name: ", function(newName){
            rl.question("Enter new grade: ", function(newGrade){
                updateItem(id, newName, newGrade);
                askCommand();
            });
        });
    });
}

// function to update an item
function updateItem(id, newName, newGrade){
    if(student.has(id)){
        const item = student.get(id);
        item.name = newName || item.name;
        item.grade = newGrade || item.grade;
        
        student.set(id, item);
        console.log(`Student with ID ${id} updated.`);
    } else {
        console.log(`Error: student with ID ${id} not found.`);
    }
}

// function to print a summary report of all items
function printSummary(){
    if(student.size > 0){
        console.log('Student Summary:');
        for(const [id, item] of student){
            console.log(`ID: ${id}, Name: ${item.name}, Grade: ${item.grade}`);
        }
    } else{
        console.log('Data is empty.');
    }
} 

askCommand();