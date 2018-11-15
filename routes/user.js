const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/api/user/:id", function(req, res) {
    
    db.User.findOne({_id: req.params.id}).populate("budget special").then(function(err, data){ 
        // console.log(data);
        if(err) return res.json(err);

        res.json(data);
    });
});

router.post("/api/user", function(req, res) {
    db.User.create(req.body, function(err, data) {
        if(err) return res.json(err);

        res.json(data);
    });
});

router.post("/login", function(req, res) {
    db.User.findOne({username: req.body.username}, function(err, data) {
        if(!data) return res.json("Wrong");

        data.comparePassword(req.body.password, function (error, response) {
            if(error) res.json(error);

            res.json({success:response,user:data});
        });
    })
});

router.post("/api/addNewItem", function(req, res) {

    if (req.body.newItem.type == 2) req.body.newItem.type = "expenses";
    else req.body.newItem.type = "earnings";
    
    // console.log("ROUTE" , req.body);
    
    db.Budget.create(req.body.newItem)
    .then(function(dbBudget) {
      return db.User.findOneAndUpdate({ _id: req.body.user }, { $push:{budget:dbBudget }}, { new: true });
    })
    .then(function(dbUser) {

      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

router.post("/api/addNewSpecial", function(req, res) {
    // console.log("ROUTE" , req.body);
    
    db.Special.create(req.body.newItem)
    .then(function(dbSpecial) {
      return db.User.findOneAndUpdate({ _id: req.body.user }, { $push:{special:dbSpecial }}, { new: true });
    })
    .then(function(dbUser) {

      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });

});

router.get("/api/getBudgetItem", function(req, res) {
    db.Budget.findOne(req.body, function(err, data) {
        if (err) throw err;

        res.json(data)
    })
});

router.post("/api/sendMoney", function(req, res) {
    // console.log(req.body);

    db.User.findOne({username: req.body.data.to},function(err, Data) {
        if (err) res.json(err);
        if (!Data) return res.json("Not Found");

        // console.log(Data);
        Data.wallet = parseFloat(Data.wallet) + parseFloat(req.body.data.amount)
        Data.save();

        db.User.findOne({_id: req.body.user}, function(error, d) {
            if (error) throw error;

            // console.log(d);
            d.wallet = parseFloat(d.wallet) - parseFloat(req.body.data.amount);
            d.save();

            res.json(d);
        })
    })
});

router.post("/api/deleteBudget", function(req, res) {
    // console.log(req.body);
    db.Budget.deleteOne(req.body, function(err, data) {
        if (err) throw err;

        res.json(data);
    });
});

router.post("/api/deleteSpecial", function(req, res) {
    db.Special.deleteOne(req.body, function(err, data) {
        if (err) throw err;

        res.json(data);
    });
});

module.exports = router;