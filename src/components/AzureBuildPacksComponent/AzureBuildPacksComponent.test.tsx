import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import { AzureBuildPacksComponent } from './AzureBuildPacksComponent';
// import { rest } from 'msw';

describe('When DataTable renders', () => {
  let rendered : HTMLElement | undefined = undefined 

  const setup = () => {

      const testData = [{
          buildpack: 'item.buildpack',
          builder: 'item.builder',
          languages: 'item.languages'
        },{
          buildpack: 'item.buildpack2',
          builder: 'item.builder2',
          languages: 'item.languages2'
        }]

      const {baseElement} =  render(<AzureBuildPacksComponent value={testData}/>)
      rendered = baseElement
  }
  beforeEach(()=>{
    setup()
  })
  it('should match previous snapshot', async() => {
     
      expect(rendered).toMatchSnapshot();
  })
  it('should display a heading', async ()=>{
      expect(screen.getByRole('heading')).toBeInTheDocument()
  })
  it('should display 3 columns', async() => {
      expect(screen.getAllByRole('columnheader').length).toBe(3)
  })
  it('display table with data', async()=>{    
      expect(screen.getByRole('cell', {name:"item.buildpacks"})).toBeInTheDocument()
      expect(screen.getByRole('cell', {name:"item.buildpack2"})).toBeInTheDocument()
      expect(screen.getByRole('cell', {name:"item.builder"})).toBeInTheDocument()
      expect(screen.getByRole('cell', {name:"item.builder2"})).toBeInTheDocument()
      expect(screen.getByRole('cell', {name:"item.languages"})).toBeInTheDocument()
      expect(screen.getByRole('cell', {name:"item.languages"})).toBeInTheDocument()
  })
})
