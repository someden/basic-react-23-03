import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('react-addons-css-transition-group', () => ({children}) => children)