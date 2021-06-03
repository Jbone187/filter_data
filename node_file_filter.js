let fs = require('fs');


let today = new Date();
let crush_args = process.argv
let time = today.getHours() + "" + today.getMinutes();

console.log(`${crush_args[2]}_${crush_args[3]}.txt`);

fs.readFile(`${crush_args[2]}_${crush_args[3]}.txt`, 'utf8', function (err, data) {

    if (err) {
        return console.log(err);
    };

    // File string maniplulation
    let new_Data = data.replace(/\r?\n|\r/g, " ").replace(/[ ]+/g, " ");

    let data_split = new_Data.split(" ");

    let arrFiltered = data_split.filter(Boolean);

    console.log(arrFiltered);

    // Create Json file
    let crush_obj = {

        crush: arrFiltered
    };

    let dataObject = JSON.stringify(crush_obj);

    fs.writeFileSync(`./cr_test/${crush_args[2]}_${crush_args[3]}_${time}.json`, dataObject);//UPDATE FILE PATH!!!

    //Cache file clean up
    
    /*
    fs.unlink(`${crush_args[2]}_${crush_args[3]}.txt`, (err) => {
        if (err) {
            throw err;
        }

        console.log(`${crush_args[2]}_${crush_args[3]}.txt File has been deleted...`);
    });
*/
});
