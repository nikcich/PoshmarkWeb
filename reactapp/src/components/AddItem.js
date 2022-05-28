
import {
    Modal, ModalBody, FormLabel, TextInput, DatePicker, DatePickerInput, Select, SelectItem
} from 'carbon-components-react';
import { useEffect, useState } from 'react';
function AddItem(props) {
    const { setAdd, addItem, platforms, sources, updateData } = props;

    const [platform, setPlatform] = useState("NULL");
    const [source, setSource] = useState("NULL");
    const [desc, setDesc] = useState('');
    const [salePrice, setSale] = useState('');
    const [commis, setCommis] = useState('');
    const [purPrice, setPurch] = useState('');
    const [shipping, setShipping] = useState('');
    const [profit, setProfit] = useState('');
    const [remarks, setRemarks] = useState('');
    const [pDate, setPDate] = useState('');
    const [sDate, setSDate] = useState('');

    let srcChange = (e) => {
        setSource(e);
    }

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
        let pd = formDt(pDate);
        let sd = formDt(sDate);

        fetch('https://poshapi.cichosz.dev/api/addItem', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'body': JSON.stringify({ 
                    description: desc,
                    date: pd,
                    datesold: sd,
                    purchase: purPrice,
                    src: source,
                    netsale: salePrice,
                    commission: commis,
                    ship: shipping,
                    remark: remarks,
                    plat: platform,
                    prof: profit
                })
            },
        }).then(res => res).then(data => {
            updateData();
            setAdd(false)
        });

    }

    useEffect(() => {

    }, []);

    return (
        <>
            <Modal
                modalHeading="Add New Item"
                modalLabel="Add Item"
                primaryButtonText="Add"
                secondaryButtonText="Cancel"
                open={addItem}
                onRequestClose={() => setAdd(false)}
                onRequestSubmit={() => handleSubmit()}
            >
                <ModalBody style={{ gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ width: '50%' }}>
                            <Select id="source-select" labelText="Source" defaultValue={"NULL"} onChange={(e) => srcChange(e.target.value)}>
                                <SelectItem value={"NULL"} text={"N/A"} />
                                {sources.map(s => (
                                    <SelectItem key={s.id} value={s.id} text={s.name} />
                                ))}
                            </Select>
                        </div>
                        <div style={{ width: '50%' }}>
                            <Select id="platform-select" labelText="Sale Platform" defaultValue={"NULL"} onChange={(e) => platChange(e.target.value)}>
                            <SelectItem value={"NULL"} text={"N/A"} />
                                {platforms.map(p => (
                                    <SelectItem key={p.id} value={p.id} text={p.name} />
                                ))}
                            </Select>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
                        <TextInput labelText="Description" onChange={(e) => textChange(e.target.value, setDesc)} />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <div style={{ width: '33%' }}>
                            <TextInput labelText="Net Sale" onChange={(e) => textChange(e.target.value, setSale)} />
                        </div>
                        <div style={{ width: '33%' }}>
                            <TextInput labelText="Commission" onChange={(e) => textChange(e.target.value, setCommis)} />
                        </div>
                        <div style={{ width: '33%' }}>
                            <TextInput labelText="Purchase Price" onChange={(e) => textChange(e.target.value, setPurch)} />
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
                        <TextInput labelText="Remarks" onChange={(e) => textChange(e.target.value, setRemarks)} />
                    </div>

                    <div style={{ alignItems: 'center', marginTop: '1rem' }}>
                        <DatePicker datePickerType="single" onChange={(e) => setPDate(e[0])}>
                            <DatePickerInput
                                placeholder="mm/dd/yyyy"
                                labelText="Purchase Date"
                                id="date-picker-purchase"
                            />
                        </DatePicker>

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

export default AddItem;