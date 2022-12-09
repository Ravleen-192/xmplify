import {
  Avatar,
  Box,
  Card,
  Icon,
  IconButton,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import Divider from '@mui/material/Divider';

import { Link } from 'react-router-dom';
import { Paragraph } from 'app/components/Typography';
import React from 'react';
import { useState, useEffect } from 'react';
import PipelineDetail from './pipelineDetail';

const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    tableLayout: "auto",
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const Small = styled('small')(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  background: bgcolor,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}));

const Pipelinetable = (props) => {
  const [productList, setproductList] = useState(props.productList);
  const [prodsel, setprodsel] = useState('');
  const [isActive, setActive] = useState('');
  const [prod, setprod] = useState([]);
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  useEffect(() => {
    console.log("productList ", productList);
  }, [productList]);

  const toggleActive = (i) => {

    if (i === isActive)
      setActive('');
    else setActive({ i });

  };
  const showDetail = (product, productid, i) => {

    if (i === isActive)
      setActive('');
    else setActive(i);
    setprodsel({ productid });
    setprod({ product });

  };

  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <Box overflow="auto">

        {productList && productList.map((product, nkey) => {
          console.log("isActive", isActive)
          console.log("prodsel", prodsel)

          return (<><Divider /><ProductTable>

            <TableBody>
              {(prodsel !== '' && isActive === product.id) ?
                <TableRow key={product.id} hover selected style={
                  isActive === product.id ? { background: 'rgba(9, 182, 109, 0.15)' } : null} onClick={() => showDetail(product.processes, product.id, product.id)}>
                  <TableCell align="left" colSpan={12} sx={{ px: 0, textTransform: 'capitalize' }}>
                    <b>{product.id}</b>
                  </TableCell>
                  <TableCell align="left" colSpan={20} sx={{ px: 0, textTransform: 'capitalize' }}>
                    <strong>{product.name}</strong>
                  </TableCell>
                  <TableCell align="center" sx={{ px: 0, justifyContent: 'left' }} colSpan={2}>
                    {console.log("product", product)}
                    <IconButton ><Link className="link" to='/pipelineupdate/default' state={{ product: { product } }}>

                      <Icon color="primary">transform</Icon>
                    </Link>
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ px: 0, justifyContent: 'right' }} colSpan={2}>
                    <IconButton>
                      {isActive === product.processtemplateid ?
                        <Icon color="primary">expand_less</Icon> :
                        <Icon color="primary">expand_more</Icon>}
                    </IconButton>
                  </TableCell>
                </TableRow>
                : <TableRow key={product.id} hover selected style={
                  isActive === product.id ? { background: 'rgba(9, 182, 109, 0.15)' } : null} onClick={() => showDetail(product.processes, product.id, product.id)}>
                  <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                    <b>{product.id}</b>
                  </TableCell>
                  <TableCell align="left" colSpan={8} sx={{ px: 0, textTransform: 'capitalize' }}>
                    <strong>{product.name}</strong>
                  </TableCell>
                  {product.processes.map((process, index) => {
                    return (
                      <>
                        <TableCell align="center" key={process.processtemplateid} colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                          <Avatar src={product.processes[index].icon} />
                        </TableCell>

                        <TableCell align="center" colSpan={4} sx={{ px: 0, textTransform: 'capitalize' }}>
                          <Box display="flex" alignItems="left">

                            <Paragraph>{product.processes[index].name}</Paragraph>

                          </Box>
                        </TableCell>

                        <TableCell align="center" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                          <Avatar src={product.processes[index].status} />
                        </TableCell>
                      </>
                    );
                  })}
                  <TableCell align="center" sx={{ px: 0, justifyContent: 'left' }} colSpan={1}>
                    {console.log("product", product)}
                    <Link className="link" to='/pipelineupdate/default' state={{ product: { product } }}>

                      <Icon color="primary">transform</Icon>
                    </Link>

                  </TableCell>
                  <TableCell align="left" sx={{ px: 0, justifyContent: 'left' }} colSpan={1}>
                    {isActive === product.id ?
                      <Icon color="primary">expand_less</Icon> :
                      <Icon color="primary">expand_more</Icon>}
                  </TableCell>
                </TableRow>}
              {

                (prodsel !== '' && isActive === product.id) ?

                  <TableRow >
                    <TableCell sx={{ px: 0, justifyContent: 'center', backgroundColor: 'rgba(9, 182, 109, 0.15)' }} colSpan={36}>
                      <PipelineDetail productList={prod} productid={prodsel} /></TableCell></TableRow>
                  : null
              }
            </TableBody>
          </ProductTable>
            <Divider />
          </>);


        })}


      </Box>

    </Card>
  );
};

