import { getAllByPlaceholderText } from '@testing-library/react';
import {
    Modal, ModalBody, FormLabel, TextInput, DatePicker, DatePickerInput, Select, SelectItem
} from 'carbon-components-react';
import { NULL } from 'mysql/lib/protocol/constants/types';
import { useEffect, useState } from 'react';
function EditItem(props) {
    const { setEdit, editItems, selected, platforms, sources, updateData } = props;
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState(null);
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
        if (e === '' || e === null) return 'NULL';

        let dt = new Date(e); // getDate = day,
        let dy = dt.getDate();
        let mn = dt.getMonth() + 1;
        let yr = dt.getUTCFullYear().toString();
        let fixYr = yr.charAt(yr.length - 2) + yr.charAt(yr.length - 1)
        let formatDate = mn + '-' + dy + '-' + fixYr;
        return formatDate;
    }

    const getDate = () => {
        if (item.p_date === 'N/A') {
            return null;
        }
        let dt = new Date(item.p_date);
        return dt.toUTCString();
    }

    const getSaleDate = () => {
        if (item.s_date === 'N/A') {
            return null;
        }
        let dt = new Date(item.s_date);
        return dt.toUTCString();
    }

    const idFromName = (nm, list) => {
        for(let i in list){
            let curr = list[i];
            if(curr.name === nm){
                return curr.id;
            }
        }
        return 'NULL';
    }

    let handleSubmit = () => {
        let pd = formDt(pDate);
        let sd = formDt(sDate);

        fetch('https://poshapi.cichosz.dev/api/updateItem', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'body': JSON.stringify({
                    id: item.id,
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
            setEdit(false);
        });;

    }

    useEffect(() => {
        if (!selected || (selected && selected.length <= 0)) {
            setEdit(false);
        } else if(item === null){
            setOpen(true);
            setItem(selected[0]);
            let it = selected[0];

            if(it.source_nm !== undefined){
                srcChange(idFromName(it.source_nm, sources));
            }
            if(it.platform_nm !== undefined){
                platChange(idFromName(it.platform_nm, platforms));
            }

            if (it.s_date === 'N/A') {
                setSDate(null);
            }else{
                let dt = new Date(it.s_date);
                setSDate(dt.toUTCString());
            }

            if (it.p_date === 'N/A') {
                setSDate(null);
            }else{
                let dt = new Date(it.p_date);
                setPDate(dt.toUTCString());
            }

            setDesc(it.description);
            setProfit(it.profit);
            setCommis(it.commission);
            setPurch(it.purchase_price);
            setRemarks(it.remarks);
            setSale(it.sales_price);
            setShipping(it.shipping);
        }
    });

    return (
        <>
            {item !== null && (
                <Modal
                    modalHeading="Edit The Selected Item"
                    modalLabel="Edit Item"
                    primaryButtonText="Confirm"
                    secondaryButtonText="Cancel"
                    open={open}
                    onRequestClose={() => setEdit(false)}
                    onRequestSubmit={() => handleSubmit()}
                >
                    <ModalBody style={{ gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ width: '33%' }}>
                                <TextInput labelText={"ID"} id={item.id.toString()} readOnly defaultValue={item.id} />
                            </div>
                            <div style={{ width: '33%' }}>
                                {/* <TextInput labelText={"Source"} id={item.id.toString()} readOnly defaultValue={item.source_nm} /> */}
                                {item.source_nm === undefined ? (

                                    <Select id="source-select" labelText="Source" defaultValue={"NULL"} onChange={(e) => srcChange(e.target.value)}>
                                        <SelectItem value={"NULL"} text={"N/A"} />
                                        {sources.map(s => (
                                            <SelectItem value={s.id} text={s.name} />
                                        ))}
                                    </Select>
                                ) : (
                                    <TextInput labelText={"Source"} readOnly id={item.id.toString()} defaultValue={item.source_nm} />
                                )}
                            </div>
                            <div style={{ width: '33%' }}>
                                {item.platform_nm === undefined ? (
                                    <Select id="platform-select" labelText="Sale Platform" defaultValue={"NULL"} onChange={(e) => platChange(e.target.value)}>
                                        <SelectItem value={"NULL"} text={"N/A"} />
                                        {platforms.map(p => (
                                            <SelectItem value={p.id} text={p.name} />
                                        ))}
                                    </Select>
                                ) : (
                                    <TextInput labelText={"Sale Platform"} readOnly id={item.id.toString()} defaultValue={item.platform_nm} />
                                )}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>

                            <TextInput labelText="Description" id={item.id.toString()} defaultValue={item.description}  onChange={(e) => textChange(e.target.value, setDesc)}/>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <div style={{ width: '33%' }}>
                                <TextInput labelText="Net Sale" id={item.id.toString()} defaultValue={item.sales_price} onChange={(e) => textChange(e.target.value, setSale)}/>
                            </div>
                            <div style={{ width: '33%' }}>
                                <TextInput labelText="Commission" defaultValue={item.commission} onChange={(e) => textChange(e.target.value, setCommis)}/>
                            </div>
                            <div style={{ width: '33%' }}>
                                <TextInput labelText="Purchase Price" id={item.id.toString()} defaultValue={item.purchase_price} onChange={(e) => textChange(e.target.value, setPurch)}/>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <div style={{ width: '50%' }}>

                                <TextInput labelText="Shipping" id={item.id.toString()} defaultValue={item.shipping} onChange={(e) => textChange(e.target.value, setShipping)}/>
                            </div>
                            <div style={{ width: '50%' }}>
                                <TextInput labelText="Profit" id={item.id.toString()} defaultValue={item.profit} onChange={(e) => textChange(e.target.value, setProfit)}/>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
                            <TextInput labelText="Remarks" id={item.id.toString()} defaultValue={item.remarks} onChange={(e) => textChange(e.target.value, setRemarks)}/>
                        </div>

                        <div style={{ alignItems: 'center', marginTop: '1rem' }}>
                            <DatePicker datePickerType="single" onChange={(e) => setPDate(e[0])}>
                                <DatePickerInput
                                    placeholder="mm/dd/yyyy"
                                    labelText="Purchase Date"
                                    id="date-picker-purchase"
                                    defaultValue={getDate()}
                                />
                            </DatePicker>

                            <DatePicker datePickerType="single" style={{ marginTop: '1rem' }} onChange={(e) => setSDate(e[0])}>
                                <DatePickerInput
                                    placeholder="mm/dd/yyyy"
                                    labelText="Sale Date"
                                    id="date-picker-sale"

                                    defaultValue={getSaleDate()}
                                />
                            </DatePicker>
                        </div>


                    </ModalBody>

                </Modal>
            )}
        </>
    )
}

export default EditItem;