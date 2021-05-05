let fs = require('fs');

let crush_node_config = require('./crush_node_config.json');


fs.readFile(crush_node_config.deleteCache, 'utf8', function (err, data) {

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

    fs.writeFileSync('crush_data.json', dataObject);

    //Cache file clean up
    fs.unlink(crush_node_config.deleteCache, (err) => {
        if (err) {
            throw err;
        }

        console.log(`${crush_node_config.deleteCache} File has been deleted...`);
    });

});
