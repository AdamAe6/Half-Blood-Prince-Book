import axios from "axios"
import { useEffect, useState } from "react";

//CONST 
const difficultyOptions = ["Difficulty", "Unknown", "Advanced", "Moderate", "Beginner", "OrdinaryWizardingLevel", "OneOfAKind"]
const classNameForInput = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

// TYPE 
type ElixirDifficultystring = "Difficulty" | "Unknown" | "Advanced" | "Moderate" | "Beginner" | "OrdinaryWizardingLevel" | "OneOfAKind"
type Ingredients = [{ id: string, name: string }]
type Inventors = [{ id: string, firstName: string, lastName: string }]

type Elixirs =
  {
    id: string
    name: string
    effect: string
    sideEffects: string
    characteristics: string
    time: string
    difficulty: ElixirDifficultystring
    ingredients: Ingredients
    inventors: Inventors
    manufacturer?: string
  }

export function Elixirs() {

  const [elixirs, setElixirs] = useState<Elixirs[]>([])
  const [nameToSearch, setNameToSearch] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [inventorFullName, setInventorFullName] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [isOpenAccio, setIsOpenAccio] = useState(false)
  const [showPotionInformations, setShowPotionInformations] = useState('')


  useEffect(() => {
    axios.get(`https://wizard-world-api.herokuapp.com/Elixirs/?name=${nameToSearch}&difficulty=${difficulty}&ingredient=${ingredient}&InventorFullName=${inventorFullName}&Manufacturer=${manufacturer}`)
      .then(function (response) {
        setElixirs(response.data);
      })
      .catch(function (error) {
        console.error('Une erreur s\'est produite lors de la requête:', error);
      })
      .finally(function () {
      })
  }, [nameToSearch, difficulty, ingredient, inventorFullName, manufacturer]);

  return (
    <div className="text-white bg-black min-h-screen ">
      {/* HEADER */}
      <div className="space-y-4">
        <div className="flex items-center justify-center h-full">
          <h1 className="text-4xl font-bold"><button onClick={() => setIsOpenAccio(!isOpenAccio)}>AccioSearchBar</button></h1>
        </div>
        {isOpenAccio ?
          <div className="flex flex-wrap justify-center space-x-5 text-center">
            <input placeholder='Search your potion' className={classNameForInput} type="text" onChange={(e) => setNameToSearch(capitalizeFirstLetter(e.target.value))} />
            <select id="difficulty" name="difficulty" className={classNameForInput} value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              {difficultyOptions.map((option) => (
                <option key={option} value={option === 'Difficulty' ? '' : option}>
                  {option}
                </option>
              ))}
            </select>
            <input placeholder='Search your ingredient' className={classNameForInput} type="text" onChange={(e) => setIngredient(capitalizeFirstLetter(e.target.value))} />
            <input placeholder='Search your creator' className={classNameForInput} type="text" onChange={(e) => setInventorFullName(capitalizeFirstLetter(e.target.value))} />
            <input placeholder='Search your manufacturer' className={classNameForInput} type="text" onChange={(e) => setManufacturer(capitalizeFirstLetter(e.target.value))} />
          </div>
          :
          null
        }
      </div>
      {/* CARDS POTIONS */}
      <div className="flex flex-wrap justify-center mt-4 " >
        {elixirs.map((elixir, index) => (
          <div
            onMouseLeave={() => setShowPotionInformations('')}
            onMouseEnter={() => setShowPotionInformations(elixir.name)}
            key={index}
            className={`lg:w-1/5 border-solid border-2 border-white my-4 mx-4 p-4 bg-white rounded-md shadow-md hover:border-black relative `}
            style={{
              backgroundImage: `url(https://www.super-insolite.com/wp-content/uploads/2018/12/lampe-harry-potter-polynectar-9.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {showPotionInformations === elixir.name ? (
              <div className="absolute top-0 left-0 w-full h-full bg-purple-800 opacity-95 rounded-md p-4">

                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center">
                    <span className="text-white mr-2">Ingrédients:</span>
                    <ul className="list-disc pl-4">
                      {elixir.ingredients.map((ingredient, index) => (
                        <li key={index} className="text-white">{ingredient ? ingredient.name : '???'}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center mt-4">
                    <span className="text-white mr-2">Inventeurs:</span>
                    <ul className="list-disc pl-4">
                      {elixir.inventors.map((inventor, index) => (
                        <li key={index} className="text-white">
                          {inventor ? `by ${inventor.firstName} ${inventor.lastName}` : 'by Unknown'}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : null}


            <h5 className="text-xl font-bold mb-2">{elixir.name}</h5>
            <p className="text-sm mb-2"><strong>Effect:</strong> {elixir.effect}</p>
            <p className="text-sm mb-2"><strong>Side Effect:</strong> {elixir.sideEffects ? elixir.sideEffects : '???'}</p>
            <p className="text-sm mb-2"><strong>features:</strong> {elixir.characteristics ? elixir.characteristics : '???'}</p>
            <p className="text-sm mb-2"><strong>Preparation time:</strong> {elixir.time ? elixir.time : '???'}</p>
            <p className="text-sm mb-2"><strong>Difficulty:</strong> {elixir.difficulty}</p>
            <p className="text-sm mb-2"><strong>Manufacturer:</strong> {elixir.manufacturer ? elixir.manufacturer : '???'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}



//FUNCTION
function capitalizeFirstLetter(content: string) {
  return content.charAt(0).toUpperCase() + content.slice(1);
}