/*const productList = [
  {
    "id": "#4933",
    "processes": [
      {
        "id": "#4933p1",
        "status": "/assets/images/awsicons/greenarr.jpg",
        "icon": "/assets/images/awsicons/Onprem.png",
        "desc": "On-prem to S3",
        "steps": [

          { "id": "#4933p1s1", "name": "Trigger job to move/copy to S3 ", "desc": "{INSERT INTO table_name (column1, column2}", "icon": "/assets/images/awsicons/Onprem.png", "status": "/assets/images/awsicons/greenarr.jpg", },
          { "id": "#4933p1s2", "name": "for push - N/A, e.g. cron copies from STFP to S3", "desc": "{UPDATE table_name SET column1}", "icon": "/assets/images/awsicons/Onprem.png", "status": "/assets/images/awsicons/redarr.jpg", },
          { "id": "#4933p1s3", "name": "N/A - will leverage Storage Gateway", "desc": "N/A - will leverage Storage Gateway", "icon": "/assets/images/awsicons/Onprem.png", "status": "/assets/images/awsicons/greenarr.jpg", },
          { "id": "#4933p1s4", "name": "On-prem DAtabase to AWS Redshift Replication", "desc": "INSERT INTO table_name (column1, column2}", "icon": "/assets/images/awsicons/Onprem.png", "status": "/assets/images/awsicons/redarr.jpg", }
        ],
      },
      {
        "id": "#4933p2",
        "status": "/assets/images/awsicons/redarr.jpg",
        "icon": "/assets/images/awsicons/s3.png",
        "desc": "S3 to Redshift Source-raw",
        "steps": [




          { "id": "#4933p2s1", "name": "Check if trailer file exists; if not generate trailer file", "desc": "INSERT INTO table_name (column1, column2}", "icon": "/assets/images/awsicons/s3.png", "status": "/assets/images/awsicons/redarr.jpg", },
          { "id": "#4933p2s2", "name": "Load trailer file to log table", "desc": "INSERT INTO table_name (column1, column2}", "icon": "/assets/images/awsicons/s3.png", "status": "/assets/images/awsicons/greenarr.jpg", },
          { "id": "#4933p2s3", "name": "Reconcile trailer file and raw table count", "desc": "INSERT INTO table_name (column1, column2}", "icon": "/assets/images/awsicons/s3.png", "status": "/assets/images/awsicons/greenarr.jpg", },
          { "id": "#4933p2s4", "name": "Trigger notification/alertse", "desc": "INSERT INTO table_name (column1, column2}", "icon": "/assets/images/awsicons/s3.png", "status": "/assets/images/awsicons/redarr.jpg", }
        ],
      },
      {
        "id": "#4933p3",
        "status": "/assets/images/awsicons/greenarr.jpg",
        "icon": "/assets/images/awsicons/redshift.png",
        "desc": "Source-raw to Curated",
        "steps": [
          { "id": "#4933p3s1", "name": "Copy data from source_raw to curated tables", "desc": "3938", "icon": "/assets/images/awsicons/redshift.png", "status": "/assets/images/awsicons/redarr.jpg", },
          { "id": "#4933p3s2", "name": "each table will have its own step to load", "desc": "3812", "icon": "/assets/images/awsicons/redshift.png", "status": "/assets/images/awsicons/redarr.jpg", },
          { "id": "#4933p3s3", "name": "Run DQ controls - reconcile", "desc": "6714", "icon": "/assets/images/awsicons/redshift.png", "status": "/assets/images/awsicons/redarr.jpg", },
          { "id": "#4933p3s4", "name": "Trigger notification / alerts", "desc": "743", "icon": "/assets/images/awsicons/redshift.png", "status": "/assets/images/awsicons/redarr.jpg", }
        ],
      },
      {
        "id": "#4933p4",
        "status": "/assets/images/awsicons/greenarr.jpg",
        "icon": "/assets/images/awsicons/Analytics.png",
        "desc": "Curated to Consumption",
        "steps": [
          { "id": "#4933p4s1", "name": "Copy data from curated to consumption table", "desc": "3938", "icon": "/assets/images/awsicons/Analytics.png", "status": "/assets/images/awsicons/redarr.jpg", },
          { "id": "#4933p4s2", "name": "Unload to outbound S3(separate process ?)", "desc": "3812", "icon": "/assets/images/awsicons/Analytics.png", "status": "/assets/images/awsicons/redarr.jpg", },
        ],
      },

    ]
  },
  {
    "id": "#3911",
    "processes": [
      {
        "id": "#3911p1",
        "status": "/assets/images/awsicons/greenarr.jpg",
        "icon": "/assets/images/awsicons/Onprem.png",
        "desc": "On-prem to S3",
        "steps": [

          { "id": "#3911p1s1", "name": "AgglomerativeCluster", "desc": "3938", "icon": "/assets/images/awsicons/Onprem.png", "status": "/assets/images/awsicons/redarr.jpg", },
          { "id": "#3911p1s2", "name": "CommunityStructure", "desc": "3812", "icon": "/assets/images/awsicons/Onprem.png", "status": "/assets/images/awsicons/redarr.jpg", },
          { "id": "#3911p1s3", "name": "HierarchicalCluster", "desc": "6714", "icon": "/assets/images/awsicons/Onprem.png", "status": "/assets/images/awsicons/redarr.jpg", },
          { "id": "#3911p1s4", "name": "MergeEdge", "desc": "743", "icon": "/assets/images/awsicons/Onprem.png", "status": "/assets/images/awsicons/redarr.jpg", }

        ],
      },
      {
        "id": "#3911p2",
        "status": "/assets/images/awsicons/redarr.jpg",
        "icon": "/assets/images/awsicons/s3.png",
        "desc": "S3 to Redshift Source-raw",
        "steps": [
          { "id": "#3911p1s1", "name": "Check if the files are processed previously", "desc": "3938", "icon": "/assets/images/awsicons/Onprem.png", "status": "/assets/images/awsicons/redarr.jpg", },
          { "id": "#3911p1s2", "name": "Truncate the table", "desc": "3812", "icon": "/assets/images/awsicons/Onprem.png", "status": "/assets/images/awsicons/redarr.jpg", },
          { "id": "#3911p1s3", "name": "Load data from S3 into source_raw table", "desc": "6714", "icon": "/assets/images/awsicons/Onprem.png", "status": "/assets/images/awsicons/redarr.jpg", },
          { "id": "#3911p1s4", "name": "Logging into batch", "desc": "743", "icon": "/assets/images/awsicons/Onprem.png", "status": "/assets/images/awsicons/redarr.jpg", }

        ],
      },
      {
        "id": "#3911p3",
        "status": "/assets/images/awsicons/greenarr.jpg",
        "icon": "/assets/images/awsicons/redshift.png",
        "desc": "Source-raw to Curated",
        "steps": [

          { "id": "#3911p1s1", "name": "AgglomerativeCluster", "desc": "3938", "icon": "/assets/images/awsicons/Onprem.png", "status": "/assets/images/awsicons/redarr.jpg", },
          { "id": "#3911p1s2", "name": "CommunityStructure", "desc": "3812", "icon": "/assets/images/awsicons/Onprem.png", "status": "/assets/images/awsicons/redarr.jpg", },
          { "id": "#3911p1s3", "name": "HierarchicalCluster", "desc": "6714", "icon": "/assets/images/awsicons/Onprem.png", "status": "/assets/images/awsicons/redarr.jpg", },
          { "id": "#3911p1s4", "name": "MergeEdge", "desc": "743", "icon": "/assets/images/awsicons/Onprem.png", "status": "/assets/images/awsicons/redarr.jpg", }

        ],
      },
      {
        "id": "#3911p4",
        "status": "/assets/images/awsicons/greenarr.jpg",
        "icon": "/assets/images/awsicons/Analytics.png",
        "desc": "Curated to Consumption",
        "steps": [

          { "id": "#3911p1s1", "name": "AgglomerativeCluster", "desc": "3938", "icon": "/assets/images/awsicons/Onprem.png", "status": "/assets/images/awsicons/redarr.jpg", },
          { "id": "#3911p1s2", "name": "CommunityStructure", "desc": "3812", "icon": "/assets/images/awsicons/Onprem.png", "status": "/assets/images/awsicons/redarr.jpg", },
          { "id": "#3911p1s3", "name": "HierarchicalCluster", "desc": "6714", "icon": "/assets/images/awsicons/Onprem.png", "status": "/assets/images/awsicons/redarr.jpg", },
          { "id": "#3911p1s4", "name": "MergeEdge", "desc": "743", "icon": "/assets/images/awsicons/Onprem.png", "status": "/assets/images/awsicons/redarr.jpg", }

        ],
      },

    ]
  },


];

 [ {
    id:'#4933',
    imgUrl: '/assets/images/awsicons/Onprem.png',
    process1: 'On-prem to S3',
    rarrUrl:'/assets/images/awsicons/redarr.jpg',
    imgUrl1: '/assets/images/awsicons/s3.png',
    process2: 'S3 to Redshift source-raw',
    garrUrl: '/assets/images/awsicons/greenarr.jpg',
    imgUrl2: '/assets/images/awsicons/redshift.png',
    process3: 'Redshift to Curated',
    imgUrl3: '/assets/images/awsicons/Analytics.png',
    process4: 'Curated to Q-Analytics',
    child:[
    {name:'Process1',
    steps: [
      { id:'#4933P1S1', name: 'Step1', iconText: 'SI', detail: '1 On-prem to S3', status:'1' },
      {  id:'#4933P1S2',name: 'Step2', iconText: 'SU', detail: '2 On-prem to S3' , status:'1'},
      {  id:'#4933P1S3',name: 'Step3', iconText: 'FP', detail: '3 On-prem to S3' , status:'0'},
      {  id:'#4933P1S4',name: 'Step4', iconText: '404', detail: '4 On-prem to S3' , status:'1'},
    ]},
    {name:'Process2',
    steps: [
      { id:'#4933P2S1', name: 'Step1', iconText: 'SI', detail: '1 S3 to Redshift source-raw', status:'1'},
      {  id:'#4933P2S2',name: 'Step2', iconText: 'SU', detail: '2 S3 to Redshift source-raw' , status:'0'},
      {  id:'#4933P2S3',name: 'Step3', iconText: 'FP', detail: '3 S3 to Redshift source-raw' , status:'1'},
      {  id:'#4933P2S4',name: 'Step4', iconText: '404', detail: '4 S3 to Redshift source-raw' , status:'1'},
    ]},
    {name:'Process3',
    steps: [
      { id:'#4933P3S1', name: 'Step1', iconText: 'SI', detail: '1 Redshift to Curated' , status:'1'},
      {  id:'#4933P3S2',name: 'Step2', iconText: 'SU', detail: '2 Redshift to Curated', status:'0' },
      {  id:'#4933P3S3',name: 'Step3', iconText: 'FP', detail: '3 Redshift to Curated' , status:'1'},
      {  id:'#4933P3S4',name: 'Step4', iconText: '404', detail: '4 Redshift to Curated', status:'1' },
    ]},
    {name:'Process4',
    steps: [
      { id:'#4933P4S1', name: 'Step1', iconText: 'SI', detail: '1 On-prem to S3', status:'1' },
      {  id:'#4933P4S2',name: 'Step2', iconText: 'SU', detail: '2 On-prem to S3' , status:'1'},
      {  id:'#4933P4S3',name: 'Step3', iconText: 'FP', detail: '3 On-prem to S3', status:'1' },
      {  id:'#4933P4S4',name: 'Step4', iconText: '404', detail: '4 On-prem to S3', status:'0' },
    ]},
  ]
  },
  {
    id:'#3911',
    imgUrl: '/assets/images/awsicons/Onprem.png',
    process1: 'On-prem to S3',
    rarrUrl:'/assets/images/awsicons/greenarr.jpg',
    imgUrl1: '/assets/images/awsicons/s3.png',
    process2: 'S3 to Redshift source-raw',
    garrUrl: '/assets/images/awsicons/redarr.jpg',
    imgUrl2: '/assets/images/awsicons/Curated.jpg',
    process3: 'Redshift to Curated',
    imgUrl3: '/assets/images/awsicons/Lineage.jpg',
    process4: 'Curated to Q-Analytics',
    child:[
      {name:'Process1',
      steps: [
        { id:'#3911P1S1', name: 'Step1', iconText: 'SI', detail: '1 On-prem to S3', status:'1' },
        {  id:'#3911P1S2',name: 'Step2', iconText: 'SU', detail: '2 On-prem to S3' , status:'1'},
        {  id:'#3911P1S3',name: 'Step3', iconText: 'FP', detail: '3 On-prem to S3' , status:'0'},
        {  id:'#3911P1S4',name: 'Step4', iconText: '404', detail: '4 On-prem to S3' , status:'1'},
      ]},
      {name:'Process2',
      steps: [
        { id:'#3911P2S1', name: 'Step1', iconText: 'SI', detail: '1 S3 to Redshift source-raw', status:'1'},
        {  id:'#3911P2S2',name: 'Step2', iconText: 'SU', detail: '2 S3 to Redshift source-raw' , status:'0'},
        {  id:'#3911P2S3',name: 'Step3', iconText: 'FP', detail: '3 S3 to Redshift source-raw' , status:'1'},
        {  id:'#3911P2S4',name: 'Step4', iconText: '404', detail: '4 S3 to Redshift source-raw' , status:'1'},
      ]},
      {name:'Process3',
      steps: [
        { id:'#3911P3S1', name: 'Step1', iconText: 'SI', detail: '1 Redshift to Curated' , status:'1'},
        {  id:'#3911P3S2',name: 'Step2', iconText: 'SU', detail: '2 Redshift to Curated', status:'0' },
        {  id:'#3911P3S3',name: 'Step3', iconText: 'FP', detail: '3 Redshift to Curated' , status:'1'},
        {  id:'#3911P3S4',name: 'Step4', iconText: '404', detail: '4 Redshift to Curated', status:'1' },
      ]},
      {name:'Process4',
      steps: [
        { id:'#3911P4S1', name: 'Step1', iconText: 'SI', detail: '1 On-prem to S3', status:'1' },
        {  id:'#3911P4S2',name: 'Step2', iconText: 'SU', detail: '2 On-prem to S3' , status:'1'},
        {  id:'#3911P4S3',name: 'Step3', iconText: 'FP', detail: '3 On-prem to S3', status:'1' },
        {  id:'#3911P4S4',name: 'Step4', iconText: '404', detail: '4 On-prem to S3', status:'0' },
      ]},
    ]
  },
 /*{
    id:'#3917',
    imgUrl: '/assets/images/awsicons/Onprem.png',
    process1: 'On-prem to S3',
    imgUrl1: '/assets/images/awsicons/s3.png',
    process2: 'S3 to Redshift source-raw',
    imgUrl2: '/assets/images/awsicons/redshift.png',
    process3: 'Redshift to Curated',
    imgUrl3: '/assets/images/awsicons/Analytics.png',
    process4: 'Curated to Q-Analytics',
  },
  {
    id:'#3913',
    imgUrl: '/assets/images/awsicons/Onprem.png',
    process1: 'On-prem to S3',
    imgUrl1: '/assets/images/awsicons/s3.png',
    process2: 'S3 to Redshift source-raw',
    imgUrl2: '/assets/images/awsicons/redshift.png',
    process3: 'Redshift to Curated',
    imgUrl3: '/assets/images/awsicons/Analytics.png',
    process4: 'Curated to Q-Analytics',
  },
  {
    id:'#3914',
    imgUrl: '/assets/images/awsicons/Onprem.png',
    process1: 'On-prem to S3',
    imgUrl1: '/assets/images/awsicons/s3.png',
    process2: 'S3 to Redshift source-raw',
    imgUrl2: '/assets/images/awsicons/redshift.png',
    process3: 'Redshift to Curated',
    imgUrl3: '/assets/images/awsicons/Analytics.png',
    process4: 'Curated to Q-Analytics',
  },
];*/

export default Pipelinetable;
