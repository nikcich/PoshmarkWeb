import { HeaderContainer, Header, HeaderMenuItem, HeaderNavigation, HeaderGlobalBar, Button, ToastNotification } from 'carbon-components-react';

import im from './MKLogo.png'

function HeaderBar(props) {

    const { page, setPage } = props;

    const buttonClick = (name) => {
        console.log("Hello");
    }

    const navClick = (pg) => {
        console.log(pg);
        setPage(pg);
    }

    return (
        <HeaderContainer
            render={({ }) => (
                <>
                    <Header aria-label="IBM Platform Name" style={{ height: '4rem' }}>

                        <img src={im} alt="" style={{ width: '9rem', marginLeft: '1rem' }}></img>

                        <HeaderNavigation aria-label="MediaKind">
                            <HeaderMenuItem href="#" isCurrentPage={page==='/Plan'} onClick={() => navClick('/Plan')}>Plan View</HeaderMenuItem>
                            <HeaderMenuItem href="#" isCurrentPage={page==='/Data'} onClick={() => navClick('/Data')}>Data View</HeaderMenuItem>
                        </HeaderNavigation>
                        <HeaderGlobalBar>
                            <Button style={{ margin: '0.5rem' }}
                                onClick={() => buttonClick("Import button")}
                            >
                                Import
                            </Button>

                            <Button style={{ margin: '0.5rem' }}>
                                Export
                            </Button>

                            <Button style={{ margin: '0.5rem' }}>
                                Edit Mode
                            </Button>

                        </HeaderGlobalBar>
                    </Header>

                </>
            )}
        />
    )
}

export default HeaderBar;