Complexify
====================

Many websites give an indicator of how secure a password is, and require a minimum standard of security. However this is always poorly implemented with rules such as 'must require a number' even if the password is 30 characters long and clearly very secure. Often the only requirement is a minimum number of characters, a very poor indicator of password strength.

Complexify calculates a rating for the password based on how difficult it would be to brute-force it. What does this actually mean?

 - If I have an 8 character password that only uses lower case characters, it's _not good enough_ and I will need to make it better.
 - But if I have a 25 character password that happens to not have a number in it, I am not going to be forced to add one.

Complexify's default settings will enforce a level of complexity that would mean brute-forcing should take ~600 years on a commodity desktop machine. The 'perfect' password used to scale the complexity percentage would take 3x10^33 years.

For more information, [visit the website](http://danpalmer.me/jquery-complexify).
Written and maintained by [@danpalmer](http://twitter.com/danpalmer)
