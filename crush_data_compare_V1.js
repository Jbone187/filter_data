let fs = require('fs');
let today = new Date();
let crush_args = process.argv
let date = today.getFullYear() + "" + today.getDate() + "" + today.getMonth();

if (process.argv[2] === "--help") {

    console.log(`\n Crush Data Compare takes take @parms and compares .json data and compare that with a file directory.

  usage:

  Node File Filter Script <command>
  commands can be:
  
  @Parm1: Name of .json file in "<name>_<name>_" formate.
  @Parm2: File directory where .json file is located.
  @Parm3: File directory to compare with data included in .json file.
  @Parm4: Choose to delete .json file or move to a new directory "true" or "false".
  @Parm5: If @parm4 is set to "true" this @parm is the directory where the .json file will need to be moved to.

  --help: Used to print the usage guide. \n`);

    process.exit();

};

//Pull Data from Directory containing .json Files
fs.readdir(`${crush_args[3]}`, function (err, json_files) {

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

    let crush_json = require(`${crush_args[3]}/${crush_args[2]}${maxValue}.json`);

    let newArray = [];


// Use @parm to choose to delete .json or rename and move to new directory
    if (crush_args[5] === 'false') {


        fs.unlink(`${crush_args[3]}/${crush_args[2]}${maxValue}.json`, (err) => {
            if (err) {
                throw err;
            }

            console.log(`${crush_args[2]}${maxValue}.json File has been deleted...`);
        });

    } else if (crush_args[5] === 'true') {

        fs.copyFileSync(`${crush_args[3]}/${crush_args[2]}${maxValue}.json`, `${crush_args[6]}/${crush_args[2]}${date}${maxValue}.json`)

        fs.unlink(`${crush_args[3]}/${crush_args[2]}${maxValue}.json`, (err) => {
            if (err) {
                throw err;
            }

            console.log(`${crush_args[2]}${maxValue}.json File has been deleted...`);
        });

        console.log(`${crush_args[2]}${date}${maxValue}.json File has been moved to file directory.. ${crush_args[6]}`);

    };


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
