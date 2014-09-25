cat solr.log | egrep '(food).*&q=[0-9,a-z,A-Z].*&_' | sed -e 's/^INFO.*&q=\(.*\)&facet.limit.*/\1/'| sort | uniq -c | sort -rn | awk '{print $1","$2}' | sed -e 's/+/ /' > csvqueries.csv
