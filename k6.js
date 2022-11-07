import http from 'k6/http';
import { sleep, check, group } from 'k6';

export const options = {
  vus: 50, // Virtual Users
  duration: '10s'
};

var route = 'http://localhost:3000/reviews'

const postData = JSON.stringify({
  product_id: 2,
  rating: 2,
  summary: "hellow there",
  body: "testing postman insert",
  recommend: true,
  name: "postman with photos bb",
  email: "postman@gmail.com",
  photos: ["https://images.unsplash.com/photo-1560570803-7474c0f9af99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"],
  characteristics: {"2": 2, "4": 3}
})

const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const getReviews = `${route}/?product_id=${Math.floor(Math.random() * 10000) + 1}&?page=1&?count=${Math.floor(Math.random() * 100) + 5}`;
const getMetaData = `${route}/meta/?product_id=${Math.floor(Math.random() * 10000) + 1}`
const putHelpful = `${route}/${Math.floor(Math.random() * 100000) + 1}/helpful`
const putReport = `${route}/${Math.floor(Math.random() * 100000) + 1}/report`
const addReview = `${route}/`
// const getMetaData = `${route}/meta/?product_id=${Math.floor(Math.random() * 10000) + 1}`;
// const styles = `${route}/${Math.floor(Math.random() * 1000000) + 1}/styles`;
// const related = `${route}/${Math.floor(Math.random() * 1000000) + 1}/related`;

export default function test() {

  group('getReviews', () => {
    const getReviewResponse = http.get(getReviews);
    check(getReviewResponse, {
      'transaction time < 10ms': (r) => r.timings.duration < 10,
      'transaction time < 50ms': (r) => r.timings.duration < 50,
      'transaction time < 200ms': (r) => r.timings.duration < 200,
      'transaction time < 500ms': (r) => r.timings.duration < 500,
      'transaction time < 1000ms': (r) => r.timings.duration < 1000,
      'transaction time < 2000ms': (r) => r.timings.duration < 2000,
      'transaction time < 5000ms': (r) => r.timings.duration < 5000,
      'transaction time < 10s': (r) => r.timings.duration < 10000,
      'transaction time < 20s': (r) => r.timings.duration < 20000,
    });
  });
  group('getMetaData', () => {
    const getMetaResponse = http.get(getMetaData);
    check(getMetaResponse, {
      'transaction time < 10ms': (r) => r.timings.duration < 10,
      'transaction time < 50ms': (r) => r.timings.duration < 50,
      'transaction time < 200ms': (r) => r.timings.duration < 200,
      'transaction time < 500ms': (r) => r.timings.duration < 500,
      'transaction time < 1000ms': (r) => r.timings.duration < 1000,
      'transaction time < 2000ms': (r) => r.timings.duration < 2000,
      'transaction time < 5000ms': (r) => r.timings.duration < 5000,
      'transaction time < 10s': (r) => r.timings.duration < 10000,
      'transaction time < 20s': (r) => r.timings.duration < 20000,
    });
  });
  // group('putHelpful', () => {
  //   const putHelpfulResponse = http.put(putHelpful);
  //   check(putHelpfulResponse, {
  //     'transaction time < 10ms': (r) => r.timings.duration < 10,
  //     'transaction time < 50ms': (r) => r.timings.duration < 50,
  //     'transaction time < 200ms': (r) => r.timings.duration < 200,
  //     'transaction time < 500ms': (r) => r.timings.duration < 500,
  //     'transaction time < 1000ms': (r) => r.timings.duration < 1000,
  //     'transaction time < 2000ms': (r) => r.timings.duration < 2000,
  //     'transaction time < 5000ms': (r) => r.timings.duration < 5000,
  //     'transaction time < 10s': (r) => r.timings.duration < 10000,
  //     'transaction time < 20s': (r) => r.timings.duration < 20000,
  //   });
  // });
  // group('putReported', () => {
  //   const putReportResponse = http.put(putReport);
  //   check(putReportResponse, {
  //     'transaction time < 10ms': (r) => r.timings.duration < 10,
  //     'transaction time < 50ms': (r) => r.timings.duration < 50,
  //     'transaction time < 200ms': (r) => r.timings.duration < 200,
  //     'transaction time < 500ms': (r) => r.timings.duration < 500,
  //     'transaction time < 1000ms': (r) => r.timings.duration < 1000,
  //     'transaction time < 2000ms': (r) => r.timings.duration < 2000,
  //     'transaction time < 5000ms': (r) => r.timings.duration < 5000,
  //     'transaction time < 10s': (r) => r.timings.duration < 10000,
  //     'transaction time < 20s': (r) => r.timings.duration < 20000,
  //   });
  // });
  // group('addReview', () => {
  //   const addReviewResponse = http.post(route, postData, params);
  //   check(addReviewResponse, {
  //     'transaction time < 10ms': (r) => r.timings.duration < 10,
  //     'transaction time < 50ms': (r) => r.timings.duration < 50,
  //     'transaction time < 200ms': (r) => r.timings.duration < 200,
  //     'transaction time < 500ms': (r) => r.timings.duration < 500,
  //     'transaction time < 1000ms': (r) => r.timings.duration < 1000,
  //     'transaction time < 2000ms': (r) => r.timings.duration < 2000,
  //     'transaction time < 5000ms': (r) => r.timings.duration < 5000,
  //     'transaction time < 10s': (r) => r.timings.duration < 10000,
  //     'transaction time < 20s': (r) => r.timings.duration < 20000,
  //   });
  // });
}