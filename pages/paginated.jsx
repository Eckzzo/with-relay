import Link from 'next/link'
import { graphql, fetchQuery } from 'react-relay'

import { initializeRelay, finalizeRelay } from '../lib/relay'
import { SWStarship } from '../components/SWStarship'
import { SWStarshipConnection } from '../components/SWStarshipConnection'

export async function getStaticProps() {
  const environment = initializeRelay()


  const result = await fetchQuery(
    environment,
    graphql`
      query paginatedQuery($count: Int, $cursor: String) {
        ...SWStarshipConnection_allStarships @arguments(count: $count, cursor: $cursor)
      }
    `, { count: 5 }
  ).toPromise()

  // Helper function to hydrate the Relay cache client side on page load
  return finalizeRelay(environment, {
    props: {
      // Return the results directly so the component can render immediately
      allStarships: result
    },
    revalidate: 1,
  })
}

const Paginated = ({ allStarships }) => (
  <div>
    <Link href='/'>
      <a>Home</a>
    </Link>
    &nbsp;|&nbsp;
    <Link href="/films">
      <a>Films</a>
    </Link>
    &nbsp;|&nbsp;
    <strong>Paginated</strong>
    <h1>StarWars Starships</h1>
    <SWStarshipConnection allStarships={allStarships} />
  </div>
)

export default Paginated
