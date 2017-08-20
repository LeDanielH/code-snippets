```now``` => deploy
```now rm project-name```
```now alias url custom-url```
+ view source code online => append /_src to an url
+ setting up environment variables => ```now -e BRAND=beringseaversus.me```
+ adding secret environment variable like twitter API key: ```now secret add twitterkey 1233445566```
	- npm scripts: ```now -e TWITTERKEY=@twitterkey``` => hidden from package.json => secret
	- ```now secrets ls```

+ custom domain only on paid service
