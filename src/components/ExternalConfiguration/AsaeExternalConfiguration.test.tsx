import React from 'react';
import { render, screen } from '@testing-library/react';
import { ExternalConfiguration } from './AsaeExternalConfiguration';


describe('When DataTable renders', () => {
  let rendered : HTMLElement | undefined = undefined 

  const setup = () => {

      const testData = [{
          properties: {
            resourceRequests : {
                instanceCount : '2 instances',
                cpu : '500m',
                memory : '1Gi',
            },
            provisioningState :'ProvisioningStateSucceeeded',
            instances : [
                {name: 'instance-0', status: 'Succeeded'},
                {name: 'instance-1', status: 'Succeeded'}
            ],
            settings : {
                gitProperty : {
                    repositories : [
                        {
                            name : 'application-configuration-service-1' ,
                            uri : 'https://github.com/account/config-repo',
                            label : 'main',
                            patterns : ['default' ,'azure' ,'gcp']
                        },
                        {
                            name : 'application-configuration-service-2' ,
                            uri : 'https://github.com/account/config-repo',
                            label : 'test',
                            patterns : ['default' ,'gcp']
                        },
                        {
                            name : 'application-configuration-service-3' ,
                            uri : 'https://github.com/account/config-repo',
                            label : 'dev-label',
                            patterns : ['default-pattern', 'gcp-pattern']
                        }
                    ]
                }
            }
          }
        }]

      const {baseElement} =  render(<ExternalConfiguration value={testData}/>)
      rendered = baseElement
  }
  beforeEach(()=>{
    setup()
  })
  it('should display a resource  information', async ()=>{
      expect(screen.getByText('2 instances')).toBeInTheDocument()
      expect(screen.getByText('500m')).toBeInTheDocument()
      expect(screen.getByText('1Gi')).toBeInTheDocument()
      expect(screen.getByText('ProvisioningStateSucceeeded')).toBeInTheDocument()
  })
  it('should display instances information', async() => {
      expect(screen.getByText('application-configuration-service-3')).toBeInTheDocument()
      expect(screen.getByText('dev-label')).toBeInTheDocument()
      expect(screen.getByText('default-pattern')).toBeInTheDocument()
      expect(screen.getByText('gcp-pattern')).toBeInTheDocument()
  })
  it('should display correct number of instances', async()=>{    
    expect(screen.getAllByText('https://github.com/account/config-repo').length).toBe(3)
  })
})
