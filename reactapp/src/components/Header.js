import { HeaderContainer, Header, HeaderMenuItem, HeaderNavigation, HeaderGlobalBar, Button, ToastNotification } from 'carbon-components-react';

import im from './MKLogo.png'

function HeaderBar(props) {
    const {clickAdd, clickEdit, clickLocation, clickBundle} = props;
    return (
        <HeaderContainer
            render={({ }) => (
                <>
                    <Header aria-label="IBM Platform Name" style={{ height: '4rem' }}>

                        <h2 style={{ marginLeft: '1rem' }}>Item Management</h2>


                        <HeaderGlobalBar>
                            <Button style={{ margin: '0.5rem' }} onClick={() => clickAdd()}>
                                Add Item
                            </Button>
                            <Button style={{ margin: '0.5rem' }} onClick={() => clickEdit()}>
                                Edit Selected
                            </Button>
                            <Button style={{ margin: '0.5rem' }} onClick={() => clickLocation()}>
                                Add Location
                            </Button>
                            <Button style={{ margin: '0.5rem' }} onClick={() => clickBundle()}>
                                Bundle Selected
                            </Button>
                            <Button style={{ margin: '0.5rem' }}>
                                Export
                            </Button>

                        </HeaderGlobalBar>
                    </Header>

                </>
            )}
        />
    )
}

export default HeaderBar;