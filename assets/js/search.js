/**
 * @file
 * A JavaScript file for flexsearch.
 */

/* eslint-disable */
import * as params from '@params';
/* eslint-enable */

/* eslint-disable no-undef, guard-for-in */
(function () {

  'use strict';

  const index = new FlexSearch.Document({
    document: {
      id: 'id',
      index: ['title', 'tags', 'content', 'date'],
      store: ['title', 'summary', 'date', 'permalink']
    },
    tokenize: 'forward'
  });

  function showResults(items) {
    const template = document.querySelector('template').content;
    const fragment = document.createDocumentFragment();

    const results = document.querySelector('.search-results');
    results.textContent = '';
    results.style.display = "inline";

    for (const id in items) {
      const item = items[id];
      const result = template.cloneNode(true);
      const a = result.querySelector('a');
      a.innerHTML = item.title.concat(": ", item.summary);
      a.href = item.permalink;
      fragment.appendChild(result);
    }
    results.appendChild(fragment);
  }

  function doSearch() {
    const query = document.querySelector('.search-text').value.trim();
    const results = index.search({
      query: query,
      enrich: true,
      limit: params.searchLimit
    });
    const items = {};
    results.forEach(function (result) {
      result.result.forEach(function (r) {
        items[r.id] = r.doc;
      });
    });
    showResults(items);
  }

  function enableUI() {
    const searchform = document.querySelector('.search-form');
    searchform.addEventListener('submit', function (e) {
      e.preventDefault();
      doSearch();
    });
    searchform.addEventListener('input', function () {
      doSearch();
    });
    document.querySelector('.search-input').classList.remove('hidden');
    document.querySelector('.search-text').focus();
  }

  function buildIndex() {
    fetch('/searchindex.json')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        data.forEach(function (item) {
          index.add(item);
        });
      });
  }

  buildIndex();
  enableUI();
})();
