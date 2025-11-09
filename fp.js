// refer: https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84 
let animals = [
    { name: 'subbi', species: 'cat', days: 143},
    { name: 'simba', species: 'cat', days: 150},
    { name: 'chinnu', species: 'dog', days: 27}
]

console.log('animals', animals);


let isCat = (animal) => {
    return animal.species === 'cat'
}

let cats = animals.filter(isCat)
console.log('filter: cats', cats);

let animalNames = animals.map(animal => animal.name)
console.log('map: animals names', animalNames)

let totalDays = animals.reduce(function(asum, animal) {
    // console.log("asum", asum, "animal.days", animal.days);
    return asum + animal.days
}, 0)
console.log('reduce: animal days', totalDays)

