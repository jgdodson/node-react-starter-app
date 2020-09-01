import { matchPath } from 'react-router-dom';

function getJsonWithCookies(url) {
  let options = {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      accept: 'application/json',
    },
  };

  // TODO: Throw error on non-200 responses
  return fetch(url, options).then((r) => r.json());
}

/**
 * Send a POST request with the given Json data
 *
 * @param url
 * @param data The data to POST
 * @returns {Promise.<TResult>}
 */
function postJson(url, data) {
  let options = {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      if (res.status === 400) {
        throw new Error(res.json());
      }

      // TODO:  Check the error code
      throw new Error('An error occurred');
    }
  });
}

/**
 * Posts a form
 *
 * // TODO: Should we care about anything more than the response status code?
 * Expects a JSON response
 *
 * @param url {String}
 * @param form {FormData}
 * @returns {Promise.<TResult>}
 */
function postForm(url, form) {
  // Fetch sets the content-type, including multipart boundary
  const options = {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      accept: 'application/json',
    },
    body: form,
  };

  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json();
    }

    throw new Error('Error while posting form');
  });
}

// Default options for location queries
const positionOptions = {
  maximumAge: 10 * 1000,
  timeout: 15 * 1000,
};

function getPosition(options = positionOptions) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}


function secondsSinceEpoch() {
  return Math.floor(Date.now() / 1000);
}

export {
  getJsonWithCookies,
  postJson,
  postForm,
  getPosition,
  secondsSinceEpoch,
};
