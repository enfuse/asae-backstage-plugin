import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { withAzureClient } from './withAzureClient';


jest.mock('../../utils/asae-utils')
describe('When withAzureClient renders', ()=>{
    afterEach(cleanup)
    describe('when callback has not been resolved', ()=>{
        beforeEach(()=>{
            const MockComponent =()=> <p> Mock Content</p>
            const ErrorMock = () => <p>Mock error</p>
            const mockCallbackwithError = ()=>{return {value:{}, error:false, loading:true}}
            const Target = withAzureClient(MockComponent,ErrorMock,mockCallbackwithError )
            render(<Target/>)
            
        })
        it('should not show error component', ()=>{
            expect(screen.queryByText(/Mock Error/i)).not.toBeInTheDocument() 
        })
        it('should not display wrapped component', ()=>{
            expect(screen.queryByText(/Mock Content/i)).not.toBeInTheDocument()
        })
    })
    describe('when callback retrieves data', ()=>{
        beforeEach(()=>{
            const MockComponent =()=> <p> Mock Content</p>
            const ErrorMock = () => <p>Mock error</p>
            const mockCallback = ()=>{return {value:{}, error:false, loading:false}}
            const Target = withAzureClient(MockComponent,ErrorMock,mockCallback )
            render(<Target/>)
        })
    
        it('should display wrrapped component', async ()=> {
            expect(screen.queryByText('Mock Content')).toBeInTheDocument()
        })
        it('should not display error component', async ()=> {
            expect(screen.queryByText('Mock Error')).not.toBeInTheDocument() 
        })
        
    })
    describe('when callback errors out', ()=>{
        beforeEach(()=>{
            const MockComponent =()=> <p> Mock Content</p>
            const ErrorMock = () => <p>Mock error</p>
            const mockCallbackwithError = ()=>{return {value:{}, error:true, loading:false}}
            const Target = withAzureClient(MockComponent,ErrorMock,mockCallbackwithError )
            render(<Target/>)
            
        })
        it('should show error component', ()=>{
            expect(screen.queryByText(/Mock Error/i)).toBeInTheDocument() 
        })
        it('should not display wrapped component', ()=>{
            expect(screen.queryByText(/Mock Content/i)).not.toBeInTheDocument()
        })
    })

    
})
