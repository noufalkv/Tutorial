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
- `git log --oneline -10` shows the last 10 commits in compact form.
- `git log --oneline --graph --all` shows the graph for all branches.
- `git log -p -n 3` shows the diffs of the last 3 commits.
- `git log --stat` shows the files changed in each commit.
- `git log --author="Name"` filters commits by author.
- `git log --since="2 weeks ago"` shows commits after a date. Use `--until` for the other end.
- `git log --grep="keyword"` searches commit messages.
- `git log -S"text"` finds commits that added or removed that text.
- `git log -- <path>` shows the history of a file or folder.
- `git log --follow <file>` follows a file across renames.
- `git log <branch1>..<branch2>` shows commits in branch2 that are not in branch1.
- `git log --pretty=format:"%h %an %ad %s" --date=short` prints a custom format.
- `git log --merges` shows only merge commits. `--no-merges` hides them.
- `git reflog` shows where HEAD has been, which helps recover lost commits.
- `git show <commit>` shows one commit.
- `git blame <file>` shows who changed each line.

## Undoing changes
- `git restore <file>` discards unstaged changes to a file.
- `git restore --staged <file>` unstages a file.
- `git commit --amend` edits the last commit.
- `git revert <commit>` adds a new commit that undoes an earlier one. This is safe for shared branches.
- `git reset --soft HEAD~1` undoes the last commit and keeps its changes staged.
- `git reset --hard <commit>` discards all changes back to that commit. It's destructive.
- `git reset --mixed HEAD~1` undoes the last commit and keeps its changes unstaged. This is the default mode of `git reset`.
- `git reset <file>` unstages a file (older form of `git restore --staged`).
- `git restore --source=<commit> <file>` restores a file to how it was in that commit.
- `git checkout -- <file>` discards unstaged changes to a file (older form of `git restore`).
- `git clean -n` previews untracked files that would be removed.
- `git clean -fd` deletes untracked files and folders. It's destructive.
- `git revert -n <commit>` applies the undo to the working tree without committing, so you can combine several reverts.
- `git revert -m 1 <merge-commit>` reverts a merge commit, keeping the first parent's side.
- `git commit --amend --no-edit` adds staged changes to the last commit without changing its message.
- `git reflog` lists where HEAD has been. Use it to find a commit lost after a reset.
- `git reset --hard <reflog-hash>` or `git branch <name> <reflog-hash>` recovers that lost commit.
- `git merge --abort` cancels a merge that has conflicts.
- `git cherry-pick --abort` cancels a cherry-pick in progress.
- `git rebase --abort` cancels a rebase in progress.
- `git checkout <commit> -- <file>` brings back a file from an older commit.

## Stash and rebase
- `git stash` shelves uncommitted changes. `git stash pop` restores them.
- `git stash push -m "message"` stashes with a description.
- `git stash -u` also stashes untracked files.
- `git stash list` lists all stashes.
- `git stash show -p stash@{0}` shows the diff of a stash.
- `git stash apply stash@{0}` restores a stash and keeps it in the list.
- `git stash pop stash@{1}` restores a specific stash and removes it.
- `git stash branch <name>` creates a branch from a stash and applies it.
- `git stash drop stash@{0}` deletes one stash.
- `git stash clear` deletes all stashes. It's destructive.
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
