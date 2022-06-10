import { graphql, usePaginationFragment } from 'react-relay'
import { Fragment } from 'react'
import { SWStarship } from './SWStarship'

export const SWStarshipConnection = ({ allStarships }) => {
  const { data, loadNext, hasNext } = usePaginationFragment(graphql`
    fragment SWStarshipConnection_allStarships on Root
    @argumentDefinitions(count: { type: "Int", defaultValue: 5 }, cursor: { type: "String" })
     @refetchable(queryName: "SWStarshipConnection_query") {
      allStarships(first: $count, after: $cursor) 
      @connection(key: "SWStarshipConnection_allStarships", filters: []) {
        edges {
          node {
            id
            ...SWStarship_starship
          }
        }
      }
    }
  `, allStarships)

  return <Fragment>
    <ul>
    {data.allStarships.edges.map(({ node: starship }) => (
        // The `starship` prop gets read by Relay within the SWStarship
        // component to hydrate the data required by the fragment in that
        // component
        <SWStarship key={starship.id} starship={starship} />
      ))}
    </ul>
    <button disabled={!hasNext} onClick={() => loadNext(5)}>Load More</button>
  </Fragment>
}