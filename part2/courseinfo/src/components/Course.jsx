import Note
 from "./Note"
const Course = ({ course }) => {
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
        </>
    )

}

export default Course