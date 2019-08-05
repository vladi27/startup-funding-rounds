const fs = require("fs");

fs.readFile("./acquisitions.json", "utf8", function(err, data) {
  if (err) {
    console.log(err);
  } else {
    const jsonArray = JSON.parse(data);
    console.log(jsonArray);

    // const newjson = {
    //   price: jsonArray.price_amount,
    //   company: jsonArray.company_name,
    //   year: jsonArray.acquired_year
    // };

    let newJson2 = jsonArray.map(obj => {
      let newObj = {};
      if (obj.price_amount) {
        newObj = {
          price: obj.price_amount,
          company: obj.company_name,
          date: obj.acquired_at
        };
        return newObj;
      }
    });

    let newJson = newJson2.filter(obj => {
      return obj != null;
    });

    fs.writeFile(
      "./object.json",
      JSON.stringify(newJson, null, 4),
      "utf8",
      function(err) {
        if (err) {
          console.log(err);
        } else {
          //Everything went OK!
          console.log("File has been created");
        }
      }
    );
  }
});
