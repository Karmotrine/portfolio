import type { NextPage } from 'next';
import { request, gql } from 'graphql-request'

const Home: NextPage = () => {
  const GET_POSTS = gql`
  query AllPages {
      allPage {
          slug {
              current
          }
      }
  }
`;
  request('https://9hh3q6ie.api.sanity.io/v1/graphql/production/default', GET_POSTS).then((data) => console.log(data))
  return (
    <>
    Home
    </>
  );
};

export default Home;