import { useState } from "react";

const ObjectsInState = () => {

  // Initializing state through a object
  const [person, setPerson] = useState({
    name: "Ashutosh Kumar",
    profession: "Software Engineer",
    serviceID: 10900119039,
    age: 24,
    city: "Kolkata",
  });

  const handleAgeIncrease = () => {
    //person.age++;                // Object Mutation [Avoid using it]
    person.age = person.age + 1; 
    const newPerson = {...person};
    console.log(person.age); // or console.log(newPerson.age)

    setPerson(newPerson);
    // Here, a new object gets created with increased age and gets rendered on screen rather than updating same person's age everytime.
  }

  return (
    <> 
      <h1> {person.name} </h1>
      <h2> {person.profession} </h2>
      <h3> {person.serviceID} </h3>
      <h4> {person.city} </h4>
      <h5> {person.age} </h5>
      <button onClick={handleAgeIncrease}> Age [+] </button>
    </>
  )
}

export default ObjectsInState;