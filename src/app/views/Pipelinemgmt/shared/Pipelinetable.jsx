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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
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
  const [errMsg, seterrMsg] = useState("");
  const [succMsg, setsuccMsg] = useState("");
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
        {errMsg !== "" ?
          <Alert severity="error" onClose={() => { seterrMsg("") }}>
            <AlertTitle>Error</AlertTitle>
            <strong>{errMsg}</strong>
          </Alert> : null}

        {productList && productList.map((product, nkey) => {
          console.log("isActive", isActive)
          console.log("prodsel", prodsel)

          return (<><Divider /><ProductTable>

            <TableBody>
              {(prodsel !== '' && isActive === product.id) ?
                <TableRow key={product.id} hover selected style={
                  isActive === product.id ? { background: 'rgba(9, 182, 109, 0.15)' } : null} onClick={() => showDetail(product.processes, product.id, product.id)}>
                  <TableCell align="left" colSpan={12} sx={{ px: 0 }}>
                    <b>{product.id}</b>
                  </TableCell>
                  <TableCell align="left" colSpan={20} sx={{ px: 0 }}>
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
                  <TableCell align="left" colSpan={2} sx={{ px: 0 }}>
                    <b>{product.id}</b>
                  </TableCell>
                  <TableCell align="left" colSpan={8} sx={{ px: 0 }}>
                    <strong>{product.name}</strong>
                  </TableCell>
                  {product.processes.map((process, index) => {
                    return (
                      <>
                        <TableCell align="center" key={process.processtemplateid} colSpan={2} sx={{ px: 0 }}>
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


export default Pipelinetable;
