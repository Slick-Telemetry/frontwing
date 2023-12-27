// import { atom, useAtom } from 'jotai'

// // season
// // export const seasonAtom = atom('2023')

// const f1Years = (): string[] => {
//     // TODO : Bump to fetch call to get data

//     // ! Alter to be dynamic
//     const testingDate = new Date("02/22/2024")

//     const currDate = new Date();
//     let currYear = currDate.getFullYear();

//     // Compare to testing date (Feb 22 2024)
//     // If it's the same year and before testing date
//     if (testingDate.getFullYear() === currYear && currDate.getTime() < testingDate.getTime()) {
//         currYear -= 1;
//     }

//     const years = [];
//     for (var i = currYear; i >= 1950; i--) {
//         years.push(i.toString());
//     }
//     return years;
// }

// const createSeasonAtoms = () => {
//     const seasons = atom(f1Years())
//     const currSeason = atom((get) => get(seasons)[0])
//     const setSeason = atom(null, (get, set, update) => set(season, (c) => c + 1))
//     return [valueAtom, setAtom]
//   }
