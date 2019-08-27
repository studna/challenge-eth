# Approach

At the very beggining I was thinking about using tools like Pandas and doing crazy stuff like data normalization. After few minutes I realized that output should be really simple, so I've just created simple database structure and then I imported first 250 files (more than 30 millions rows) from GCS.

**For import** I used [pgfutter](https://github.com/lukasmartinelli/pgfutter), which is small tool written in Go and it's based on postgre's `COPY` (imho best way to import CSVs, if you don't need to manipulate the data). 

**For GraphQL server** I used `postgraphile`, however I felt like I am kinda cheating, because it was like 10 lines of code. So I decided to write another `graphql` server with some more lines of code. For that purpose I used `sequelize` for data fetching and `apollo-server`.

# Considerations & performance

Since I decided to import data via postgre's `COPY` I knew there won't be some crazy memory leaks, because it's just very efficient data copying.

I ran the import inside a Docker container (like anything else) and collected metrics via `dockerprom`. You can see that import took about 15 minutes and Postgres used almost 100 % of 1 core (it's limited to single core from 4 cores total).

![Memory & CPU usage](https://imgur.com/OcyXCvm.png)
![Load & I/O Usage](https://imgur.com/of1Yd6w.png)

I tried to design column types as small as possible (according to data). There was also no need for foreign keys, so I index just columns which are used for filtering. 

Because we are using **only equal operator** for filtering (by address or txid) and I am already using Postgres 11, I tried to compare BTREE and HASH indexes. Comparsion was made on smaller dataset (7054055 rows).

**query 1** (count 75431)
```sql
SELECT COUNT(to_address) FROM token_transfers WHERE to_address = '0xf20b9e713a33f61fa38792d2afaf1cd30339126a' OR from_address = '0xf20b9e713a33f61fa38792d2afaf1cd30339126a';
```

**query 2** (count 230)
```sql
SELECT COUNT(to_address) FROM token_transfers_bt WHERE to_address = '0xe2b9e97516e1e432b177b31f7397941fadb3686d' OR from_address = '0xe2b9e97516e1e432b177b31f7397941fadb3686d';
```

**query 3**
```sql
SELECT * FROM token_transfers WHERE to_address = '0x262317ebca6339aa5fdcc38aa47168f85b038f1a' OR from_address = '0x262317ebca6339aa5fdcc38aa47168f85b038f1a' LIMIT 1;
```


| Index Type | Table Size | Index Size | Total Size | Query 1 | Query 2 | Query 3 |
|------------|------------|------------|------------|---------|---------|---------|
| BTREE      | 2296 MB    | 2018 MB    | 4314 MB    | 4.597 s | 0.188 s | 0.018 s |
| HASH       | 2296 MB    | 746 MB     | 3042 MB    | 1.645 s | 0.056 s | 0.004 s |


*Disclaimer: It would require to dig deeper (stress testing, isolated environments) in order to find out if is HASH more performant than BTREE. In our case it's more like coincidence, because it's running on single instance. However it's obvious, that HASH uses much less storage space.*

# Dream Stack
*If you had to offer the service as a production application, what stack/tools would you use?*
That's a tricky question. It really depends on the use cases. I am pretty sure I'd use Javascript :-). So React for frontend, Node for APIs and microservices. I can image that I'd use multiple databases (Postgres for aggregations, Mongo for key based querying and Neo4j for graph ops).

# Deployment flow

I'd love to use drone.io for CD, however I am perfectly fine with Travis or any other solution. Drone is based on Docker, so the flow is pretty simple. Build app. Build docker image. Deploy container. Run tests & healthchecks. Swap with production container (zero downtime deployment).

![Mocha Tests](https://imgur.com/E58v54f.png)
