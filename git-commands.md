# Common Git Commands

## Setup
- `git init` creates a new repo.
- `git clone <url>` copies a remote repo.
- `git config --global user.name "Name"` sets your name. Use `user.email` for your email.

## Daily workflow
- `git status` shows changed and staged files.
- `git add <file>` stages a file. `git add .` stages everything.
- `git commit -m "message"` commits the staged changes.
- `git diff` shows unstaged changes. `git diff --staged` shows staged ones.

## Branching
- `git branch` lists branches.
- `git switch -c <name>` creates and switches to a new branch. `git checkout -b <name>` does the same.
- `git switch <name>` switches to an existing branch.
- `git merge <branch>` merges that branch into the current one.
- `git branch -d <name>` deletes a merged branch.

## Remotes
- `git remote -v` lists remotes.
- `git fetch` downloads remote changes without merging them.
- `git pull` fetches and merges.
- `git push` pushes commits. The first push of a new branch needs `git push -u origin <branch>`.

## History
- `git log --oneline --graph` shows compact history.
- `git show <commit>` shows one commit.
- `git blame <file>` shows who changed each line.

## Undoing changes
- `git restore <file>` discards unstaged changes to a file.
- `git restore --staged <file>` unstages a file.
- `git commit --amend` edits the last commit.
- `git revert <commit>` adds a new commit that undoes an earlier one. This is safe for shared branches.
- `git reset --soft HEAD~1` undoes the last commit and keeps its changes staged.
- `git reset --hard <commit>` discards all changes back to that commit. It's destructive.

## Stash and rebase
- `git stash` shelves uncommitted changes. `git stash pop` restores them.
- `git rebase <branch>` replays your commits on top of another branch.
- `git rebase -i HEAD~3` lets you squash, reword, reorder or drop the last 3 commits.
- `git rebase --continue`, `--skip` and `--abort` control a rebase that stopped on a conflict.
- `git cherry-pick <commit>` applies a single commit to the current branch.
- `git tag <name>` marks a commit, for example a release.

## Rebase example
You branched `feature` off `main`, then `main` got new commits:

```
Before:
          A---B---C   feature
         /
    D---E---F---G     main
```

Replay your feature commits on top of the latest `main`:

```bash
git switch feature
git rebase main
```

```
After:
                  A'--B'--C'   feature
                 /
    D---E---F---G              main
```

If a conflict stops the rebase:

```bash
# fix the conflicted files, then
git add <file>
git rebase --continue      # or: git rebase --abort to cancel
```

Then update the remote. The history was rewritten, so a plain push is rejected:

```bash
git push --force-with-lease
```

Avoid rebasing commits that other people have already pulled.

### Interactive rebase: squash the last 3 commits
```bash
git rebase -i HEAD~3
```
In the editor, keep `pick` on the first commit and change the others to `squash` (or `s`), then save and write the combined commit message.
