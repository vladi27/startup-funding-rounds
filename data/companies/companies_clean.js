const fs = require("fs");

fs.readFile("./companies.json", "utf8", function(err, data) {
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
      if (obj.funding_total_usd && obj.founded_year ) {
        newObj = {
          totalFunding: obj.funding_total_usd,
          company: obj.name,
          sector: obj.category_code,
          founded: obj.founded_year

        };
        return newObj;
      }
    });
    //console.log(newJson2)
    
    let newJson = newJson2.filter(obj => {
      return obj != null;
    });

    fs.writeFile(
      "./new_companies.json",
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