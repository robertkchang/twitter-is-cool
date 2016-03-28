#Code Challenge: Twitter API integrator

Project Requirements:
Please report your time spent on this, and spend no more than 4 hours on it.
Post your solution to a GitHub repository.
Your code must be well-documented (commented) and testable; your project should include relevant unit tests.
Solution should be implemented using Node JS.

High-level Design:
Frequently scan the Twitter API, seeking tweets containing a given set of keywords
Store tweets discovered into a semi-persistent storage/cache for later analysis.
Hourly, for each of those keywords, post an aggregate count of the recent hour’s tweets that match.
Keywords to search for will be provided in a JSON configuration file. [It’s up to you to design this configuration spec.]

Recommendations:
Provide a queryable HTTP interface to examine the current keywords and current aggregates ad-hoc

The destination API, receiving hourly aggregates from your system, will provide the following endpoint:

http://keywords.example.com/v1/keyword/<keyword-text>/

The HTTP POST query should provide the following parameters, either application/json or application/x-www-form-urlencoded:

	hourly_total=<integer>
