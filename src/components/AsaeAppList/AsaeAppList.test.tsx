import React from 'react';
import { render, screen } from '@testing-library/react';
import {queryByTestId} from '@testing-library/dom'
import { AsaeAppsList,asaeAppListCallback } from './AsaeAppList';

describe('When DataTable renders', () => {
  let rendered : HTMLElement | undefined = undefined 

  const setup = () => {

      const testData = [{
        appName: 'item.appname-1',
        provisioningState: 'item.provisioningState-1',
        location: 'item.location-1',
        identity: {tenantId: 'tenantId-test-1', clientId: "clientId-test-1"}
      },{
        appName: 'item.appname-2',
        provisioningState: 'item.provisioningState-2',
        location: 'item.location-2',
        identity: {tenantId: 'tenantId-test-2', clientId: "clientId-test-2"}
        },
      ]

      const {baseElement} =  render(<AsaeAppsList value={testData}/>)
      rendered = baseElement
  }
  beforeEach(()=>{
    setup()
  })

  it('should display 3 column headers', async() => {
      expect(screen.getAllByRole('columnheader').length).toBe(3)
  })
  it('display table with data', async()=>{    
      expect(screen.getByRole('cell', {name:"item.appname-1"})).toBeInTheDocument()
      expect(screen.getByRole('cell', {name:"item.appname-2"})).toBeInTheDocument()
      expect(screen.getByRole('cell', {name:"item.provisioningState-1"})).toBeInTheDocument()
      expect(screen.getByRole('cell', {name:"item.provisioningState-2"})).toBeInTheDocument()
      expect(screen.getByRole('cell', {name:"item.location-1"})).toBeInTheDocument()
      expect(screen.getByRole('cell', {name:"item.location-2"})).toBeInTheDocument()
  })
  it('should match previous snapshot', async() => {
    expect(rendered).toMatchSnapshot();
})
})
