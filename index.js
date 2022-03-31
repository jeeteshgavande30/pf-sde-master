// Import input file
const data = require("./1-input");

// Defining variables
const {expenseData, revenueData} = data;
let output = [];
let result = []; // this will store final result

// variables to store the first and last date in the data set
let start = new Date();
let end = new Date('1970-05-01T00:00:00.000Z');

// function to get next month
function addMonth(date) {
    let d = date.getDate();
    date.setMonth(date.getMonth() + +1);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
}

// calculating balance for each month
expenseData.map((element) => {
    start = new Date(element["startDate"]).getTime() < start.getTime() ? new Date(element["startDate"]) : start
    end = new Date(element["startDate"]).getTime() > end.getTime() ? new Date(element["startDate"]) : end

    if(output[element["startDate"]]){
        output[element["startDate"]] -= element["amount"]
    } else {
        output[element["startDate"]] = -element["amount"]
    }    
})

revenueData.map((element) => {
    start = new Date(element["startDate"]).getTime() < start.getTime() ? new Date(element["startDate"]) : start
    end = new Date(element["startDate"]).getTime() > end.getTime() ? new Date(element["startDate"]) : end

    if(output[element["startDate"]]){
        output[element["startDate"]] += element["amount"]
    } else {
        output[element["startDate"]] = element["amount"]
    }    
})


// finding difference B/W 1st and last month
let monthDifference = end.getMonth() - start.getMonth() + (12 * (end.getFullYear() - start.getFullYear()))

// Pushing values in the result array in sorted order
for(let i = 0; i <= monthDifference; i++){
    result.push({
        "amount" : output[start.toISOString()] ?? 0,
        "startDate" : start.toISOString()
    })
    addMonth(start);    
}

// Printing result in console
console.log(result)