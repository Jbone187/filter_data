let fs = require('fs')


fs.readFile('hello2.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    };

    let new_Data = data.replace(/\r?\n|\r/g, " ").replace(/[ ]+/g, " ");

    let data_split = new_Data.split(" ");

    let arrFiltered = data_split.filter(Boolean);

    console.log(arrFiltered)


    let crush_obj = {

        crush: [arrFiltered]
    };

    let dataObject = JSON.stringify(crush_obj);

    fs.writeFileSync("/home/jasen/Node/new_crush_data.json", dataObject);


});
