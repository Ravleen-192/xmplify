//--->
import React from 'react';
import  DBIconImg from '../resources/database-svgrepo-com.svg';
import  RedShiftIconImg from '../resources/Arch_Amazon-Redshift_64.svg';
import  DataBrewIconImg from '../resources/Arch_AWS-Glue-DataBrew_64.svg';
import  S3IconImg from '../resources/Arch_Amazon-Simple-Storage-Service_64.svg';
import  ScriptIconImg from '../resources/script-svgrepo-com.svg';
import './dlFlow.css';
import { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
// 👇 you need to import the reactflow styles
import 'reactflow/dist/style.css';

import { MarkerType } from 'reactflow';
import { Handle, Position } from 'reactflow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



const handleStyle = { left: 10 };

function CustomNode({ data }) {
  const onChange = useCallback((evt) => {
    //console.log(evt.target.value);
  }, []);

  return (
    <>
    <div className="reactflow-custom-node">
      {data.lhandle == 'True' &&
        <Handle type="target" position={Position.Left} id="left"/>
      }
      {data.thandle == 'True' &&
        <Handle type="target" position={Position.Top} id="top"/>
      }
      {data.rhandle == 'True' &&
        <Handle type="source" position={Position.Right} id="right" />
      }
      {data.bhandle == 'True' &&
        <Handle type="source" position={Position.Bottom} id="bottom" />
      }
      <img  className="icon" src={data.icon} color='red'/>          
      <Typography component={'span'} variant="body2" color="text.secondary">
        <Box sx={{fontWeight: 'bold',marginLeft:'5px',minWidth:'150px' }}>{data.label}</Box>
      </Typography>
      
      </div>
    </>
  );
}

const initialNodes = [
  /*
  {
    id: 'horizontal-1',
    sourcePosition: 'right',
    type: 'input',
    data: { label: 'Input' },
    position: { x: 0, y: 80 },
  },
  */
 
  { 
    id: 'resdhiftsrc', 
    sourcePosition: 'right',
    type: 'customnode', 
    position: { x: 0, y: 160 }, 
    data: { label: "redshift.sales", icon: RedShiftIconImg, 
            thandle:'False',
            bhandle:'False',
            lhandle:'False',
            rhandle:'True' } 
  },
  
  {
    id: 'script1',
    sourcePosition: 'right',
    targetPosition: 'left',
    type: 'customnode', 
    data: { label: "redshift.select", icon: ScriptIconImg,
            thandle:'False',
            bhandle:'False',
            lhandle:'True',
            rhandle:'True' },
    position: { x: 250, y: 160 },
  },
  {
    id: 's3',
    sourcePosition: 'right',
    targetPosition: 'left',
    type: 'customnode', 
    data: { label: "s3://datamesh-portal/filter", icon: S3IconImg,
            thandle:'False',
            bhandle:'False',
            lhandle:'True',
            rhandle:'True' },
    position: { x: 500, y: 160 },
  },
  {
    id: 'dag.process11',
    sourcePosition: 'right',
    targetPosition: 'left',
    type: 'customnode', 
    data: { label: "dag.process11", icon: ScriptIconImg,
          thandle:'False',
          bhandle:'False',
          lhandle:'True',
          rhandle:'True' },
    position: { x: 795, y: 160 },
  },
  {
    id: 'dag.process12',
    sourcePosition: 'right',
    targetPosition: 'left',
    type: 'customnode', 
    data: { label: "dag.process12", icon: ScriptIconImg,
            thandle:'False',
            bhandle:'False',
            lhandle:'True',
            rhandle:'True' },
    position: { x: 1045, y: 160 },
  },
  {
    id: 'dag.process13',
    sourcePosition: 'right',
    targetPosition: 'left',
    type: 'customnode', 
    data: { label: "dag.process13", icon: ScriptIconImg,
            thandle:'False',
            bhandle:'False',
            lhandle:'True',
            rhandle:'True' },
    position: { x: 1295, y: 160 },
  },
  {
    id: 's3-target1',
    sourcePosition: 'right',
    targetPosition: 'left',
    type: 'customnode', 
    data: { label: "s3://analytics-bucket/", icon: S3IconImg,
            thandle:'False',
            bhandle:'False',
            lhandle:'True',
            rhandle:'False' },
    position: { x: 1545, y: 160 },
  },

  {
    id: 'dag.process21',
    sourcePosition: 'right',
    targetPosition: 'left',
    type: 'customnode', 
    data: { label: "dag.process21", icon: ScriptIconImg ,
            thandle:'False',
            bhandle:'False',
            lhandle:'True',
            rhandle:'True' },
    position: { x: 795, y: 260 },
  },
  {
    id: 's3-target2',
    sourcePosition: 'right',
    targetPosition: 'left',
    type: 'customnode', 
    data: { label: "s3://log-bucket/", icon: S3IconImg,
            thandle:'False',
            bhandle:'False',
            lhandle:'True',
            rhandle:'False' },
    position: { x: 1045, y: 260 },
  },
];

const initialEdges = [
  {
    id: 'e1',
    source: 'resdhiftsrc',
    target: 'script1',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e2',
    source: 'script1',
    target: 's3',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e3',
    source: 's3',
    target: 'dag.process11',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e4',
    source: 'dag.process11',
    target: 'dag.process12',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e5',
    source: 'dag.process12',
    target: 'dag.process13',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e6',
    source: 'dag.process13',
    target: 's3-target1',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },

  {
    id: 'e7',
    source: 's3',
    target: 'dag.process21',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e8',
    source: 'dag.process21',
    target: 's3-target2',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];
const rfStyle = {
  backgroundColor: '#ffffff',
};
const nodeTypes = { customnode: CustomNode };
export default  function DPLineage() {  
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  function onNodeClick(event, node){
    console.log(event,node.data)
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      fitView
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      style={rfStyle}
    >
      {/*<MiniMap />*/}
      {/*<Controls />*/}
      {/*<Background />*/}
    </ReactFlow>
  );
}
//--->