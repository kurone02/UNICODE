const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const accounts = require('./database/accounts.json'); 
const axios = require('axios').default;
const fs = require('fs');

const app = express();

//set port and policy
app.set('port', process.env.PORT || 2022);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/accounts', (req, res) => {
    res.send(accounts);
});

app.get('/test/:pcode', async (req, res) => {
    fs.readFile(`database/testcases/${req.params.pcode}.inp`, (err, data) => {
        if (err) {
            res.send({status: "Not found"})
            return;
        }
        res.send(data);
    });
});

app.post('/login', (req, res) => {
    let found = false;
    accounts.accounts.forEach(async (acc) => {
        if(req.body.username !== acc.username) return;
        if(req.body.password !== acc.password) return;
        found = true;

        const query = `http://0.0.0.0:1317/cosmos/bank/v1beta1/balances/${acc.address}`;
        const data = (await axios.get(query)).data

        // console.log(data);

        let coins = 0;
        for(let i = 0; i < data.balances.length; i++){
            if(data.balances[i].denom !== "token") continue;
            coins = data.balances[i].amount;
        }

        res.send({
            username: acc.username, 
            password: acc.password,
            address: acc.address,
            mnemonic: acc.mnemonic,
            coins: coins
        });
    });
    if(!found) res.send({status: "failed"});
});

app.post("/check/:pcode", async (req, res) => {
    console.log(req.body);
});

app.listen(app.get('port'), '0.0.0.0', () => {
    console.log('Express server listening on port ' + app.get('port'));
});