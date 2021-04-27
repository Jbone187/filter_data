let fs = require("fs");

let {
    exec
} = require("child_process");

let testArray = [];
let testArray2 = [];

let crushapi_start = exec('sh /home/jasen/Node/crush_curl.sh');

crushapi_start.stdout.on('data', (data) => {
   

   let data_split_white_space = data.replace(/ /g, ',');

   let data_split = data_split_white_space.split(',');


   for (let i = 0; i < data_split.length; i++) {

    testArray.push(data_split[i])
    
};


let regEx = /(.*the_file_name=.*)/i;

//let regEx = /(^the_)|(.*file_name=.*)/i;

let val = testArray.filter(function(str) { return regEx.test(str) })


for (let i = 0; i < val.length; i++) {

let cutValue = val[i];

let newValue = cutValue.substring(14);

    testArray2.push(newValue);
    
};


console.log(testArray2)

let obj = {crush: testArray2}

let dataObject = JSON.stringify(obj);

fs.writeFileSync("/home/jasen/Node/crush_data.txt", dataObject);


});
