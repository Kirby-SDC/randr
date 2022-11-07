const db = require('../database/database')

exports.getReviews = (req, res) => {
  db.query(getReviewsQuery, [req.query.product_id, req.query.count, req.query.page]).then(result => {
      res.send(result.rows[0].reviews)
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
      for (characteristic in req.body.characteristics) {
        db.query(`INSERT INTO ratingschar (review_id, characteristics_id, value) values ($1, $2, $3)`,
         [data.rows[0].id, characteristic, req.body.characteristics.characteristic]).then(data => {
        }).catch(err => {
          console.log('error adding to ratingschar:', err)
        })
      }
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

// Query Stringsnpm run
// REMOVE THE CASTING FOR A.DATE AFTER RESEEDING THE DATABASE, IT WILL BE BIG INT BY DEFAULT
const getReviewsQuery = `select json_build_object(
  'product_id', cast($1 as integer),
  'page', cast($3 as integer),
  'count', cast($2 as integer),
  'results',
    (SELECT json_agg(reviews) FROM
    (SELECT a.id, a.rating, a.summary, a.recommend, a.response,
      a.body, TO_CHAR(TO_TIMESTAMP(a.date::bigint / 1000), 'YYYY-MM-DD"T"HH24:MI:SS"Z"'), a.reviewer_name, a.helpfulness, (select jsonb_agg(ph) FROM
      (SELECT url FROM photos WHERE review_id = a.id )ph ) AS photos
    FROM reviews AS a WHERE product_id = 4 AND reported = false LIMIT $2 offset(cast($3 as integer) *  cast($2 as integer) - $2) )
    reviews)
    ) as reviews `



const getMetaQuery = `SELECT
jsonb_build_object(
  'product_id'
, $1::integer
, 'ratings'
, (
    SELECT
      jsonb_object_agg(rating, count) details
    FROM
      (
        SELECT
          rating
        , count(rating)
        FROM
          reviews
        WHERE
          product_id = $1::integer
        GROUP BY
          rating
      ) t
  )
, 'recommended'
, (
    SELECT
      jsonb_object_agg(recommend, count) details
    FROM
      (
        SELECT
          recommend
        , count(recommend) count
        FROM
          reviews
        WHERE
          product_id = $1::integer
        GROUP BY
          recommend
      ) t
  )
, 'characteristics'
, (
    SELECT
      jsonb_object_agg(
        name
      , json_build_object(
          'id'
        , id
        , 'value'
        , avg
        )
      ) chars
    FROM
      (
        SELECT
          c.name
        , c.id
        , avg(cr.value)
        FROM
          characteristics c
        LEFT JOIN
          ratingschar cr
            ON c.id = cr.characteristics_id
        WHERE
          c.product_id = $1::integer
        GROUP BY
          c.id
      ) b
  )
);`