import {
    DataTable, DataTableSkeleton, Tile, PaginationSkeleton,
    Pagination, Table, TableHead, TableHeader, TableBody, TableRow, TableCell,
    TableContainer, TableToolbar, TableToolbarContent, TableToolbarSearch, Button,
    TableToolbarMenu, TableToolbarAction, TableSelectRow, TableSelectAll, Modal
} from 'carbon-components-react';

import HeaderBar from './Header';
import EditItem from './EditItem';
import AddItem from './AddItem';
import StatsView from './StatsView';
import AddLocation from './AddLocation';
import AddBundle from './AddBundle';

import { useEffect, useState } from 'react';

function TableComp(props) {

    const [displayData, setDisplayData] = useState([]);
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [addItem, setAdd] = useState(false);
    const [editItems, setEdit] = useState(false);
    const [sources, setSources] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [bundle, setBundle] = useState(false);
    const [location, setLocation] = useState(false);

    let action = (p) => {
        console.log(p);
    }

    let clickAdd = () => {
        setAdd(true);
    }

    let clickEdit = () => {
        setEdit(true);
    }

    const headers = [
        { key: 'id', header: 'ID', },
        { key: 'description', header: 'Description', },
        { key: 'sales_price', header: 'Net', },
        { key: 'profit', header: 'Profit', },
        { key: 'purchase_price', header: 'Price', },
        { key: 'commission', header: 'Commission', },
        { key: 'shipping', header: 'Shipping Cost', },
        { key: 'p_date', header: 'Purchase Date', },
        { key: 's_date', header: 'Sell Date', },
        { key: 'source_nm', header: 'Source', },
        { key: 'platform_nm', header: 'Platform', },
        { key: 'remarks', header: 'Remarks', },
    ];

    let onInputChange = (e) => {
        if (e === null || e === '') {
            setDisplayData(rows);
        } else {
            let dat = [];
            for (let item in rows) {
                let curr = rows[item];

                let combined = curr.id + curr.description + curr.p_date + ' ' + 
                                curr.source_nm + curr.purchase + curr.s_date + curr.commission + curr.shipping + 
                                curr.sales_price + curr.profit + curr.platform_nm + curr.remarks;

                combined = combined.toLowerCase();

                if (combined.includes(e.toLowerCase())) {
                    dat.push(curr);
                }
            }
            setDisplayData(dat);
        }
    }

    let pageSizes = [
        5, 10, 15
    ];

    let startRow = 0;
    let endRow = 10;

    let onPageChange = (e) => {
        setPage(e.page);
        setPageSize(e.pageSize);
    }

    const transformSelectedRows = (rows, ar) => {
        let z = rows.map((r) => {
            let x = r.cells.map((c) => {
                return { [c.info.header]: c.value };
            });
            return x.reduce((x, y) => Object.assign(x, y));
        });
        return z;
    }

    let parseDate = (d) => {
        if (d === null || d === undefined || d === '') {
            return 'N/A';
        } else {
            let dt = new Date(d);
            return dt.toDateString();
        }
    }

    let updateData = () => {
        fetch('https://poshapi.cichosz.dev/api/items').then(response => response.json()).then(data => {
            for (let i in data) {
                let curr = data[i];
                curr.s_date = parseDate(curr.sale_dt)
                curr.p_date = parseDate(curr.purchase_dt);
                for (let j in platforms) {
                    let pc = platforms[j];
                    if (pc.id === curr.platform_id) {
                        curr.platform_nm = pc.name;
                        break;
                    }
                }

                for (let k in sources) {
                    let sc = sources[k];
                    if (sc.id === curr.source_id) {
                        curr.source_nm = sc.name;
                        break;
                    }
                }
            }
            setRows(data);
        });
    }

    let clickLocation = () => {
        setLocation(true);
    }

    let clickBundle = () => {
        setBundle(true);
    }

    let loadLocations = () => {
        fetch('https://poshapi.cichosz.dev/api/sources').then(response => response.json()).then(data => {
            setSources(data);
        });

        fetch('https://poshapi.cichosz.dev/api/platforms').then(response => response.json()).then(data => {
            setPlatforms(data);
        });
    }

    useEffect(() => {
        if (sources.length < 1) {
            fetch('https://poshapi.cichosz.dev/api/sources').then(response => response.json()).then(data => {
                setSources(data);
            });
        }

        if (platforms.length < 1) {
            fetch('https://poshapi.cichosz.dev/api/platforms').then(response => response.json()).then(data => {
                setPlatforms(data);
            });
        }

        if (rows.length < 1 && sources.length > 0 && platforms.length > 0) {
            updateData();
        }

        setDisplayData(rows);
    }, [rows, platforms, sources]);

    return (
        <>
            <HeaderBar clickAdd={clickAdd} clickEdit={clickEdit} clickLocation={clickLocation} clickBundle={clickBundle} />



            <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>


                <div style={{ marginTop: '5rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
                    {rows.length > 0 && (<DataTable
                        headers={headers}
                        rows={displayData}
                        onInputChange={onInputChange}
                        isSortable
                    >
                        {({
                            headers,
                            rows,
                            getSelectionProps,
                            getRowProps,
                            getHeaderProps,
                            selectedRows,
                            getTableContainerProps,
                        }) => (
                            <div>
                                {editItems && (
                                    <EditItem editItems={editItems} setEdit={setEdit} sources={sources} platforms={platforms} selected={transformSelectedRows(selectedRows, rows)} updateData={updateData} />
                                )}

                                {addItem && (
                                    <AddItem addItem={addItem} setAdd={setAdd} sources={sources} platforms={platforms} updateData={updateData} />
                                )}

                                {location && (
                                    <AddLocation location={location} setLocation={setLocation} loadLocations={loadLocations}/>
                                )}

                                {bundle && (
                                    <AddBundle platforms={platforms} bundle={bundle} setBundle={setBundle} updateData={updateData} selected={transformSelectedRows(selectedRows, rows)}/>
                                )}

                                <TableContainer {...getTableContainerProps()}>
                                    <TableToolbar aria-label="data table toolbar">
                                        <TableToolbarContent>
                                            <TableToolbarSearch
                                                onChange={(evt) => onInputChange(evt.target.value)}
                                                onClear={() => onInputChange("")}
                                            />
                                        </TableToolbarContent>
                                    </TableToolbar>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableSelectAll
                                                    {...getSelectionProps()}
                                                    onSelect={(evt) => {
                                                        getSelectionProps().onSelect(evt);

                                                    }}
                                                />
                                                {headers.map((header) => (
                                                    <TableHeader
                                                        key={header.key}
                                                        {...getHeaderProps({ header })}
                                                    >
                                                        {header.header}
                                                    </TableHeader>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.slice((page - 1) * pageSize, page * pageSize).map((row, i) => (
                                                <TableRow key={i} {...getRowProps({ row })}>
                                                    <TableSelectRow
                                                        key={i}
                                                        {...getSelectionProps({ row })}
                                                        onSelect={(evt) => {
                                                            getSelectionProps({ row }).onSelect(evt);
                                                            //console.log(evt);
                                                        }}
                                                    />
                                                    {row.cells.map((cell) => (
                                                        <TableCell key={cell.id}>{cell.value}</TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <Pagination
                                        pageSizes={pageSizes}
                                        pageSize={pageSize}
                                        totalItems={displayData.length}
                                        onChange={(data) => onPageChange(data)}
                                    />
                                </TableContainer>
                            </div>
                        )}
                    </DataTable>)}

                    {rows.length < 1 && (
                        <>
                            <DataTableSkeleton />
                            <PaginationSkeleton />
                        </>
                    )}
                </div>

                <StatsView />

            </div>




        </>
    )
}

export default TableComp;