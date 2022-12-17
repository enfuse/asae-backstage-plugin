import React from 'react';
import { render, screen } from '@testing-library/react';
import { AsaeAppsList } from './AsaeAppList';
import userEvent from '@testing-library/user-event'
describe('When DataTable renders', () => {
  let rendered : HTMLElement | undefined = undefined 

  const setup = () => {

      const testData = [{
        appName: 'candidate-service-dev',
        provisioningState: 'Successful',
        location: 'us-west2',
        identity: {tenantId: 'tenantId-test-1', clientId: 'clientId-test-1'},
        id: 1
      },{
        appName: 'candidate-portal-dev',
        provisioningState: 'Pending',
        location: 'us-east1',
        identity: {tenantId: '', clientId: ''},
        id: 2
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
      // expect(screen.getAllByRole('columnheader')[0]).toBe('test')
  })
  it('display table with data', async()=>{    
      expect(screen.getByRole('cell', {name:"candidate-service-dev"})).toBeInTheDocument()
      expect(screen.getByRole('cell', {name:"candidate-portal-dev"})).toBeInTheDocument()
      expect(screen.getByRole('cell', {name:"Successful"})).toBeInTheDocument()
      expect(screen.getByRole('cell', {name:"Pending"})).toBeInTheDocument()
      expect(screen.getByRole('cell', {name:"us-west2"})).toBeInTheDocument()
      expect(screen.getByRole('cell', {name:"us-east1"})).toBeInTheDocument()
  })
  it ('should display Identity information', ()=>{
    // TODO figure out how to test
    // fireEvent.click(screen.getAllByRole('row')[1])
    userEvent.click(screen.getAllByRole('row')[1])
    console.log(screen.getAllByRole('row')[1].outerHTML)
    console.log(screen.debug())

    expect(screen.getByRole('identity-data')).toBeInTheDocument()
  })

})
