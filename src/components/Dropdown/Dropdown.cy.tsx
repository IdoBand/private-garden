import { ReactNode } from "react";
import Dropdown from "./Dropdown";
import './Dropdown.scss'
import { mount } from 'cypress/react'
import { MemoryRouter, Route } from 'react-router-dom'

Cypress.Commands.add('mount', (component: ReactNode, options = {}) => {
    const wrapped = <MemoryRouter initialEntries={['/']}>
            {component}
        </MemoryRouter>
  
    return mount(wrapped)
  });
const mockDropdownData = [
    {
        to: '/www',
        title:'title 1',
    },
    {
        to: '/www',
        title:'title 2',
    },
    {
        to: '/www',
        title:'title 3',
    },
]

describe('<Dropdown />', () => {
    beforeEach(() => {
        cy.mount(<Dropdown
                    title="Dropdown"
                    links={mockDropdownData}
                     />)
    })
    it('ul should only be rendered when .dropdown-container is hovered', () => {
        cy.get('.dropdown-ul-container').should('not.exist')
        cy.get('.dropdown-container').trigger('mouseover')
        cy.get('.dropdown-ul-container').should('exist')
        cy.get('.dropdown-container').trigger('mouseout')
        cy.get('.dropdown-ul-container').should('not.exist')
    }),
    it('ul should be removed from the DOM upon clicking a link', () => {
        cy.get('.dropdown-ul-container').should('not.exist')
        cy.get('.dropdown-container').trigger('mouseover')
        cy.get('.dropdown-ul-container').should('exist')
        cy.get('.dropdown-li').first().click()
        cy.get('.dropdown-ul-container').should('not.exist')
    })
   
})