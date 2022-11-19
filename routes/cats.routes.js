const router = require("express").Router();
const axios = require("axios");
// const https = require("https");

const url = new URL("https://cataas.com");

router.get("/cats/tags", (req, res, next) => {
  axios
    .get(`${url}/api/tags`)
    .then((response) => {
      console.log(response)
      res.send(response.data);
    })
    .catch((e) => {
      console.log("error getting tags from api");
    });
});

router.get("/cats", (req, res, next) => {
  axios
    .get(`${url}/api/cats`)
    .then((response) => {
      console.log(response)
      res.send(response.data);
    })
    .catch((e) => {
      console.log("error getting cats from api");
    });
});

router.get("/cats/filter", (req, res, next) => {
  // const filterData = {
  //     tag: req.body.tag,
  //     skip: req.body.skip,
  //     limit: req.body.limit
  //     }

  const filterData = {
    tag: "sad",
    skip: 0,
    limit: 10,
  };

  axios
    .get(
      `${url}/api/cats?tags=${filterData.tag}&omit=${filterData.skip}&total=${filterData.limit}`
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((e) => {
      console.log("error filtering cats");
    });
});

// router.get("/cats/search", (req, res, next) => {
//     // axios.get(`${url}/api/cats/match?string=${substr}`)
//     // .then()
//     // .catch((e) => {
//     //     console.log("error searching for cats");
//     //   });

//     res.render()
// })

router.get("/cats/search", (req, res, next) => {
  // const textToFind = req.body.search ? req.body.search.trim() : "";
  axios
    .get(`${url}/api/cats`)
    .then((response) => {
      const substrings = "cute";
      let searchResult = [];
      response.data.map((item) => {
        item.tags.forEach((element) => {
          if (element.includes(substrings)) {
            searchResult.push(item);
          }
        });
      });
      return searchResult;
    })
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log("Error searching for cats", e);
    });
});

module.exports = router;
