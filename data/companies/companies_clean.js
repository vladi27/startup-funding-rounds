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

// {
//         "permalink": "/company/zyrra",
//         "name": "Zyrra",
//         "category_code": "ecommerce",
//         "funding_total_usd": 1460500,
//         "status": "operating",
//         "country_code": "USA",
//         "state_code": "MA",
//         "region": "Boston",
//         "city": "Cambridge",
//         "funding_rounds": 3,
//         "founded_at": "",
//         "founded_month": "",
//         "founded_quarter": "",
//         "founded_year": "",
//         "first_funding_at": "2010-11-15",
//         "last_funding_at": "2012-10-18",
//         "last_milestone_at": ""
//     },