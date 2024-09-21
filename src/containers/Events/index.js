import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrage des événements par type
  const filteredByType = (data?.events || []).filter(
    (event) => !type || event.type === type
  );

  // J'ai séparé la pagination de la liste filtrée
  // Cela permet de ne pas paginer les événements à chaque changement de type
  const paginatedEvents = filteredByType.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  // Utilisation de Math.ceil plutôt que de Math.floor pour arrondir à l'entier supérieur et ne pas perdre d'événements
  // Dans ce cas, on perdait le dernier événement de la liste et il n'y avait pas de pagination
  const pageNumber = Math.ceil(filteredByType.length / PER_PAGE);
  const typeList = new Set(data?.events.map((event) => event.type));

  // Pour vérifier que les événements sont bien filtrés
  // console.log("filteredByType", filteredByType);

  // Pour vérifier que les événements sont bien paginés
  // console.log("paginatedEvents", paginatedEvents);

  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => changeType(value)} // Simplification de la fonction onChange
          />
          <div id="events" className="ListContainer">
            {paginatedEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
