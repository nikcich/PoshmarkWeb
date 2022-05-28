import {
    Modal, ModalBody, FormLabel, TextInput, DatePicker, DatePickerInput, Select, SelectItem
} from 'carbon-components-react';

import { useEffect, useState } from 'react';

function AddLocation(props) {
    const { setLocation, location, loadLocations } = props;

    const [type, setType] = useState(1);
    const [name, setName] = useState('');

    

    let handleSubmit = () => {

        if (name !== '') {
            fetch('https://poshapi.cichosz.dev/api/addLocation', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'body': JSON.stringify({
                        name: name,
                        type: type,
                    })
                },
            }).then(res => res).then(data => {
                loadLocations();
                setLocation(false);
            });
        }else{

        }


    }

    useEffect(() => {

    }, []);

    return (
        <>
            <Modal
                modalHeading="Add New Location / Platform"
                modalLabel="Add Location / Platform"
                primaryButtonText="Add"
                secondaryButtonText="Cancel"
                open={location}
                onRequestClose={() => setLocation(false)}
                onRequestSubmit={() => handleSubmit()}
            >
                <ModalBody style={{ gap: '1rem' }}>


                    <Select id="platform-select" labelText="Location Type" defaultValue={"1"} onChange={(e) => setType(e.target.value)}>
                        <SelectItem value={"1"} text={"Item Source"} />
                        <SelectItem value={"2"} text={"Sale Platform"} />
                    </Select>

                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
                        <TextInput labelText="Location Name" onChange={(e) => setName(e.target.value)} />
                    </div>

                </ModalBody>
            </Modal>
        </>
    )
}

export default AddLocation;