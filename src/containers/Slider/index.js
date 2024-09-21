import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  // console.log("byDateDesc", byDateDesc);

  const nextCard = () => {
    setTimeout(() => {
      // Vérification de l'existence de byDateDesc car il est undefined lors du premier rendu
      if (byDateDesc) {
        // Récupération de l'index du dernier élément du tableau pour l'utilisation dans la ternaire du setIndex
        const lastIndex = byDateDesc.length - 1;
        // Utilisation de lastIndex à la place de byDateDesc.length pour éviter l'affichage d'une slide blanche..
        // ..lorsque l'on essai d'acceder à un index qui n'existe pas (index 3)
        setIndex(index < lastIndex ? index + 1 : 0);
      }
    }, 5000);
  };

  // console.log("nextCard", index);

  useEffect(() => {
    nextCard();
  }, [index, byDateDesc]);
  // Ajout de l'index et de byDateDesc dans les dépendances du useEffect pour garantir que la fonction nextCard est appelée chaque fois que l'index ou les données changent.
  // Cela permet de s'assurer que l'image affichée et la pagination sont mises à jour correctement.

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Ajout de la clé à l'élément parent pour éviter la duplication des clés
        <div key={event.id}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {/* // Ajout de l'element dans le map afin de pouvoir accéder à l'id de l'event pour éviter la duplication des keys */}
              {byDateDesc.map((radioEvent, radioIdx) => (
                <input
                  // Utilisation de radioEvent.id pour définir la key à la place de event.id
                  // Une propriété id a aussi été ajouté à l'event dans le fichier events.json, dans la propriété focus
                  key={`${radioEvent.id}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // Ajout de la condition pour cocher le bouton radio correspondant à l'index actuel
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
