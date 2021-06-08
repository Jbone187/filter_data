let fs = require('fs');
let crush_args = process.argv

//Pull Data from Directory containing .json Files
fs.readdir(`${crush_args[2]}`, function (err, json_files) {

    let arr_json = [];

    if (err) {
        return console.log('Unable to scan directory: ' + err);
    };
    //Filter files that have a .json extension
    for (let i = 0; i < json_files.length; i++) {

        let reg = /(\.json)$/

        let ret_Value = reg.test(json_files[i]);

        if (ret_Value === true) {

            arr_json.push(json_files[i]);
        };

    };
    //Move Data to pullData Function
    pullData(arr_json);

});

function pullData(newArr) {

    let numArray = [];
    let num_json_Array = [];

    //Pull time stamp numbers from .json file name
    for (let i = 0; i < newArr.length; i++) {

        //Remove after second underscore
        let regex = /^(?:[^_]+_){2}([^_ ]+)/;

        let newData = regex.exec(newArr[i]);

        num_json_Array.push(newData[1]);
    };

    for (let i = 0; i < num_json_Array.length; i++) {

        //Take out .json
        let dataSplit = num_json_Array[i].replace('.json', '');

        numArray.push(dataSplit);
    };

    const numbers = numArray.map((n) => {
        return parseInt(n);
    });

    //Pull latest time stamp and find file
    let maxValue = Math.max(...numbers);

    let crush_json = require(`${crush_args[2]}/${crush_args[3]}${maxValue}.json`); //UPDATE WITH SERVER DIRECTORY AND PROPER FILE NAME!!!!! ${crush_args[??]}

    let newArray = [];

    //Pull Data from File Directory to Compare against .json
    fs.readdir(`${crush_args[4]}`, function (err, files) {

        if (err) {
            return console.log('Unable to scan directory: ' + err);
        };

        for (let i = 0; i < files.length; i++) {

            newArray.push(files[i])
        };

        let crush_obj = {

            crush: newArray
        };

        //Compare Arrays
        let finalCompare = crush_json.crush.length === crush_obj.crush.length && crush_json.crush.every(function (element) {

            return crush_obj.crush.includes(element);
        });

        //Data Output
        console.log(crush_obj.crush);

        console.log(crush_json.crush);

        console.log(finalCompare)

        //Job will be ran after boolean value is determined
        if (finalCompare === true) {

            console.log("Success")

        } else if (finalCompare === false) {

            throw new Error('File Directories Dont Match')

        };

    });

};
