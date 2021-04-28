let fs = require('fs');
let path = require('path');
let crush_json = require('./crush_data.json');

let {
    exec
} = require("child_process");

let newArray = [];

let directoryPath = path.join(__dirname);

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

    console.log(crush_obj);

    console.log(crush_json.crush);

    console.log(finalCompare)

    //After compare is based off boolean value a Crush Job will be Ran.

    if (finalCompare === true) {

        /*
//Run Job

let crushapi_start = exec('sh /home/jasen/Node/crush_curl.sh');

crushapi_start.stdout.on('data', (data) => {

console.log(data);

});
*/
    } else if (finalCompare === false) {

        /*
//Run Job

let crushapi_start = exec('sh /home/jasen/Node/crush_curl.sh');

crushapi_start.stdout.on('data', (data) => {

console.log(data);

});
*/

    };


});
