import axios from "axios";

const gqlQuery = `query GetAxieLatest(
        $auctionType: AuctionType
        $criteria: AxieSearchCriteria
        $from: Int
        $sort: SortBy
        $size: Int
        $owner: String
      ) {
        axies(
          auctionType: $auctionType
          criteria: $criteria
          from: $from
          sort: $sort
          size: $size
          owner: $owner
        ) {
          total
          results {
            ...AxieRowData
            __typename
          }
          __typename
        }
      }
      
      fragment AxieRowData on Axie {
        id
        image
        class
        name
        genes
        owner
        stage
        title
        breedCount
        level
        parts {
          ...AxiePart
          __typename
        }
        stats {
          ...AxieStats
          __typename
        }
        auction {
          ...AxieAuction
          __typename
        }
        __typename
      }
      
      fragment AxiePart on AxiePart {
        id
        name
        class
        type
        specialGenes
        stage
        abilities {
          ...AxieCardAbility
          __typename
        }
        __typename
      }
      
      fragment AxieCardAbility on AxieCardAbility {
        id
        name
        attack
        defense
        energy
        description
        backgroundUrl
        effectIconUrl
        __typename
      }
      
      fragment AxieStats on AxieStats {
        hp
        speed
        skill
        morale
        __typename
      }
      
      fragment AxieAuction on Auction {
        startingPrice
        endingPrice
        startingTimestamp
        endingTimestamp
        duration
        timeLeft
        currentPrice
        currentPriceUSD
        suggestedPrice
        seller
        listingIndex
        state
        __typename
      }
      `;

export const fetchAxies = async (
  page,
  size,
  pagesAtOnce,
  advancedEnabled,
  sort,
  classes,
  numMystic,
  pureness,
  hp,
  skill,
  speed,
  morale,
  breedCount,
  parts
) => {
  try {
    const { data } = await axios.post(
      "https://graphql-gateway.axieinfinity.com/graphql",
      {
        operationName: "GetAxieLatest",
        variables: {
          from: (page - 1) * (size * (advancedEnabled ? pagesAtOnce : 1)),
          size: size * (advancedEnabled ? pagesAtOnce : 1),
          sort,
          auctionType: "Sale",
          criteria: {
            classes,
            numMystic,
            pureness,
            hp: [hp, 61],
            skill: [skill, 61],
            speed: [speed, 61],
            morale: [morale, 61],
            breedCount: [0, 1, 2, 3, 4, 5, 6, 7],
            parts,
          },
        },
        query: gqlQuery,
      }
    );
    return { data: data.data.axies, error: false };
  } catch (error) {
    return { data: [], error: true };
  }
};
