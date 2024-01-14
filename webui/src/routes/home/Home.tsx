/**
 * Home Page Component
 *
 * Description:
 * This component serves as the main page that users see after logging into the application. It features a
 * search bar (imported from the 'leafy' library) that allows users to search for cards. Below the search
 * bar, the component renders a collection of cards for all the services provided by CenSoS team.
 *
 * The Home component is associated with a specific route, allowing users to navigate directly to this
 * page after a successful login.
 *
 * Components Used:
 * - SearchBar from the 'leafy' library: Renders a search bar at the top of the page.
 * - CardComponent: Used to render individual cards for each item.
 *
 * Author:
 *  - Ayaz Shah (ayaz.shah@mongodb.com)
 */

import "../home/Home.css";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { H1 } from "@leafygreen-ui/typography";
import Layout from "../../components/Layout/Layout";
import { SearchInput, SearchResult } from "@leafygreen-ui/search-input";
import Cards from "../../components/Cards/Cards";
import cardData from "../../utils/homePageData.json";
import { RadioBox, RadioBoxGroup } from "@leafygreen-ui/radio-box-group";
import { useNavigate } from "react-router-dom";




interface CardData {
  title: string;
  text: string;
  img: string;
  salesSegment: string[];
  cardLink: string;
  leadTime: string;
}

interface SearchResults {
  title: string;
}

export const HomeComponent = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [selectedOption, setSelectedOption] = useState("All");
  const [cardSearchValue, setCardSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const filteredCards = cardData.filter((card) =>
      card.salesSegment.includes(selectedOption)
    );
    setCards(filteredCards);
  }, [selectedOption]);

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const onSearchEvent = (event: any) => {
    const searchQuery = event.target.value;
    console.log(searchQuery);
    setCardSearchValue(searchQuery);

    const filteredResults = cards.filter((result: SearchResults) =>
      result.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  return (
    <Layout>
      <div>
        <Row className="hero-image">
          <Col>
            <div className="hero-items">
              <H1 className="hero-text">South East SAs Intake Form</H1>
              <SearchInput
                className="searchInputStyle"
                size="large"
                value={cardSearchValue}
                onChange={(event) => onSearchEvent(event)}
                aria-label="some label"
              >
                {searchResults.map((query: any, index) => {
                  return (
                    <SearchResult
                      onClick={() => {
                        navigate(`/form/${query.cardLink}`);
                      }}
                      key={index}
                    >
                      {query.title}
                    </SearchResult>
                  );
                })}
              </SearchInput>
              <p className="radio-box-text">
                Filter offerings based upon your role...
              </p>
              <RadioBoxGroup
                onChange={handleChange}
                className="radio-box-group-default radioButtons"
                size="compact"
                value={selectedOption}
              >
                <RadioBox className="radio-button" value="Growth">
                  Growth
                </RadioBox>
                <RadioBox className="radio-button" value="Acquisition">
                  Acquisition
                </RadioBox>
                <RadioBox className="radio-button" value="PLS">
                  PLS
                </RadioBox>
                <RadioBox className="radio-button" value="CSMs">
                  CSMs
                </RadioBox>
                <RadioBox className="radio-button" value="Marketing">
                  Marketing
                </RadioBox>
                <RadioBox className="radio-button" value="Partners">
                  Partners
                </RadioBox>
                <RadioBox className="radio-button" value="All">
                  All
                </RadioBox>
              </RadioBoxGroup>
            </div>
          </Col>
        </Row>
        <div className="p-3">
          <Row className="g-2 mt-2">
            <Cards cardData={cards} />
          </Row>
        </div>
      </div>
    </Layout>
  );
};
