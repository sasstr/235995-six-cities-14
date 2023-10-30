import { Card } from '../card/card';
// import { Offer } from '../../types/offer';
import { useParams } from 'react-router-dom';
import { OfferApi } from '../../mocks/offers-api';

interface CardListProps {
  offers: OfferApi[];
}

function CardList({offers}: CardListProps): JSX.Element {
  const {city} = useParams();
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.filter((item) => item.city.name === city)?.map((offer): JSX.Element => <Card key={offer.id} offer={offer} />)}
    </div>
  );
}

export { CardList };
