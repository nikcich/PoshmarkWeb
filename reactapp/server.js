const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const fs = require('fs');
const { deepStrictEqual } = require('assert');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "binder",
    password: "password",
    database: "TeresaPoshmark"
});

function sqlDate(dt) {
    dt = dt.replace('/', '-')
    dt = dt.replace('/', '-')
    dt = dt.replace('?', '1')
    if (dt === '' || dt === undefined || dt === 'NULL') {
        return 'NULL'
    } else {
        return `STR_TO_DATE('${dt}', '%m-%d-%y')`;
    }
}

// app.get('/', async (req, res) => {
//     for (let i in data) {
//         let curr = data[i];

//         curr.profit = curr.profit.replace('(', '');
//         curr.profit = curr.profit.replace(')', '');
//         let qr1 = `select * From source WHERE name='${curr.source}'`
//         let qr2 = `select * From platform WHERE name='${curr.platform}'`

//         db.query(qr1, (err, srcResult) => {
//             db.query(qr2, (err2, platResult) => {
//                 let src;
//                 let plat;
//                 if (srcResult.length > 0) {
//                     src = srcResult[0].id;
//                 } else {
//                     src = 'NULL'
//                 }

//                 if (platResult.length > 0) {
//                     plat = platResult[0].id;
//                 } else {
//                     plat = 'NULL'
//                 }

//                 let qr = `INSERT INTO item (description, purchase_dt, sale_dt, purchase_price, source_id, 
//                     sales_price, commission, shipping, remarks, platform_id, sold_status, bundle, profit) 
//                     VALUES ('${curr.desc}', ${sqlDate(curr.date)}, ${sqlDate(curr.datesold)}, '${curr.purchase}', ${src}
//                     , '${curr.netsale}', '${curr.commission}', '${curr.shipping}', '${curr.remark}', ${plat}, NULL, NULL, '${curr.profit}'
//                     )
//                     `;

//                 //console.log(qr);

//                 db.query(qr, (err3, finalRes) => {
//                     //console.log(finalRes);
//                     if(err3){
//                         console.log(err3);
//                         console.log(i);
//                         console.log(curr);
//                     }
//                 });


//             });
//         });

//     }
//     res.send("Success");
// });

app.post('/api/login', (req, res) => {
    let curr = JSON.parse(req.headers.body);

    if(curr?.username === 'teresa' && curr?.password === '1011'){
        res.json({auth: true})
    }else{
        res.sendStatus(404);
    }
});

app.post('/api/addItem', (req, res) => {

    let curr = JSON.parse(req.headers.body);
    //console.log(curr);
    let qr = `INSERT INTO item (description, purchase_dt, sale_dt, purchase_price, source_id, 
            sales_price, commission, shipping, remarks, platform_id, sold_status, bundle, profit) 
            VALUES ('${curr.description}', ${sqlDate(curr.date)}, ${sqlDate(curr.datesold)}, '${curr.purchase}', ${curr.src}
            , '${curr.netsale}', '${curr.commission}', '${curr.ship}', '${curr.remark}', ${curr.plat}, NULL, NULL, '${curr.prof}'
            );`;

    db.query(qr, (err, finalRes) => {
        if (err) {
            console.log(err);
        }
        res.sendStatus(200);
    });
});

app.post('/api/addLocation', (req, res) => {

    let curr = JSON.parse(req.headers.body);
    let table;
    if (curr.type === 1) {
        table = 'source';
    } else {
        table = 'platform';
    }
    let qr = `INSERT INTO ${table} (name) 
            VALUES ('${curr.name}');`;

    db.query(qr, (err, finalRes) => {
        if (err) {
            console.log(err);
        }
        res.sendStatus(200);
    });
});

app.post('/api/updateItem', (req, res) => {

    let curr = JSON.parse(req.headers.body);

    let qr = `
                UPDATE item SET 
                description='${curr.description}',
                purchase_dt=${sqlDate(curr.date)},
                sale_dt=${sqlDate(curr.datesold)},
                purchase_price='${curr.purchase}',
                source_id=${curr.src},
                sales_price='${curr.netsale}',
                commission='${curr.commission}',
                shipping='${curr.ship}',
                remarks='${curr.remark}',
                platform_id=${curr.plat},
                profit='${curr.prof}'
                WHERE id=${curr.id}
            `;

    db.query(qr, (err, finalRes) => {
        if (err) {
            console.log(err);
        }
        res.sendStatus(200);
    });

});

