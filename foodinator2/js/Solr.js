var startManager = new AjaxSolr.Manager({
    solrUrl: 'http://localhost:8983/solr/food/'
});

var startQueryManager = new AjaxSolr.Manager({
    solrUrl: 'http://localhost:8983/solr/searchqueries/'
});

var Solr = {
        init: function () {
            startManager();
            startQueryManager();

        }
    }
