# Publish live Infogram charts from CartoDB data

Infogram has a live JSON feed feature. This tool converts the output from CartoDB and makes it compatible with Infogram, on the fly. 

For example, plug this url into an Infogram JSON feed, and get a chart:
https://cartogram-relay.herokuapp.com/infogram?sql=select pumatype, aalf_p AS something, aslf_p FROM youth_laborforce_by_race&user=regionalindicators

Endpoint:
/infogram

Query Parameters:
sql
user

You can replace the `sql` parameter value with your own SQL. Specify your CartoDB user with `user` parameter. 
