let fs = require('fs')

let arr = []

fs.readFile('hello2.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  };

  let new_Data = data.replace(/\r?\n|\r/g, " ").replace(/[ ]+/g, " ");

  console.log(new_Data)


  let data_split = new_Data.split(" ");

  console.log(data_split);
  

 let arrFiltered = data_split.filter(Boolean);

 console.log(arrFiltered)


 let crush_obj = {

    crush: [arrFiltered]
};

let dataObject = JSON.stringify(crush_obj);

fs.writeFileSync("/home/jasen/Node/new_crush_data.json", dataObject);


/*
  
  for(let i=0; i < arrFiltered.length; i++){

    arr.push(arrFiltered[i])
  };


*/

  
});
