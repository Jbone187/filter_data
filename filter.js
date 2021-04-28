let fs = require("fs");

let {
    exec
} = require("child_process");


let data_split_Array = [];
let data_cut_Array = [];

//Contact Crush Job Through API

let crushapi_start = exec('sh /home/jasen/Node/crush_curl.sh');

crushapi_start.stdout.on('data', (data) => {


    let data_split_white_space = data.replace(/ /g, ',');

    let data_split = data_split_white_space.split(',');


    for (let i = 0; i < data_split.length; i++) {

        data_split_Array.push(data_split[i])

    };

    //Filter Data from Crush API

    let regEx = /(.*the_file_name=.*)/i;


    let regEx_Filter = data_split_Array.filter(function (str) {
        return regEx.test(str)
    })


    for (let i = 0; i < regEx_Filter.length; i++) {

        let cutValue = regEx_Filter[i];

        let newValue = cutValue.substring(14);

        data_cut_Array.push(newValue);

    };

    //Clean up Duplicates in Array

    let duplicate_set_clean = new Set(data_cut_Array);

    console.log(duplicate_set_clean)

    let crush_obj = {

        crush: [...duplicate_set_clean]
    }

    //Create Json Data and add to file

    let dataObject = JSON.stringify(crush_obj);

    fs.writeFileSync("/home/jasen/Node/crush_data.json", dataObject);


});
