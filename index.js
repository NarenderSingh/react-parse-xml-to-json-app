import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const xmlResponse = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap:Body>
    <GetRunningWorkflowTasksForListItemResponse xmlns="http://nintex.com">
      <GetRunningWorkflowTasksForListItemResult>
        <UserTask>
          <SharePointTaskId>9</SharePointTaskId>  
          <HumanWorkflowID>128</HumanWorkflowID>
          <AssignedTo>
            <OtherEmailAddress />
            <UserID>i:0#.w|bbynuat\03659u</UserID>
            <IsDomainGroup>false</IsDomainGroup>
            <IsSPGroup>false</IsSPGroup>
            <IsUser>false</IsUser>
          </AssignedTo>
          <Comments />
          <EntryTime>2020-06-25T11:16:26.507</EntryTime>
          <WorkflowName>New Workflow</WorkflowName>
          <WorkflowInstaceId>584d59fb-0abb-4c4f-aec3-87abc73985b7</WorkflowInstaceId>
          <TaskName>Workflow task</TaskName> 
          <TaskType>MultiOutcome</TaskType>
        </UserTask>
      </GetRunningWorkflowTasksForListItemResult>
    </GetRunningWorkflowTasksForListItemResponse>
  </soap:Body>
</soap:Envelope>`;

const CellRenderingTitle = (e) => {
  const [data, setData] = useState({
    href: "#",
    id: '',
    value: ""
  });

  const logic = () => {
    const value = <span className="my-css-class"> <a href={data.href} target="_blank">{data.value}</a></span>;
    return value
  }

  const content = (
    <div>{logic()}</div>
  );

  return content;
}

const App = () => {
    const [state, setState] = useState({
    columnDefs: [
      { headerName: "Make", field: "make" },
      { headerName: "Model", field: "model", cellRendererFramework: CellRenderingTitle },
      { headerName: "Price", field: "price" }],
    rowData: [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 }]
  });

  // Method 1
  const parseXml = () => {
    var parseString = require('xml2js').parseString;
    var xml = xmlResponse
    parseString(xml, { trim: false }, function (err, result) {
      const envelope = result["soap:Envelope"];

      const userTasks = envelope["soap:Body"][0].GetRunningWorkflowTasksForListItemResponse[0].GetRunningWorkflowTasksForListItemResult[0].UserTask;

      // check the console for the result
      console.log(userTasks);
    });
  }

  // Method 2
  const parseXml2 = () => {
    var XMLParser = require('react-xml-parser');
    var xml = new XMLParser().parseFromString(xmlResponse);

    // check the console for the result
    console.log(xml);
  }

  const content = (
    <React.Fragment>
      <div className="ag-theme-alpine" style={{ height: '400px', width: '800px' }}>
        {console.log('ag grid render....')}
        <AgGridReact
          columnDefs={state.columnDefs}
          rowData={state.rowData}>
        </AgGridReact>
      </div>
      <hr />
      <hr />
      <button type="button" className="btn btn-primary btn-sm ml-2" onClick={parseXml}>Parse XML using XML2JS</button>
      <button type="button" className="btn btn-warning btn-sm ml-2" onClick={parseXml2}>Parse XML using XML-PARSER</button>
    </React.Fragment>

  )

  return content;
}

render(<App />, document.getElementById('root'));