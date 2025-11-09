import Note from "./Note"
const Course = ({ course }) => {
    const totalExercises = () => {
        const total = course.parts.reduce(function(esum, part) {
            return esum + part.exercises
        }, 0)

        return total
    }
    
    return (
        <>
        <h1> {course.name} </h1>
        <ul>
            { course.parts.map(part => {
                return (
                    // <li> {part.name} </li> // need key prop
                    <Note key={part.id} part={part} />
                )
            }) }
        </ul>

        <p> Total of {totalExercises()} exercises</p>
        </>
    )

}

export default Course