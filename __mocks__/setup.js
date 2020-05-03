//fixes regeneratorRuntime errors in jest
import '@babel/polyfill'
import 'babel-jest'

//sets up alert functionality for jest
jest.spyOn(window, 'alert').mockImplementation((e) => {
    console.log(e)
})