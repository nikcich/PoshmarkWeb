import { DonutChart, LineChart } from "@carbon/charts-react";
import { useEffect, useState } from 'react';

function StatsView(props) {

    const srcProfitOptions = {
        "title": "Profits By Item Source",
        "resizable": false,
        "donut": {
            "center": {
                "label": "Dollars ($)"
            }
        },
        "width": "30vw",
        "height": "30vw",
    };
    const platProfitOptions = {
        "title": "Profits By Sale Platform",
        "resizable": false,
        "donut": {
            "center": {
                "label": "Dollars ($)"
            }
        },
        "width": "30vw",
        "height": "30vw",
    };


    const srcPurchaseOptions = {
        "title": "Purchase Price By Item Source",
        "resizable": false,
        "donut": {
            "center": {
                "label": "Dollars ($)"
            }
        },
        "width": "30vw",
        "height": "30vw",
    };
    const platPurchaseOptions = {
        "title": "Purchase Price By Sale Platform",
        "resizable": false,
        "donut": {
            "center": {
                "label": "Dollars ($)"
            }
        },
        "width": "30vw",
        "height": "30vw",
    };


    const srcSaleOptions = {
        "title": "Sale Price By Item Source",
        "resizable": false,
        "donut": {
            "center": {
                "label": "Dollars ($)"
            }
        },
        "width": "30vw",
        "height": "30vw",
    };
    const platSaleOptions = {
        "title": "Sale Price By Sale Platform",
        "resizable": false,
        "donut": {
            "center": {
                "label": "Dollars ($)"
            }
        },
        "width": "30vw",
        "height": "30vw",
    };


    const srcCommisOptions = {
        "title": "Commission By Item Source",
        "resizable": false,
        "donut": {
            "center": {
                "label": "Dollars ($)"
            }
        },
        "width": "30vw",
        "height": "30vw",
    };
    const platCOmmisOptions = {
        "title": "Commission By Sale Platform",
        "resizable": false,
        "donut": {
            "center": {
                "label": "Dollars ($)"
            }
        },
        "width": "30vw",
        "height": "30vw",
    };

    const lineOptions = {
        "title": "Profits Over Time",
        "axes": {
            "bottom": {
                "title": "Total Profits Over Time",
                "mapsTo": "date",
                "scaleType": "time"
            },
            "left": {
                "mapsTo": "value",
                "title": "Dollars ($)",
                "scaleType": "linear"
            }
        },
        "curve": "curveMonotoneX",
        "width": "30vw",
        "height": "30vw",
    };

    const [srcProfits, setSrcProfits] = useState([]);
    const [platProfits, setPlatProfits] = useState([]);

    const [srcPurchase, setSrcPurchase] = useState([]);
    const [platPurchase, setPlatPurchase] = useState([]);

    const [srcSale, setSrcSale] = useState([]);
    const [platSale, setPlatSale] = useState([]);

    const [srcCommis, setSrcCommis] = useState([]);
    const [platCommis, setPlatCommis] = useState([]);

    const [profDates, setProfDates] = useState([]);



    function getNumber(s) {
        s = s.replace('$', '');
        s = parseFloat(s);
        if (s >= 0) {
            return s;
        } else {
            return 0;
        }
    }


    useEffect(() => {
        if (srcProfits.length < 1) {
            fetch('https://poshapi.cichosz.dev/api/profits').then(response => response.json()).then(data => {
                let sMap = new Map();
                let pMap = new Map();

                for (let i in data) {
                    let curr = data[i];
                    let prof = curr.profit;
                    prof = prof.replace('$', '');
                    prof = parseFloat(prof);

                    if (!(parseFloat(prof) >= 0)) continue;

                    if (sMap.get(curr.SrcName)) {
                        let v = sMap.get(curr.SrcName);
                        v = prof + v;
                        sMap.set(curr.SrcName, v);
                    } else {
                        sMap.set(curr.SrcName, prof);
                    }

                    if (pMap.get(curr.PlatName)) {
                        let v = pMap.get(curr.PlatName);
                        v += parseFloat(prof);
                        pMap.set(curr.PlatName, v);
                    } else {
                        pMap.set(curr.PlatName, parseFloat(prof));
                    }
                }

                let sourceData = [];
                for (let entry of sMap.entries()) {
                    let key = entry[0], value = entry[1];
                    let ob = {
                        "group": key,
                        "value": value
                    };
                    sourceData.push(ob);
                }
                let platData = [];
                for (let entry of pMap.entries()) {
                    let key = entry[0], value = entry[1];
                    let ob = {
                        "group": key,
                        "value": value
                    };
                    platData.push(ob);
                }

                setSrcProfits(sourceData);
                setPlatProfits(platData);
            });

            fetch('https://poshapi.cichosz.dev/api/purchasePrice').then(response => response.json()).then(data => {
                let sMap = new Map();
                let pMap = new Map();

                for (let i in data) {
                    let curr = data[i];
                    let prof = curr.purchase_price;
                    prof = prof.replace('$', '');
                    prof = parseFloat(prof);

                    if (!(parseFloat(prof) >= 0)) continue;

                    if (sMap.get(curr.SrcName)) {
                        let v = sMap.get(curr.SrcName);
                        v = prof + v;
                        sMap.set(curr.SrcName, v);
                    } else {
                        sMap.set(curr.SrcName, prof);
                    }

                    if (pMap.get(curr.PlatName)) {
                        let v = pMap.get(curr.PlatName);
                        v += parseFloat(prof);
                        pMap.set(curr.PlatName, v);
                    } else {
                        pMap.set(curr.PlatName, parseFloat(prof));
                    }
                }

                let sourceData = [];
                for (let entry of sMap.entries()) {
                    let key = entry[0], value = entry[1];
                    let ob = {
                        "group": key,
                        "value": value
                    };
                    sourceData.push(ob);
                }
                let platData = [];
                for (let entry of pMap.entries()) {
                    let key = entry[0], value = entry[1];
                    let ob = {
                        "group": key,
                        "value": value
                    };
                    platData.push(ob);
                }

                setSrcPurchase(sourceData);
                setPlatPurchase(platData);
            });

            fetch('https://poshapi.cichosz.dev/api/salePrice').then(response => response.json()).then(data => {
                let sMap = new Map();
                let pMap = new Map();

                for (let i in data) {
                    let curr = data[i];
                    let prof = curr.sales_price;
                    prof = prof.replace('$', '');
                    prof = parseFloat(prof);

                    if (!(parseFloat(prof) >= 0)) continue;

                    if (sMap.get(curr.SrcName)) {
                        let v = sMap.get(curr.SrcName);
                        v = prof + v;
                        sMap.set(curr.SrcName, v);
                    } else {
                        sMap.set(curr.SrcName, prof);
                    }

                    if (pMap.get(curr.PlatName)) {
                        let v = pMap.get(curr.PlatName);
                        v += parseFloat(prof);
                        pMap.set(curr.PlatName, v);
                    } else {
                        pMap.set(curr.PlatName, parseFloat(prof));
                    }
                }

                let sourceData = [];
                for (let entry of sMap.entries()) {
                    let key = entry[0], value = entry[1];
                    let ob = {
                        "group": key,
                        "value": value
                    };
                    sourceData.push(ob);
                }
                let platData = [];
                for (let entry of pMap.entries()) {
                    let key = entry[0], value = entry[1];
                    let ob = {
                        "group": key,
                        "value": value
                    };
                    platData.push(ob);
                }

                setSrcSale(sourceData);
                setPlatSale(platData);
            });

            fetch('https://poshapi.cichosz.dev/api/commissions').then(response => response.json()).then(data => {
                let sMap = new Map();
                let pMap = new Map();

                for (let i in data) {
                    let curr = data[i];
                    let prof = curr.commission;
                    prof = prof.replace('$', '');
                    prof = parseFloat(prof);

                    if (!(parseFloat(prof) >= 0)) continue;

                    if (sMap.get(curr.SrcName)) {
                        let v = sMap.get(curr.SrcName);
                        v = prof + v;
                        sMap.set(curr.SrcName, v);
                    } else {
                        sMap.set(curr.SrcName, prof);
                    }

                    if (pMap.get(curr.PlatName)) {
                        let v = pMap.get(curr.PlatName);
                        v += parseFloat(prof);
                        pMap.set(curr.PlatName, v);
                    } else {
                        pMap.set(curr.PlatName, parseFloat(prof));
                    }
                }

                let sourceData = [];
                for (let entry of sMap.entries()) {
                    let key = entry[0], value = entry[1];
                    let ob = {
                        "group": key,
                        "value": value
                    };
                    sourceData.push(ob);
                }
                let platData = [];
                for (let entry of pMap.entries()) {
                    let key = entry[0], value = entry[1];
                    let ob = {
                        "group": key,
                        "value": value
                    };
                    platData.push(ob);
                }

                setSrcCommis(sourceData);
                setPlatCommis(platData);
            });

            fetch('https://poshapi.cichosz.dev/api/profitDates').then(response => response.json()).then(data => {
                //console.log(data);
                let dateMap = new Map();
                let totalProf = 0.0;

                for (let i in data) {
                    let curr = data[i];
                    let profV = getNumber(curr.profit);
                    let date = new Date(curr.sale_dt);
                    totalProf += profV;

                    dateMap.set(date.toISOString(), totalProf);
                }

                let lineData = [];
                for (let entry of dateMap.entries()) {
                    let key = entry[0], value = entry[1];
                    let ob = {
                        "group": "Profits",
                        "date": key,
                        "value": value,
                    };
                    lineData.push(ob);
                }
                setProfDates(lineData);
            });



        }


    }, []);

    return (
        <>
            <div style={{ height: 'auto', background: '#262626', marginTop: '1rem', marginLeft: '1rem', marginRight: '1rem', display: 'flex', flexDirection: 'column', paddingLeft: '1rem', paddingRight: '1rem' }}>

                <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '33%', padding: '1rem', borderStyle: 'none solid solid none', borderWidth: '1px', borderColor: 'gray' }}>
                        <DonutChart
                            data={srcProfits}
                            options={srcProfitOptions}>
                        </DonutChart>

                    </div>
                    <div style={{ width: '33%', padding: '1rem', borderStyle: 'none none solid none', borderWidth: '1px', borderColor: 'gray' }}>
                        <DonutChart
                            data={platProfits}
                            options={platProfitOptions}>
                        </DonutChart>
                    </div>
                    <div style={{ width: '33%', padding: '1rem', borderStyle: 'none none solid solid', borderWidth: '1px', borderColor: 'gray' }}>
                        <DonutChart
                            data={srcPurchase}
                            options={srcPurchaseOptions}>
                        </DonutChart>
                    </div>
                </div>



                <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>

                    <div style={{ width: '33%', padding: '1rem', borderStyle: 'none solid solid none', borderWidth: '1px', borderColor: 'gray' }}>
                        <DonutChart
                            data={platPurchase}
                            options={platPurchaseOptions}>
                        </DonutChart>
                    </div>
                    <div style={{ width: '33%', padding: '1rem', borderStyle: 'none none solid none', borderWidth: '1px', borderColor: 'gray' }}>
                        <DonutChart
                            data={srcSale}
                            options={srcSaleOptions}>
                        </DonutChart>
                    </div>
                    <div style={{ width: '33%', padding: '1rem', borderStyle: 'none none solid solid', borderWidth: '1px', borderColor: 'gray' }}>
                        <DonutChart
                            data={platSale}
                            options={platSaleOptions}>
                        </DonutChart>
                    </div>
                </div>






                <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '33%', padding: '1rem', borderStyle: 'none solid none none', borderWidth: '1px', borderColor: 'gray' }}>
                        <DonutChart
                            data={srcCommis}
                            options={srcCommisOptions}>
                        </DonutChart>

                    </div>
                    <div style={{ width: '33%', padding: '1rem', borderStyle: 'none none none none', borderWidth: '1px', borderColor: 'gray' }}>
                        <DonutChart
                            data={platCommis}
                            options={platCOmmisOptions}>
                        </DonutChart>
                    </div>
                    <div style={{ width: '33%', padding: '1rem', borderStyle: 'none none none solid', borderWidth: '1px', borderColor: 'gray' }}>
                        <LineChart
                            data={profDates}
                            options={lineOptions}>
                        </LineChart>
                    </div>
                </div>


            </div>
        </>
    )
}

export default StatsView;