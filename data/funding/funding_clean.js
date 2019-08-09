const fs = require("fs");

fs.readFile("./funding.json", "utf8", function(err, data) {
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
      if (
        obj.raised_amount_usd &&
        obj.funded_year > 1999 &&
        (obj.company_category_code === "mobile" ||
          obj.company_category_code === "web" ||
          obj.company_category_code === "software" ||
          obj.company_category_code === "ecommerce" ||
          obj.company_category_code === "medical") &&
        (obj.funding_round_type === "series-a" ||
          obj.funding_round_type === "series-c+" ||
          obj.funding_round_type === "angel" ||
          obj.funding_round_type === "series-b" ||
          obj.funding_round_type === "venture")
      ) {
        newObj = {
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
      "./new_funding.json",
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

// "company_permalink": "/company/shwrm",
//     "company_name": "_Shwr�m",
//     "company_category_code": "software",
//     "company_country_code": "USA",
//     "company_state_code": "FL",
//     "company_region": "Gainesville",
//     "company_city": "Gainesville",
//     "funding_round_type": "angel",
//     "funded_at": "2013-01-01",
//     "funded_month": "2013-01",
//     "funded_quarter": "2013-Q1",
//     "funded_year": 2013,
//     "raised_amount_usd": 50000
