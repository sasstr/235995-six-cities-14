import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Logo } from '../../components/logo/logo';
import { FavoritesLocation } from '../../components/favorites-location/favorites-location';
import { UserNavigation } from '../../components/user-navigation/user-navigation';
import { OfferApi } from '../../types/offer.ts';
import { FavoritesEmpty } from '../../components/favorites-empty/favorites-empty.tsx';
import { useAppSelector } from '../../hooks/store.ts';

function FavoritesPage(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const offers = useAppSelector((state) => state.offers.offers);
  const favoriteOffers: OfferApi[] = offers.filter((offer: OfferApi): boolean => offer.isFavorite);
  return (
    <div className={favoriteOffers.length ? 'page' : 'page page--favorites-empty'}>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <UserNavigation authorizationStatus={authorizationStatus} />
          </div>
        </div>
      </header>
      {favoriteOffers.length ?
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                <FavoritesLocation favoriteOffers={favoriteOffers} />
              </ul>
            </section>
          </div>
        </main>
        :
        <FavoritesEmpty/>}
      <footer className="footer container">
        <Link className="footer__logo-link" to={'../'}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export { FavoritesPage };
