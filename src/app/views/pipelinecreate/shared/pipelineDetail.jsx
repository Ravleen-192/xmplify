import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, styled } from "@mui/material";
import {
  Avatar,
  Table,
  TableCell,
  TableBody,
  TableRow,

} from '@mui/material';
import { Paragraph } from 'app/components/Typography';
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(15),
  flexBasis: "33.33%",
  flexShrink: 0,
}));
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

const SecondaryHeading = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(15),
  color: theme.palette.text.secondary,
}));

export default function ControlledExpansionPanels(product, productid) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box width="100%">
      {product.productList.product.map((step, index) => {

        return (<Accordion expanded={expanded === step.id} onChange={handleChange(step.id)}>
          <AccordionSummary
            id="panel1bh-header"
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
          >
            <Heading>{step.id} </Heading>
            <SecondaryHeading>{step.desc}</SecondaryHeading>
          </AccordionSummary>

          {step.steps.map((st, index) => {

            return (<AccordionDetails>
              <ProductTable>

                <TableBody>
                  <TableRow key={st.id} hover>
                    <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                      <Avatar src={st.icon} />
                    </TableCell>

                    <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                      <Box display="flex" alignItems="left">

                        <Paragraph>{st.name}</Paragraph>

                      </Box>
                    </TableCell>
                    <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                      <Avatar src={st.status} />
                    </TableCell>
                    <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                      <Box display="flex" alignItems="left">

                        <Paragraph>{st.desc}</Paragraph>

                      </Box>
                    </TableCell>

                  </TableRow>

                </TableBody>
              </ProductTable>
            </AccordionDetails>);

          })}
        </Accordion>);

      })}


    </Box>

  );
}
