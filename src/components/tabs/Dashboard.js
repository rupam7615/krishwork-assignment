import * as React from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import { Avatar, Breadcrumbs, Button, Card, CardContent, IconButton, Link, TextField, Typography } from '@mui/material';
import {Print, Edit, Person, CreateNewFolder, FileCopy} from '@mui/icons-material'
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import '../../styles/dashboard.scss';

import Doctor from '../../images/doctor.jpg';
import styled from '@emotion/styled';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';

const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#80BFFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    800: '#004C99',
    900: '#003A75',
  };
  
  const Tab = styled(TabUnstyled)`
    font-family: IBM Plex Sans, sans-serif;
    color: white;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: bold;
    background-color: transparent;
    width: 100%;
    padding: 12px 16px;
    margin: 6px 6px;
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;
  
    &:hover {
      background-color: ${blue[400]};
    }
  
    &:focus {
      color: #fff;
      border-radius: 3px;
      outline: 2px solid ${blue[200]};
      outline-offset: 2px;
    }
  
    &.${tabUnstyledClasses.selected} {
      background-color: ${blue[50]};
      color: ${blue[600]};
    }
  
    &.${buttonUnstyledClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;
  
  const TabPanel = styled(TabPanelUnstyled)`
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
  `;
  
  const TabsList = styled(TabsListUnstyled)`
    min-width: 320px;
    background-color: ${blue[500]};
    border-radius: 8px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
  `;


export default function BasicMasonry() {
  const [selectedAptTab, setAptTab] = React.useState('upcoming'); 

  const [patientInfo,setPatientInfo] = React.useState({});
  const [appointmentsInfo,setAppointmentsInfo] = React.useState({
      "Upcoming Appointments": {},
      "Post Appointment":{},
      "Medical Records":{}

  })
  const [files,setFiles] = React.useState([]);

  React.useEffect(()=>{
    fetch('https://619f39821ac52a0017ba467e.mockapi.io/patientDetails').then(res=>res.json()).then(data=>{
        setPatientInfo(data[0])
    })
    fetch('https://619f39821ac52a0017ba467e.mockapi.io/appointment_details').then(res=>res.json()).then(data=>{
        setAppointmentsInfo(prev=>{
            return {
                ...prev,
                ...data[0]
            }
        })
    })
    fetch('https://619f39821ac52a0017ba467e.mockapi.io/Files').then(res=>res.json()).then(data=>{
        setFiles(data[0].files)
    })
  },[])


const AppointmentsTab = (props) => {
    return (
    <div className='dashboard-aptcard-body'>
        <p className='dashboard-aptcard-body-title'>Root Canal Treatment</p>

        <div className='dashboard-aptcard-body-entry'>
            <p className='dashboard-aptcard-body-entry-date'>{appointmentsInfo["Upcoming Appointments"].Date}<br/><span className='dashboard-aptcard-body-entry-title'>09:00-10:00</span></p>
            <p className='dashboard-aptcard-body-entry-title'>Treatment<br/><span className='dashboard-aptcard-body-entry-value'>{appointmentsInfo["Upcoming Appointments"].Treatment}</span></p>
            <p className='dashboard-aptcard-body-entry-title'>Dentist<br/><span className='dashboard-aptcard-body-entry-value'>{appointmentsInfo["Upcoming Appointments"].Dentist}</span></p>
            <p className='dashboard-aptcard-body-entry-title'>Nurse<br/><span className='dashboard-aptcard-body-entry-value'>{appointmentsInfo["Upcoming Appointments"].Nurse}</span></p>
            <p className='dashboard-aptcard-body-entry-note'><CreateNewFolder style={{fontSize: '12px'}} /> Note</p>
        </div>
    </div>
    )
}

const PastAppointmentsTab = (props) => {
    return (
    <div className='dashboard-aptcard-body'>
        <p className='dashboard-aptcard-body-title'>Root Canal Treatment</p>

        <div className='dashboard-aptcard-body-entry'>
            <p className='dashboard-aptcard-body-entry-date'>{appointmentsInfo["Upcoming Appointments"].Date}<br/><span className='dashboard-aptcard-body-entry-title'>09:00-10:00</span></p>
            <p className='dashboard-aptcard-body-entry-title'>Treatment<br/><span className='dashboard-aptcard-body-entry-value'>{appointmentsInfo["Post Appointment"].Treatment}</span></p>
            <p className='dashboard-aptcard-body-entry-title'>Dentist<br/><span className='dashboard-aptcard-body-entry-value'>{appointmentsInfo["Post Appointment"].Dentist}</span></p>
            <p className='dashboard-aptcard-body-entry-title'>Nurse<br/><span className='dashboard-aptcard-body-entry-value'>{appointmentsInfo["Post Appointment"].Nurse}</span></p>
            <p className='dashboard-aptcard-body-entry-note'><CreateNewFolder style={{fontSize: '12px'}} /> Note</p>
        </div>
    </div>
    )
}

  const RecordsTab = () => {
        return (
        <div className='dashboard-aptcard-body'>
            <p className='dashboard-aptcard-body-title'>Status: {appointmentsInfo["Medical Records"].status}</p>
        </div>
        )
    }

    
  const aptTabs = {
    'upcoming': <AppointmentsTab length={5} />,
    'past': <PastAppointmentsTab length={3} />,
    'records': <RecordsTab />,
  }

  return (
    <React.Fragment>
        <div className='dashboard-topbar'>
            <div className='dashboard-topbar-breadcrumbs'>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="#">
                    Patients
                </Link>
                <Typography color="text.primary">Lauda Lassan</Typography>
            </Breadcrumbs>
            </div>

            <Button varient='outlined'>
                <Print />
            </Button>

            &nbsp;&nbsp;
            <Button variant='contained'>
                <Edit /> &nbsp; Edit Patient
            </Button>
        </div>
        <br />

        <Box sx={{ width: '100%', minHeight: 393 }}>
      <Masonry columns={2} spacing={2}>
        
        <Card style={{
            background:"transparent"
        }}>
            <CardContent>
                <div className='dashboard-profilecard'>
                    <div className='dashboard-profilecard-overview'>
                        <Avatar src={Doctor} sx={{
                            width:'100px',
                            height:'100px',
                            justifySelf:'center'
                        }} />
                        <h1 className='dashboard-profilecard-overview-name'>{patientInfo.name}</h1>
                        <p className='dashboard-profilecard-overview-email'>{patientInfo['e-email']}</p>
                        <div className='dashboard-profilecard-overview-statscontainer'>
                            <div className='dashboard-profilecard-overview-statscontainer-stats'>
                                <h2>{patientInfo.Past}</h2>
                                <p>Past</p>
                            </div>
                            <div className='dashboard-profilecard-overview-statscontainer-seperator'></div>
                            <div className='dashboard-profilecard-overview-statscontainer-stats'>
                                <h2>{patientInfo.Upcoming}</h2>
                                <p>Upcoming</p>
                            </div>
                        </div>
                        <Button>
                            Send Message
                        </Button>
                    </div>
                    <div className='dashboard-profilecard-summary'>
                        <table>
                            <tbody>
                                <tr>
                                    <td className='dashboard-profilecard-summary-title'>Gender<br/><span className='dashboard-profilecard-summary-value'>{patientInfo.Gender}</span></td>
                                    <td className='dashboard-profilecard-summary-title'>Birthday<br/><span className='dashboard-profilecard-summary-value'>{patientInfo.Birthday}</span></td>
                                    <td className='dashboard-profilecard-summary-title'>Phone Number<br/><span className='dashboard-profilecard-summary-value'>{patientInfo['Phone Number']}</span></td>
                                </tr>
                                <tr>
                                    <td className='dashboard-profilecard-summary-title'>Street Address<br/><span className='dashboard-profilecard-summary-value'>{patientInfo['Street Address']}</span></td>
                                    <td className='dashboard-profilecard-summary-title'>City<br/><span className='dashboard-profilecard-summary-value'>Cilacap</span></td>
                                    <td className='dashboard-profilecard-summary-title'>Zip Code<br/><span className='dashboard-profilecard-summary-value'>{patientInfo['ZIP Code']}</span></td>
                                </tr>
                                <tr>
                                    <td className='dashboard-profilecard-summary-title'>Member Status<br/><span className='dashboard-profilecard-summary-value'>{patientInfo['Member Status']}</span></td>
                                    <td className='dashboard-profilecard-summary-title'>Registerd Date<br/><span className='dashboard-profilecard-summary-value'>{patientInfo['Register Date']}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardContent>
                <div className="dashboard-notescard-top">
                    <Typography className="dashboard-notescard-top-title">Notes</Typography>
                    <a href="#">See More</a>
                </div>

                <div className="dashboard-notescard-notecontainer">
                    <textarea />
                    <Button className="dashboard-notescard-notecontainer-savebtn" varient="contained" color="primary">
                        save note
                    </Button>
                </div>
                <p className="dashboard-notescard-bottomTitle">Lorium Ipsium</p>
                <div className="dashboard-notescard-bottom">
                    <Person />
                    <p className="dashboard-notescard-bottom-name">Doctor Strange</p>
                    <p>27 Nov, 2021</p>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardContent>
                <TabsUnstyled value={selectedAptTab} onChange={(ev, selectedTab) => setAptTab(selectedTab)}>
                    <TabsList>
                        <Tab value={'upcoming'}>Upcoming Appoitnment</Tab>
                        <Tab value={'past'}>Past Appointments</Tab>
                        <Tab value={'records'}>Medical Records</Tab>
                    </TabsList>
                </TabsUnstyled>

                {aptTabs[selectedAptTab]}
                
            </CardContent>
        </Card>

        <Card>
            <CardContent>
                
                <div className="dashboard-filecard-top">
                    <Typography className="dashboard-filecard-top-title">Files / Documents</Typography>
                    <a href="#">Add File</a>
                </div>
                <br/>
                
                {files.map((ele,index)=>{
                    return (
                        <div key={index} className="dashboard-filecard-filelist">
                            <div className="dashboard-filecard-filelist-entry">
                                <FileCopy />
                                <p className="dashboard-filecard-filelist-entry-name">{ele}</p>
                                <p>27Kbps</p>
                            </div>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
        
      </Masonry>
    </Box>
    </React.Fragment>
  );
}
