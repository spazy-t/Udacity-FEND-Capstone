import { daysToGo } from './../src/client/js/app'

describe('days to go function', () => {
    test('returns a number when a date format string is entered', () => {
        let textDateInput = false
        let date = '2020-06-12'

        expect(typeof daysToGo(date)).toBe('number')
    })
})

describe('days to go function', () => {
    test('returns a number when a user date string is entered', () => {
        let textDateInput = true
        let date = '12/06/2020'

        expect(typeof daysToGo(date)).toBe('number')
    })
})