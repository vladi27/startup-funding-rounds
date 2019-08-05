
const fs = require("fs");

fs.readFile("./investments.json", "utf8", function(err, data) {
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
      if (obj.raised_amount_usd && obj.funded_year ) {
        newObj = {
        investor: obj.investor_name,
         amountRaised: obj.raised_amount_usd,
         round: obj.funding_round_type,
          company: obj.company_name,
          sector: obj.company_category_code,
          funded: obj.funded_year

        };
        return newObj;
      }
    });
    //console.log(newJson2)
    
    let newJson = newJson2.filter(obj => {
      return obj != null;
    });

    fs.writeFile(
      "./new_investments.json",
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

// "company_permalink": "/company/smartthings",
//     "company_name": "SmartThings",
//     "company_category_code": "mobile",
//     "company_country_code": "USA",
//     "company_state_code": "DC",
//     "company_region": "unknown",
//     "company_city": "Minneapolis",
//     "investor_permalink": "/person/zorik-gordon",
//     "investor_name": "Zorik Gordon",
//     "investor_category_code": "",
//     "investor_country_code": "",
//     "investor_state_code": "",
//     "investor_region": "unknown",
//     "investor_city": "",
//     "funding_round_type": "series-a",
//     "funded_at": "2012-12-04",
//     "funded_month": "2012-12",
//     "funded_quarter": "2012-Q4",
//     "funded_year": 2012,
//     "raised_amount_usd": 3000000