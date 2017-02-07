## BUG FIX SCENARIO WITH CHANGES ALREADY MADE

+ https://github.com/github/gitignore/

```

	1.  git add filename.txt
	2.  git stash
	3.  git branch fixbug
	4.  git checkout fixbug
	5.  "make the fix"
	6.  git add fixedbug.txt
	7.  git commit -m "bug fixed"
	8.  git checkout master
	9.  git merge fixbug
	10. git branch -d fixbug
	11. git checkout branchWithStash
	12. git stash apply
	13. git commit -m "commiting stashed changes"
	14. git push -u origin branchWithStash
	15. git checkout master
	16. git merge branchWithStash
	17. git branch -d branchWithStash
	18. git status
	20. "did these commits messed up your app?"
	21. git log --oneline --graph
	22. "find commit where everything was OK"
	23. git reset f345225 - first seven numbers of a commit

```


## USEFUL COMMANDS

```git log --oneline --graph```
```git log -2``` - will show last two commits
```git log --after="yesterday"``` - see documentation for more parameters
```git log -i --author="Daniel"``` - ignores case
```git log README.md``` - will show all the commits related to a particular file
```git diff --stat``` - will show condensed version of changes made
```git diff --cashed``` or ```git diff HEAD``` - staged changes
```git blame filename.txt``` - will show commits made for every line of code
```git tag v1.0.0``` => ```git tag``` - print out all tags, useful for versioning, this is a common tag naming
```git rebase -i``` - interactive rebase from remote branch - "-i" will open sublime
```git rebase --abort``` - revert rebase


## SEE DIFFERENCES BETWEEN LOCAL AND REMOTE VERSION

```
	1. git fetch
	2. git diff origin/master
	3. "or for particular file"
	4. git diff origin/master file.txt
```


## TAGGING, REFERENCES FOR VERSIONS

```

	1. git tag v1.0.0
	2. "if you want to add release notes for the tag"
	3. git tag -a v2.0.0 -m "comment for the new release"
	2. git tag
	3. git push --tags

```

## DIDN'T COMMIT ALL THE FILES I WANTED TO

```
	1. git commit -m "changes made"
	2. git status
	3. "forgot to commit a file"
	4. git add .
	5. git commit --amend
		- will also let us change last commit message
		- if it is already push change you have to use "push -f" to overwrite history

	6. "editor will come up and will let as change the previous commit message"
	7. "save the file"
	8. git status "=> nothing to commit"
```


## UNDOING CHANGES

+ reverting staging

```
	git add filename.txt
	git reset HEAD filename.txt
```

+ reverting commit

```
	git add filename.txt
	git commit -m "commit message"
	git checkout HEAD filename.txt
```