function getNumber(s) {
    s = s.replace('$', '');
    s = parseFloat(s);
    if (s >= 0) {
        return s;
    } else {
        return 0;
    }
}

app.post('/api/bundleItems', (req, res) => {

    let curr = JSON.parse(req.headers.body);
    let items = curr.items;
    let bundlesize = items.length;
    curr.netsale = '$' + (getNumber(curr.netsale) / bundlesize);
    curr.commission = '$' + (getNumber(curr.commission) / bundlesize);
    curr.ship = '$' + (getNumber(curr.ship) / bundlesize);
    curr.prof = '$' + (getNumber(curr.prof) / bundlesize);

    for (let i in items) {
        let it = items[i];

        let qr = `
                UPDATE item SET 
                sale_dt=${sqlDate(curr.datesold)},
                sales_price='${curr.netsale}',
                commission='${curr.commission}',
                shipping='${curr.ship}',
                remarks='${curr.remark}',
                platform_id=${curr.plat},
                profit='${curr.prof}',
                bundle=1
                WHERE id=${it.id}
            `;

        db.query(qr, (err, finalRes) => {
            if (err) {
                console.log(err);
            }
        });

    }

    res.sendStatus(200);
});

app.get('/api/items', (req, res) => {
    db.query('select * from item', (err, result) => {
        if (result.length > 0) {
            res.json(result);
        } else {
            res.json([]);
        }
    })
});

app.get('/api/sources', (req, res) => {
    db.query('select * from source', (err, result) => {
        if (result.length > 0) {
            res.json(result);
        } else {
            res.json([]);
        }
    })
});

app.get('/api/platforms', (req, res) => {
    db.query('select * from platform', (err, result) => {
        if (result.length > 0) {
            res.json(result);
        } else {
            res.json([]);
        }
    })
});

app.get('/api/profits', (req, res) => {
    db.query('select item.id ItemId, item.profit, platform.id PlatID, platform.name PlatName, source.id SrcID, source.name SrcName from item, platform, source WHERE item.platform_id=platform.id and item.source_id=source.id', (err, result) => {
        if (result.length > 0) {
            res.json(result);
        } else {
            res.json([]);
        }
    })
});

app.get('/api/purchasePrice', (req, res) => {
    let qr = `
    select item.id ItemId, item.purchase_price, platform.id PlatID, platform.name PlatName, source.id SrcID, source.name SrcName from item, platform, source 
    WHERE item.platform_id=platform.id and item.source_id=source.id
    `
    db.query(qr, (err, result) => {
        if (result.length > 0) {
            res.json(result);
        } else {
            res.json([]);
        }
    })
});

app.get('/api/salePrice', (req, res) => {
    let qr = `select item.id ItemId, item.sales_price, platform.id PlatID, platform.name PlatName, source.id SrcID, source.name SrcName from item, platform, source 
    WHERE item.platform_id=platform.id and item.source_id=source.id`;
    db.query(qr, (err, result) => {
        if (result.length > 0) {
            res.json(result);
        } else {
            res.json([]);
        }
    })
});

app.get('/api/commissions', (req, res) => {
    let qr = `select item.id ItemId, item.commission, platform.id PlatID, platform.name PlatName, source.id SrcID, source.name SrcName from item, platform, source 
    WHERE item.platform_id=platform.id and item.source_id=source.id`;
    db.query(qr, (err, result) => {
        if (result.length > 0) {
            res.json(result);
        } else {
            res.json([]);
        }
    })
});

app.get('/api/profitDates', (req,res) => {
    let qr = `select * from item where item.sale_dt IS NOT NULL ORDER BY sale_dt ASC`;

    db.query(qr, (err, result) => {
        if (result.length > 0) {
            res.json(result);
        } else {
            res.json([]);
        }
    })
});

let server = app.listen(6969, function () {
    console.log("RUNNING ON 6969");
})