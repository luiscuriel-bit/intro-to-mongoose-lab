const prompt = require("prompt-sync")();
const mongoose = require("mongoose");
require("dotenv").config();
const Customer = require("./models/customer.js");

let name;
let age;
let customers;
let id;
let option;

const connectDatabase = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    // console.log("MongoDB connected");
};

const createCustomer = async () => {
    const name = prompt("What is the customer's name? ");
    const age = prompt("What is the customer's age? ");
    await Customer.create({ name, age });
    console.log("Customer created succesfully.");
};
const listCustomers = async () => {
    const customers = await Customer.find();
    console.log(`Below is a list of customers:\n${customers}`)
};

const updateCustomer = async () => {
    await listCustomers();
    const id = prompt("Copy and paste the id of the customer you would like to update here: ");
    const name = prompt("What is the customer's name name? ");
    const age = prompt("What is the customer's new age? ");
    await Customer.findByIdAndUpdate(id, { name, age });
    console.log("Customer updated succesfully.");
};

const deleteCustomer = async () => {
    await listCustomers();
    const id = prompt("Copy and paste the id of the customer you would like to delete here: ");
    await Customer.findByIdAndDelete(id);
    console.log("Customer deleted succesfully.");
};

const showMenu = async () => {
    let options = [
        "1. Create a new customer",
        "2. View all customers",
        "3. Update an existing customer",
        "4. Delete a customer",
        "5. Quit: ",
    ]
    option = prompt(`Please choose an action: ${options.join(", ")}`);

    switch (option) {
        case '1':
            await createCustomer();
            break;
        case '2':
            await listCustomers();
            break;
        case '3':
            await updateCustomer();
            break;
        case '4':
            await deleteCustomer();
            break;
        case '5':
            console.log("Exiting...\n");
            break;
        default:
            console.log("Please select a valid option\n");
    }
}

const runApp = async () => {
    console.log("Welcome to Terminal CRM!");
    await connectDatabase();
    await showMenu();
    mongoose.connection.close();
}

runApp();