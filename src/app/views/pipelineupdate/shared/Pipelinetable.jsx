import {
  Avatar,
  Box,
  Card,
  Icon,
  IconButton,

  styled,
  Table, Button,
  TableBody,
  TableCell,

  TableRow,

} from '@mui/material';
import Divider from '@mui/material/Divider';
import { Paragraph } from 'app/components/Typography';
import React from 'react';
import { useState } from 'react';
import PipelineDetail from './pipelineDetail';



const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));



const Pipelinetable = (props) => {
  const productList = props.pipelineData;
  const pipelineName = props.pipelineName;
  const [prodsel, setprodsel] = useState('');
  const [isActive, setActive] = useState('');
  const [prod, setprod] = useState([]);
  console.log("productList", productList)
  console.log("pipelineName", pipelineName)



  const showDetail = (product, productid, i) => {
    if (prodsel === '')
      setprodsel({ productid });
    else
      setprodsel('');
    setprod({ product });

  };
  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <Box overflow="auto">
        {productList && productList[0].name && productList[0].processes.length >= 1 ?
          <><ProductTable>
            <TableBody>
              {productList && productList.map((product, nkey) => {
                return (<>
                  {(prodsel !== '') ?
                    <TableRow key={product.id} hover selected style={
                      isActive === product.processtemplateid ? { background: 'rgba(9, 182, 109, 0.15)' } : null} onClick={() => showDetail(product.processes, product.processtemplateid, product.processtemplateid)}>
                      <TableCell align="left" colSpan={18} sx={{ px: 0, textTransform: 'capitalize' }}>
                        <b>Pipeline Name</b>
                      </TableCell>
                      <TableCell align="left" colSpan={18} sx={{ px: 0, textTransform: 'capitalize' }}>
                        <b>{product.name}</b>
                      </TableCell>

                      <TableCell align="right" sx={{ px: 0, justifyContent: 'left' }} colSpan={2}>
                        <IconButton>
                          {prodsel !== '' ?
                            <Icon color="primary">expand_less</Icon> :
                            <Icon color="primary">expand_more</Icon>}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    : <TableRow key={product.id} hover selected style={
                      prodsel !== '' ? { background: 'rgba(9, 182, 109, 0.15)' } : null} onClick={() => showDetail(product.processes, product.processtemplateid, product.processtemplateid)}>
                      <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                        {product.id}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{ px: 0 }}>
                        {product.name}
                      </TableCell>
                      {product.processes && product.processes.map((process, index) => {
                        console.log("process", process)
                        return (
                          <>
                            <TableCell key={index} align="center" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                              <Avatar src={process.icon} />
                            </TableCell>
                            <TableCell colSpan={4} align="center" sx={{ px: 0, textTransform: 'capitalize' }}>
                              <Box display="flex" alignItems="left">
                                <Paragraph>{process.name}</Paragraph>
                              </Box>
                            </TableCell>
                            <TableCell align="center" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                              <Avatar src={process.status} />
                            </TableCell>
                          </>
                        );
                      })}
                      <TableCell align="right" sx={{ px: 0, justifyContent: 'right' }} colSpan={1}>
                        <IconButton>
                          {(prodsel !== '') ?
                            <Icon color="primary">expand_less</Icon> :
                            <Icon color="primary">expand_more</Icon>}
                        </IconButton>
                      </TableCell>
                    </TableRow>}
                  {
                    (prodsel !== '') ?
                      <TableRow key={product.processtemplateid} sx={{ width: '100%', px: 0, justifyContent: 'center', backgroundColor: 'rgba(9, 182, 109, 0.15)' }}>
                        <TableCell sx={{ px: 0, justifyContent: 'right', backgroundColor: 'rgba(9, 182, 109, 0.15)' }} colSpan={38}>
                          <PipelineDetail productList={prod} productid={prodsel} /></TableCell></TableRow>
                      : null
                  }
                </>);
              })}
            </TableBody>
          </ProductTable><Divider /></> : <>
            <Button sx={{ color: 'red' }}>Please enter the pipeline name and atleast one process to create a pipeline.</Button><Divider /></>}
      </Box>
    </Card>
  );
};
/*
const productList = [{
  "id": "",
  "processes": [{
    "id": "#1111P1",
    "name": "On-prem to S3",
    "icon": "/assets/images/awsicons/s3.png",
    "steps": [{
      "name": "Trigger job to move/copy to S3",
      "icon": "/assets/images/awsicons/s3.png"
    }, {
      "name": "for push - N/A, e.g. cron copies from STFP to S3",
      "icon": "/assets/images/awsicons/redshift1.png"
    }, {
      "name": "Load trailer file to log table",
      "icon": "/assets/images/awsicons/s3.png"
    }, {
      "name": "On-prem DAtabase to AWS Redshift Replication",
      "icon": "/assets/images/awsicons/quicksight.png"
    }]
  }, {
    "id": "#1111P1",
    "name": "On-prem to S3",
    "icon": "/assets/images/awsicons/s3.png",
    "steps": [{
      "name": "Trigger job to move/copy to S3",
      "icon": "/assets/images/awsicons/s3.png"
    }, {
      "name": "for push - N/A, e.g. cron copies from STFP to S3",
      "icon": "/assets/images/awsicons/redshift1.png"
    }, {
      "name": "Load trailer file to log table",
      "icon": "/assets/images/awsicons/s3.png"
    }, {
      "name": "On-prem DAtabase to AWS Redshift Replication",
      "icon": "/assets/images/awsicons/quicksight.png"
    }]
  }, {
    "id": "#1111P1",
    "name": "On-prem to S3",
    "icon": "/assets/images/awsicons/s3.png",
    "steps": [{
      "name": "Trigger job to move/copy to S3",
      "icon": "/assets/images/awsicons/s3.png"
    }, {
      "name": "for push - N/A, e.g. cron copies from STFP to S3",
      "icon": "/assets/images/awsicons/redshift1.png"
    }, {
      "name": "Load trailer file to log table",
      "icon": "/assets/images/awsicons/s3.png"
    }, {
      "name": "On-prem DAtabase to AWS Redshift Replication",
      "icon": "/assets/images/awsicons/quicksight.png"
    }]
  }]
}];
*/

export default Pipelinetable;
