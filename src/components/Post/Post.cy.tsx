import PostComponent from "./Post";
import './Post.scss'
import { Post } from "../../types/interface";

// tests were performed after marking out all redux related lines

describe('<PostComponent />', () => {
    
    beforeEach(() => {
        cy.mount(<PostComponent post={mockPost1} />);
    });
    it('should invoke "active" class name after a user clicks like', () => {
        cy.get('.like-comment-buttons').first().click()
        cy.get('.like-comment-buttons-active')
    })
    it('should open comments section', () => {
        cy.get('.comments-section').should('not.exist')
        cy.get('.total-comments').click()
        cy.get('.comments-section').should('exist')
    })
    it('should open add comment form', () => {
        cy.get('.add-comment-post-textarea').should('not.exist')
        cy.get('button.like-comment-buttons',).eq(1).click()
        cy.get('.add-comment-post-textarea').should('exist')
    })
    it('should open post menu', () => {
        cy.get('.post-menu-ul').should('not.exist')
        cy.get('.post-options-menu-button').click()
        cy.get('.post-menu-ul').should('exist')
    })
 
})

const mockPost1: Post = {
    _id: 'mockPost1',
    userId: 'dummy.user@dummy.com',
    userName: 'dummy user',
    profileImg: '',
    dateAdded: new Date().toDateString(),
    text: 'this is a mock post',
    likes: 8,
    comments: [],
    images: [],
    didUserLike: false
}