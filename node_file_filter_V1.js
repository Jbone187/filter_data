let fs = require('fs');
let today = new Date();
let crush_args = process.argv
let fix_minutes = (today.getMinutes() < 10) ? 0 : "";
let time = today.getHours() + "" + fix_minutes + today.getMinutes()


if (process.argv[2] === "--help") {

    console.log(`\n Node File Filter takes file directory info and make a .json file with the data included.

  usage:

  Node File Filter Script <command>
  commands can be:
  @Parm1: Add name of file without extension.
  @Parm2: File directory to put .json file.

  --help: Used to print the usage guide. \n`);

    process.exit();

};

fs.readFile(`/${crush_args[3]}/${crush_args[2]}.txt`, 'utf8', function (err, data) {

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

    fs.writeFileSync(`/${crush_args[3]}/${crush_args[2]}_${time}.json`, dataObject); //UPDATE FILE PATH!!!

    //Cache file clean up

      
    fs.unlink(`/${crush_args[3]}/${crush_args[2]}.txt`, (err) => {
        if (err) {
            throw err;
        }

        console.log(`${crush_args[2]}.txt File has been deleted...`);
    });
});
