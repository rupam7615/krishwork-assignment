import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// ---------------- ICONS------------------------
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import SpeedIcon from '@mui/icons-material/Speed';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
//-----------------Accordions for SideBar -----------------------
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
//-----------Dash board import----------------
import Dashboard  from './tabs/Dashboard';
import teethLogo from '../images/teethlogo.jpg';
import Doctor from '../images/doctor.jpg';

import PersonIcon from '@mui/icons-material/Person';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import EmptyTab from './tabs/EmptyTab';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = React.useState(true);
  const [openDoctorInfo, setOpenDoctorInfo] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState('patientList');

  const handleDrawerClick = () => {
    setOpenDrawer(value=>!value);
  };

  const tabs = {
    "overview": <EmptyTab tabName="Overview" />,
    "calendar": <EmptyTab tabName="Calendar" />,
    "patientList": <Dashboard />,
    "messages": <EmptyTab tabName="Messages" />,
    "paymentInformation": <EmptyTab tabName="Payment Information" />,
    "settings": <EmptyTab tabName="Settings" />,
    "help": <EmptyTab tabName="Help" />,
  }

  const [doctorInfo,setDoctorInfo] = React.useState({})

  React.useEffect(() => {
    if(!openDrawer) setOpenDoctorInfo(false);
    fetch('https://619f39821ac52a0017ba467e.mockapi.io/DoctorDetails').then(res=>res.json()).then(data=>{
      setDoctorInfo(prev=>data[0])
    })
  }, [openDrawer])

  React.useEffect(() => {
    if(openDoctorInfo) setOpenDrawer(true);
  }, [openDoctorInfo])
 

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={openDrawer}>
        <DrawerHeader>
          <Avatar 
            sx={{ width: 56, height: 56 }}
            src={teethLogo}
          />
          <div>
          <Typography>Zendenta</Typography>
          <Typography varient="caption" display="block" gutterBottom>Dat Tod Dunga Bro</Typography>
          </div>
          <IconButton onClick={handleDrawerClick}>
            {openDrawer?<MenuOpenRoundedIcon />:
            <Avatar 
            // sx={{ width: 40, height: 40 }}
            src={teethLogo}
          
            />}
          </IconButton>
        </DrawerHeader>
        
        <List
          sx={{
            height:'100%'
          }}
        >
          <ListItemButton
              key={'Overview'}
              sx={{
                minHeight: 48,
                justifyContent: openDrawer ? 'initial' : 'center',
                px: 2.5,
              }}
              selected={selectedTab === 'overview'}
              onClick={() => setSelectedTab('overview')}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: openDrawer ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <SpeedIcon />
              </ListItemIcon>
              <ListItemText primary={'Overview'} sx={{ opacity: openDrawer ? 1 : 0 }} />
            </ListItemButton>
            <ListItemButton
              key={'calander'}
              sx={{
                minHeight: 48,
                justifyContent: openDrawer ? 'initial' : 'center',
                px: 2.5,
              }}
              selected={selectedTab === 'calendar'}
              onClick={() => setSelectedTab('calendar')}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: openDrawer ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <CalendarTodayIcon />
              </ListItemIcon>
              <ListItemText primary={'Calander'} sx={{ opacity: openDrawer ? 1 : 0 }} />
            </ListItemButton>
            <ListItemButton
              key={'patientList'}
              sx={{
                minHeight: 48,
                justifyContent: openDrawer ? 'initial' : 'center',
                px: 2.5,
              }}
              selected={selectedTab === 'patientList'}
              onClick={() => setSelectedTab('patientList')}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: openDrawer ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={'Patient List'} sx={{ opacity: openDrawer ? 1 : 0 }} />
            </ListItemButton>
            <ListItemButton
              key={'messages'}
              sx={{
                minHeight: 48,
                justifyContent: openDrawer ? 'initial' : 'center',
                px: 2.5,
              }}
              selected={selectedTab === 'messages'}
              onClick={() => setSelectedTab('messages')}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: openDrawer ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <MessageRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={'Messages'} sx={{ opacity: openDrawer ? 1 : 0 }} />
            </ListItemButton>
            <ListItemButton
              key={'paymentInfo'}
              sx={{
                minHeight: 48,
                justifyContent: openDrawer ? 'initial' : 'center',
                px: 2.5,
              }}
              selected={selectedTab === 'paymentInformation'}
              onClick={() => setSelectedTab('paymentInformation')}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: openDrawer ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <MonetizationOnRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={'Payment Info'} sx={{ opacity: openDrawer ? 1 : 0 }} />
            </ListItemButton>
            
            <ListItemButton
              key={'settings'}
              sx={{
                minHeight: 48,
                justifyContent: openDrawer ? 'initial' : 'center',
                px: 2.5,
              }}
              selected={selectedTab === 'settings'}
              onClick={() => setSelectedTab('settings')}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: openDrawer ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <SettingsRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={'Settings'} sx={{ opacity: openDrawer ? 1 : 0 }} />
            </ListItemButton>
            <div 
              style={{
                width:'100%',
                position:'absolute',
                bottom:0
              }}
            >

            <ListItemButton
              key={'help'}
              sx={{
                minHeight: 48,
                justifyContent: openDrawer ? 'initial' : 'center',
                px: 2.5,
              }}
              selected={selectedTab === 'help'}
              onClick={() => setSelectedTab('help')}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: openDrawer ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <InfoRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={'Help ?'} sx={{ opacity: openDrawer ? 1 : 0 }} />
            </ListItemButton>
            
            <Accordion expanded={openDoctorInfo} onChange={(ev, expanded) => setOpenDoctorInfo(expanded)}>
                <AccordionSummary
                  expandIcon={openDrawer&&<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Avatar  alt="Remy Sharp" src={Doctor} />
                  {
                    openDrawer && 
                    <React.Fragment>
                      &nbsp;&nbsp;
                      <div>
                       <Typography>
                       {doctorInfo.name}
                      </Typography>
                      <Typography variant="caption" display="block" gutterBottom>
                        {doctorInfo.specification}
                      </Typography>
                    </div>
                    </React.Fragment>
                  }
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet,
                  </Typography>
                </AccordionDetails>
            </Accordion>  
            
            </div>
            
        </List>
        
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {tabs[selectedTab]}
      </Box>
    </Box>
  );
}
