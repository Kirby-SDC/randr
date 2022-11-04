const db = require('../database/database')

exports.getReviews = (req, res) => {
  console.log('connected')
  console.log(req.query)
  let resObj = {product_id: req.query.product_id, page: req.query.page, count: req.query.count}
  db.query(`select * from (
    select a.id, a.rating, a.summary, a.recommend, a.response,
      a.body, a.date, a.reviewer_name, a.helpfulness, (select json_agg(ph) from
      (select url from photos where review_id = a.id )ph ) as photos
    from reviews as a where product_id = $1 limit $2 offset(cast($3 as integer) *  cast($2 as integer) - $2) ) r;`,
    [req.query.product_id, req.query.count, req.query.page]).then(result => {
      resObj.results = result.rows
      res.send(resObj)
  })
}

exports.getMetaData = (req, res) => {

}

exports.postReviews = (req, res) => {

}

exports.putHelpful = (req, res) => {

}

exports.putReport = (req, res) => {

}