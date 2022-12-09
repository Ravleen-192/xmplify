import {
  Avatar,
  Box,
  Card,
  Icon,
  IconButton,

  styled,
  Table,
  TableBody,
  TableCell,

  TableRow,

} from '@mui/material';
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
  const pipelineID = props.pipelineID;
  const [prodsel, setprodsel] = useState('');
  const [isActive, setActive] = useState('');
  const [prod, setprod] = useState([]);

  console.log("productList[0]", productList[0])

  console.log("pipelineData id", pipelineID)
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
        <ProductTable>
          <TableBody>
            {productList && productList.map((product, nkey) => {
              console.log("product", product)
              console.log("product.processes", product.processes)
              return (<> <TableRow key={nkey} hover selected onClick={() => showDetail(product.processes, pipelineID, pipelineID)}>
                <TableCell align="left" colSpan={3} sx={{ px: 0, textTransform: 'capitalize' }}>
                  {pipelineID}
                </TableCell>
                {product.processes.map((process, index) => {
                  console.log("process", process)
                  return (
                    <>
                      <TableCell key={index} align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                        <Avatar src={process.icon} />
                      </TableCell>
                      <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                        <Box display="flex" alignItems="left">
                          <Paragraph>{process.name}</Paragraph>
                        </Box>
                      </TableCell>
                      <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                        <Avatar src={process.id} />
                      </TableCell>
                    </>
                  );
                })}
                <TableCell sx={{ px: 0, justifyContent: 'left' }} colSpan={1}>
                  <IconButton>
                    {isActive === product.id ?
                      <Icon color="primary">expand_less</Icon> :
                      <Icon color="primary">expand_more</Icon>}
                  </IconButton>
                </TableCell>
              </TableRow>
                {
                  (prodsel !== '' && isActive === product.id) ?
                    <TableRow key={product.id} >
                      <TableCell sx={{ px: 0, justifyContent: 'center', backgroundColor: 'rgba(9, 182, 109, 0.15)' }} colSpan={36}>
                        <PipelineDetail productList={prod} productid={prodsel} /></TableCell></TableRow>
                    : null
                }
              </>);
            })}
          </TableBody>
        </ProductTable>
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
