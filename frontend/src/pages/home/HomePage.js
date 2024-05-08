import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import PopularProfiles from '../profiles/PopularProfiles';
import styles from '../../styles/Home.module.css'
function Home() {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Redirect to the recipes page with the search term in the URL if the search field is not empty
    if (searchQuery.trim()) {
      history.push(`/recipes?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Container fluid className={styles.Container}>
      <Row className="justify-content-center my-4">
        <InputGroup className="mb-3" style={{ maxWidth: '600px' }}>
          <FormControl
            placeholder="Search Recipes"
            aria-label="Search Recipes"
            aria-describedby="basic-addon2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={handleSearch}>Search</Button>
          </InputGroup.Append>
        </InputGroup>
      </Row>
      <h2>Most Favorited Recipes</h2>
      <Row>



        <Col>Product1</Col>
        <Col>Product2</Col>
        <Col>Product3</Col>
        <Col>Product4</Col>
      </Row>


      <h2>Top Chefs</h2>

      <PopularProfiles card={true}></PopularProfiles>


      <Row>
        <h2>What's new</h2>
        <Col>Product1</Col>
        <Col>Product2</Col>
        <Col>Product3</Col>
        <Col>Product4</Col>
      </Row>
    </Container>
  );
}

export default Home;
