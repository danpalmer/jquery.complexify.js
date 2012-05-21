Complexify
====================

Websites have a responsibility to users to accurately tell them how good a password is, and this is not an easy job.

 - If your password is 8 characters long and only formed of lower case characters, you need to make it better, perhaps by adding a number or more characters.
 - If your password is 25 characters long but happens to not contain a number, you shouldn't be forced by a password security policy to add one, you clearly have a very secure password.

Complexify aims to provide a good measure of password complexity for websites to use both for giving hints to users in the form of strength bars, and for casually enforcing a minimum complexity for security reasons.

_Note:_ I use the term 'casually' because this is only client-side validation and anyone could turn it off. I recommend implementing a minimum length check server-side as well. In the future I may code up this algorithm for use server-side.

###Complexity Rating

Complexify's default settings will enforce a minimum level of complexity that would mean brute-forcing should take ~600 years on a commodity desktop machine. The 'perfect' password used to scale the complexity percentage would take 3x10^33 years. These are equivalent to a 12 character password with uppercase, lowercase and numbers included, and a 25 character password with uppercase, lowercase, numbers and a wide range of punctuation.

###Unicode

Complexify supports Unicode and will add appropriate complexity for the size of character set included in a password. 

For example, as there are 96 Hiragana characters defined in the Unicode specification, including one of these will increase the brute-force complexity  by 96. 

The rationale behind this is that in an attacker were wanting to include Japanese passwords in his attack, he/she may choose to include the Hiragana set in his/her attack, but not the Katakana set. Complexify divides Unicode into 94 appropriately grouped sets.

###Version History

**0.2** - Unicode support  
	Note: most passwords using punctuation will score slightly lower as the punctuation set has been split into multiple sets.

**0.1** - Basic implementation

- - - 

For more information, [visit the website](http://danpalmer.me/jquery-complexify).

**This code is distributed under the WTFPL v2 licence.**