# Publish live Infogram charts from CartoDB data

Infogram has a live JSON feed feature. This tool converts the output from CartoDB and makes it compatible with Infogram, on the fly. 

For example, plug this url into an Infogram JSON feed, and get a chart:
[https://cartogram-relay.herokuapp.com/infogram?sql=select pumatype, aalf_p AS something, aslf_p FROM youth_laborforce_by_race&user=regionalindicators](https://cartogram-relay.herokuapp.com/infogram?sql=select pumatype, aalf_p AS something, aslf_p FROM youth_laborforce_by_race&user=regionalindicators)

Endpoint:
/infogram

Query Parameters:
sql
user

You can replace the `sql` parameter value with your own SQL. Specify your CartoDB user with `user` parameter. 

## Note on SELECT order
If you have a series, Infogram requires the first element of the array to be the name of that series. Thus, the output is sensitive to the order in which columns are listed.

# Deploy your own server:

MAPC will host this as long as it is financially feasible, but if you'd like to deploy to your own infrastructure, click here:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
