import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

function RecipeCard({ photo, name, index, redirect, redirect2, name2, photo2, index2 }) {
  return (
    <div className="row">
      <div className="col-sm-6">
        <Card>
          <img
            src={ photo }
            className="card-img-top"
            alt={ name }
          />
          <div
            className="card-body"
            data-testid={ `${index}-recommendation-card` }
          >
            <h5
              className="card-title"
              data-testid={ `${index}-recommendation-title` }
            >
              {name}
            </h5>
            <Button onClick={ redirect }>Ver detalhes</Button>
          </div>
        </Card>
      </div>
      <div className="col-sm-6">
        <Card>
          <img
            src={ photo2 }
            className="card-img-top"
            alt={ name2 }
          />
          <div
            className="card-body"
            data-testid={ `${index2}-recommendation-card` }
          >
            <h5
              className="card-title"
              data-testid={ `${index2}-recommendation-title` }
            >
              {name2}
            </h5>
            <Button onClick={ redirect2 }>Ver detalhes</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

RecipeCard.propTypes = {
  redirect: PropTypes.func.isRequired,
  redirect2: PropTypes.func.isRequired,
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  photo2: PropTypes.string.isRequired,
  name2: PropTypes.string.isRequired,
  index2: PropTypes.number.isRequired,
};

export default RecipeCard;
