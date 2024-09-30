import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';

const githubToken = core.getInput('github_token');
if (!githubToken) {
  throw new Error('GITHUB_TOKEN is not provided');
}
const github = getOctokit(githubToken);

export async function postToPull(): Promise<void> {
  try {
    // Get the existing comments.
    const { data: comments } = await github.rest.issues.listComments({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.issue.number
    })

    // Find any comment already made by the bot.
    const botComment = comments.find(comment => comment.user?.id === 41898282)
    const commentBody = `Hello from actions/github-script! (${context.sha})`

    if (botComment) {
      await github.rest.issues.updateComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        comment_id: botComment.id,
        body: commentBody
      })
    } else {
      await github.rest.issues.createComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
        body: commentBody
      })
    }
  } catch (error) {
    core.setFailed(`Action failed with error: ${(error as Error).message}`)
  }
}
