const db = require('../database/database')

exports.getReviews = (req, res) => {
  let resObj = {product_id: req.query.product_id, page: req.query.page, count: req.query.count}
  db.query(getReviewsQuery,[req.query.product_id, req.query.count, req.query.page]).then(result => {
      resObj.results = result.rows
      res.send(resObj)
  })
}

exports.addReview = (req, res) => {
  db.query(`INSERT INTO reviews (product_id, rating, summary, body, recommend, reviewer_name, reviewer_email, reported) values ($1, $2, $3, $4, $5, $6, $7, false) returning id`,
  [req.body.product_id, req.body.rating, req.body.summary, req.body.body, req.body.recommend, req.body.name, req.body.email]).then(data => {
      let reviewIdArray = Array(req.body.photos.length).fill(data.rows[0].id, 0)
      db.query(`INSERT INTO photos (review_id, url) SELECT UNNEST('{${reviewIdArray}}' :: INTEGER []), UNNEST('{${req.body.photos}}' :: TEXT [])`).then(data => {
      }).catch(err => {
        console.log('photo add error', err)
      })
      req.body.characteristics.map(char => {
        db.query(`INSERT INTO ratingschar (review_id, characteristics_id, value) values ($1, $2, $3)`, [data.rows[0].id, char.id, char.value]).then(data => {
        })
      })
  }).catch(err => {
    console.log('ERROR:', err)
  })
  res.status(200).send()
}

exports.getMetaData = (req, res) => {
  db.query(getMetaQuery, [req.query.product_id]).then(data => {
    res.send(data.rows)
  }).catch(err => {
    console.log('could not get meta:', err)
  })
}


exports.putHelpful = (req, res) => {
  db.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${req.params.review_id}`).then(data => {
    res.status(200).send()
  }).catch(err => {console.log('helpful not updated:', err)})
}

exports.putReport = (req, res) => {
  db.query(`UPDATE reviews SET reported = true WHERE id = ${req.params.review_id}`).then(data => {
    res.status(200).send()
  }).catch(err => {console.log('not reported:', err)})
}

// explain analyze for checking speeds
  // 'explain analyze <your query>'

// Query Strings
const getReviewsQuery = `SELECT * FROM
  (SELECT a.id, a.rating, a.summary, a.recommend, a.response,
    a.body, a.date, a.reviewer_name, a.helpfulness, (select jsonb_agg(ph) FROM
    (SELECT url FROM photos WHERE review_id = a.id )ph ) AS photos
  FROM reviews AS a WHERE product_id = $1 AND reported = false LIMIT $2 offset(cast($3 as integer) *  cast($2 as integer) - $2)
  ) reviews;`

const getMetaQuery = `SELECT jsonb_build_object
  (
    'product_id', cast($1 as integer),
    'ratings',
  (select jsonb_object_agg(rating, count) as details
  from (
  SELECT rating, COUNT(rating) FROM reviews WHERE product_id = 4 GROUP BY rating
  ) as t),
    'recommended',
      (select jsonb_object_agg(recommend, count) as details
      from (
      select recommend, count(recommend) as count
      from reviews where product_id = cast($1 as integer)
      group by recommend
      ) as t),
    'characteristics',
     (select jsonb_object_agg(name, json_build_object('id',the_id, 'rating',the_rating)) as chars
  from (select name, AVG(value) as the_rating, ratingschar.characteristics_id as the_id from
        ratingschar
  inner join characteristics
    on ratingschar.characteristics_id = characteristics.id
  where product_id = cast($1 as integer)
  GROUP BY name, ratingschar.id
      ) as b
     )
  ) `