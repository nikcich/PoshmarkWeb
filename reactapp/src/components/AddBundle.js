import {
    Modal, ModalBody, FormLabel, TextInput, DatePicker, DatePickerInput, Select, SelectItem
} from 'carbon-components-react';

import { useEffect, useState } from 'react';

function AddBundle(props) {
    const { setBundle, bundle, updateData, selected, platforms } = props;

    const [platform, setPlatform] = useState("NULL");
    const [salePrice, setSale] = useState('');
    const [commis, setCommis] = useState('');
    const [shipping, setShipping] = useState('');
    const [profit, setProfit] = useState('');
    const [remarks, setRemarks] = useState('');
    const [sDate, setSDate] = useState('');

    let platChange = (e) => {
        setPlatform(e);
    }

    let textChange = (e, func) => {
        func(e);
    }

    let formDt = (e) => {
        if (e === '') return 'NULL';

        let dt = new Date(e); // getDate = day,
        let dy = dt.getDate();
        let mn = dt.getMonth() + 1;
        let yr = dt.getUTCFullYear().toString();
        let fixYr = yr.charAt(yr.length - 2) + yr.charAt(yr.length - 1)
        let formatDate = mn + '-' + dy + '-' + fixYr;
        return formatDate;
    }


    let handleSubmit = () => {
        let sd = formDt(sDate);

        fetch('https://poshapi.cichosz.dev/api/bundleItems', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'body': JSON.stringify({ 
                    datesold: sd,
                    netsale: salePrice,
                    commission: commis,
                    ship: shipping,
                    remark: remarks,
                    plat: platform,
                    prof: profit,
                    items: selected
                })
            },
        }).then(res => res).then(data => {
            updateData();
            setBundle(false)
        });
    }

    useEffect(() => {
        console.log(selected);
        if (selected.length < 2) {
            setBundle(false);
        }
    }, []);

    return (
        <>
            <Modal
                modalHeading="Bundle Items"
                modalLabel="Bundle Selected Items"
                primaryButtonText="Add"
                secondaryButtonText="Cancel"
                open={bundle && selected.length > 1}
                onRequestClose={() => setBundle(false)}
                onRequestSubmit={() => handleSubmit()}
            >
                <ModalBody style={{ gap: '1rem' }}>


                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ width: '100%' }}>
                            <Select id="platform-select" labelText="Sale Platform" defaultValue={"NULL"} onChange={(e) => platChange(e.target.value)}>
                                <SelectItem value={"NULL"} text={"N/A"} />
                                {platforms.map(p => (
                                    <SelectItem key={p.id} value={p.id} text={p.name} />
                                ))}
                            </Select>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <div style={{ width: '50%' }}>
                            <TextInput labelText="Net Sale" onChange={(e) => textChange(e.target.value, setSale)} />
                        </div>
                        <div style={{ width: '50%' }}>
                            <TextInput labelText="Commission" onChange={(e) => textChange(e.target.value, setCommis)} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <div style={{ width: '50%' }}>

                            <TextInput labelText="Shipping" onChange={(e) => textChange(e.target.value, setShipping)} />
                        </div>
                        <div style={{ width: '50%' }}>
                            <TextInput labelText="Profit" onChange={(e) => textChange(e.target.value, setProfit)} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
                        <TextInput labelText="Remarks (e.g. Bundled X, Y, and Z)" onChange={(e) => textChange(e.target.value, setRemarks)} />
                    </div>

                    <div style={{ alignItems: 'center', marginTop: '1rem' }}>
                        <DatePicker datePickerType="single" style={{ marginTop: '1rem' }} onChange={(e) => setSDate(e[0])}>
                            <DatePickerInput
                                placeholder="mm/dd/yyyy"
                                labelText="Sale Date"
                                id="date-picker-sale"
                            />
                        </DatePicker>
                    </div>

                </ModalBody>
            </Modal>
        </>
    )
}

export default AddBundle;