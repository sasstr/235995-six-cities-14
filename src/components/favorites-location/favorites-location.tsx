import { OfferApi } from '../../mocks/offers-api';
import { FavoritesCard } from '../favorites-card/favorites-card';

interface FavoritesLocationProps {
  favoriteOffers: OfferApi[];
}

function FavoritesLocation({favoriteOffers}: FavoritesLocationProps) {
  const uniqueCitiesNames: string[] = [...new Set(favoriteOffers?.map((favoriteOffer: OfferApi): string => favoriteOffer.city.name))];
  return (
    uniqueCitiesNames.map((cityName: string) => (
      <li key={ cityName } className="favorites__locations-items">
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>{cityName ? cityName : ''}</span>
            </a>
          </div>
        </div>
        <div className="favorites__places">
          {favoriteOffers?.filter((it) => it.city.name === cityName)?.map((offer)=> <FavoritesCard key={offer.id} offer={offer}/>)}
        </div>
      </li>)
    )
  );
}

export {FavoritesLocation};
