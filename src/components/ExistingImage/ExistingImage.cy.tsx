import ExistingImage from "./ExistingImage";
import mockImage1 from '/checked.png'

const onClickMock = () => {

}

describe('<ExistingImage />', () => {
    beforeEach(() => {
        cy.mount(<ExistingImage
                    src={mockImage1}
                    onClick={onClickMock}
                    imgClassName=""
                    handleImageDelete={() => {return}}
                    idx={0} />)
    })
    it('should render the component with the provided image source', () => {
        cy.get('img').should('have.attr', 'src', mockImage1)
    }),
    it('should fade out when delete icon is clicked', () => {
        cy.get('.existing-image-x-span').click()
        cy.get('.existing-image-container').should('have.class', 'fade-out')
    })
})