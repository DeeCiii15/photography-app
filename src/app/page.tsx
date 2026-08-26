import HomePage from './HomePage';
import ReviewsJsonLd from './components/ReviewsJsonLd';
import { TESTIMONIALS } from '@/lib/testimonialsData';

export default function Home() {
  return (
    <>
      <ReviewsJsonLd testimonials={TESTIMONIALS} />
      <HomePage />
    </>
  );
}
