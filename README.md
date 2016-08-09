# Publish live Infogram charts from CartoDB data

Infogram has a live JSON feed feature. This tool converts the output from CartoDB and makes it compatible with Infogram, on the fly. 

For example, plug this url into an Infogram JSON feed, and get a chart:
[https://cartogram-relay.herokuapp.com/infogram?sql=select pumatype, aalf_p AS something, aslf_p FROM youth_laborforce_by_race&user=regionalindicators](https://cartogram-relay.herokuapp.com/infogram?sql=select pumatype, aalf_p AS something, aslf_p FROM youth_laborforce_by_race&user=regionalindicators)

Endpoint:
/infogram

Query Parameters:
 - sql
 - user

 (new)
 - groupBy
 - aggrBy
 - val

You can replace the `sql` parameter value with your own SQL. Specify your CartoDB user with `user` parameter. 

## Note on SELECT order
If you have a series, Infogram requires the first element of the array to be the name of that series. Thus, the output is sensitive to the order in which columns are listed.

# Why?
Some like to keep their data in one place, and would like one source of truth as a matter of data infrastructure. For those using CartoDB (and Carto's syncing feature), this is a perfect solution for building live charts that update whenever data in Carto is updated.

# Deploy your own server:

MAPC will host this as long as it is financially feasible, but if you'd like to deploy to your own infrastructure, click here:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

# Pivoting data

It's not easy to pivot data on the fly. While infogram supports transposing data, it does not allow for pivoting or "casting" data. To perform a cast, you must specify 3 new parameters:

 - groupBy: this will be the "rows" for the new table
 - aggrBy: this will be the "columns"
 - val: this will be the "value"

 This is very similar to a Pivot Table in Excel. 

 Example:

http://cartogram-relay.herokuapp.com/infogram?sql=select%20%20industry,%20years%20,avgwage%20from%20wages_industry_by_year_msa&user=regionalindicators&groupBy=years&aggrBy=industry&val=avgwage
