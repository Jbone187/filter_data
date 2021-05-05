let fs = require('fs');
let path = require('path');
let crush_json = require('./crush_data.json');
let crush_config = require('./crush_node_config.json');

let newArray = [];

let directoryPath = path.join(__dirname, crush_config.download_path);

//Pull Data from File Directory

fs.readdir(directoryPath, function (err, files) {

    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    for (let i = 0; i < files.length; i++) {

        newArray.push(files[i])

    };

    let crush_obj = {

        crush: newArray
    };

   
    /*
    Test 
    crush_obj.crush = crush_json.crush;
    */

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
