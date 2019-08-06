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
      if (typeof obj.price_amount === "number") {
        newObj = {
          price: obj.price_amount,
          company: obj.company_name,
          date: obj.acquired_at,
          year: obj.acquired_year
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

// {
//     "company_permalink": "/company/1000memories",
//     "company_name": "1000memories",
//     "company_category_code": "web",
//     "company_country_code": "USA",
//     "company_state_code": "CA",
//     "company_region": "SF Bay",
//     "company_city": "San Francisco",
//     "acquirer_permalink": "/company/ancestry-com",
//     "acquirer_name": "Ancestry",
//     "acquirer_category_code": "ecommerce",
//     "acquirer_country_code": "USA",
//     "acquirer_state_code": "UT",
//     "acquirer_region": "Salt Lake City",
//     "acquirer_city": "Provo",
//     "acquired_at": "2012-10-03",
//     "acquired_month": "2012-10",
//     "acquired_quarter": "2012-Q4",
//     "acquired_year": 2012,
//     "price_amount": "",
//     "price_currency_code": "USD"
//   },
